import { config } from '@/config';
import { authActions } from '@/store/authSignal';
import axios from 'axios';

// Base URL của API
const BASE_URL = config.BASE_URL;

// Hàm chuyển hướng đến trang đăng nhập
const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

// Tạo axios instance
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor cho request để thêm accessToken
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor cho response để xử lý lỗi 401 (Unauthorized)
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // Dùng flag _retry để tránh lặp vô hạn
    ) {
      originalRequest._retry = true;

      // const refreshToken = getRefreshToken();
      try {
        // Gọi API refresh token
        await axios.post(
          `/api/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            baseURL: '',
          },
        );
        // Gửi lại request ban đầu
        return axiosClient(originalRequest, { withCredentials: true });
      } catch (refreshError) {
        console.error(
          'Refresh token expired, redirecting to login...',
          refreshError,
        );
        redirectToLogin();
        authActions.logout();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
