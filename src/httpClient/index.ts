import { config } from '@/config';
import axios from 'axios';

// Base URL của API
const BASE_URL = config.BASE_URL;
console.log(BASE_URL);

// Hàm lấy và lưu trữ token
const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
export const setAccessToken = (token: string) =>
    localStorage.setItem('accessToken', token);
export const setRefreshToken = (token: string) =>
    localStorage.setItem('refreshToken', token);

const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

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
});

// Interceptor cho request để thêm accessToken
axiosClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
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

            const refreshToken = getRefreshToken();
            if (refreshToken) {
                try {
                    // Gọi API refresh token
                    const response = await axios.post(
                        `${BASE_URL}/auth/refresh-token`,
                        {
                            refreshToken,
                        }
                    );

                    const { accessToken: newAccessToken } = response.data;

                    // Lưu accessToken mới và gắn lại vào header
                    setAccessToken(newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    // Gửi lại request ban đầu
                    return axiosClient(originalRequest);
                } catch (refreshError) {
                    console.error(
                        'Refresh token expired, redirecting to login...',
                        refreshError
                    );
                    clearTokens();
                    redirectToLogin();
                }
            } else {
                console.error('No refresh token, redirecting to login...');
                clearTokens();
                redirectToLogin();
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
