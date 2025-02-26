import { config } from '@/config';
import { NextResponse } from 'next/server';

export const setCookies = (response: NextResponse) => ({
  // TODO: check samesite here
  accessToken: (accessToken: string) => {
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true, // Cookie chỉ có thể được truy cập từ server
      secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi trường production
      maxAge: 60 * 10, // 10 phut)
      path: config.API_PATH,
      domain: config.API_DOMAIN,
      sameSite: 'none',
    });
  },
  // TODO: check samesite here
  refreshToken: (refreshToken: string) => {
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true, // Cookie chỉ có thể được truy cập từ server
      secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi trường production
      maxAge: 60 * 60 * 24 * 15, // 15 ngày)
      path: config.API_PATH,
      domain: config.API_DOMAIN,
      // sameSite: 'none',
    });
  },

  accessTokenNext: (accessToken: string) => {
    response.cookies.set('accessTokenNext', accessToken, {
      httpOnly: true, // Cookie chỉ có thể được truy cập từ server
      secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi trường production
      maxAge: 60 * 10,
      path: '/',
      sameSite: 'strict',
    });
  },

  refreshTokenNext: (refreshToken: string) => {
    response.cookies.set('refreshTokenNext', refreshToken, {
      httpOnly: true, // Cookie chỉ có thể được truy cập từ server
      secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi trường production
      maxAge: 60 * 60 * 24 * 15,
      path: '/',
      sameSite: 'strict',
    });
  },

  activeTokenNext: (activeToken: string) => {
    response.cookies.set('activeTokenNext', activeToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 10,
      path: '/',
      sameSite: 'strict',
    });
  },
});
