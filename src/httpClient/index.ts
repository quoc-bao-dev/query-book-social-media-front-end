import { config } from '@/config';
import { authActions } from '@/store/authSignal';
import axios, { AxiosRequestConfig } from 'axios';

// Base URL của API
const BASE_URL = config.BASE_URL;

// Hàm chuyển hướng đến trang đăng nhập
const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

// Hàm quản lý token
export const tokenManager = {
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  getAccessToken: () => localStorage.getItem('accessToken'),
  setAccessToken: (token: string) => localStorage.setItem('accessToken', token),
  setRefreshToken: (token: string) =>
    localStorage.setItem('refreshToken', token),
  removeAccessToken: () => localStorage.removeItem('accessToken'),
  removeRefreshToken: () => localStorage.removeItem('refreshToken'),
};

// Tạo axios instance
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Biến kiểm soát refresh token
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Hàm gọi API refresh token
const refreshTokenRequest = async () => {
  try {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.post(
      `/api/auth/refresh-token`,
      {},
      { withCredentials: true, baseURL: '' },
    );

    const { accessToken } = response.data;

    tokenManager.setAccessToken(accessToken);

    // Gọi lại tất cả request đang chờ
    refreshSubscribers.forEach((callback) => callback(accessToken));
    refreshSubscribers = [];

    return accessToken;
  } catch (error) {
    console.error('Refresh token failed, redirecting to login...', error);
    authActions.logout();
    tokenManager.removeAccessToken();
    tokenManager.removeRefreshToken();
    redirectToLogin();
    return Promise.reject(error);
  } finally {
    isRefreshing = false;
  }
};

// Interceptor request: Thêm access token vào header
axiosClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor response: Xử lý lỗi 401
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
      error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshTokenRequest();

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
          return axiosClient(originalRequest);
        } catch (refreshError) {
          console.log('[refreshError]', refreshError);

          return Promise.reject(refreshError);
        }
      } else {
        return new Promise((resolve) => {
          refreshSubscribers.push((newToken) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken}`,
            };
            resolve(axiosClient(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
