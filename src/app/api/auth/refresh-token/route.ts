import { config } from '@/config';
import { setCookies } from '@/utils/cookies';
import axios from 'axios';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const cookies = request.headers.get('cookie');

  if (!cookies) {
    return NextResponse.json(
      { message: 'Refresh token not found' },
      { status: 400 },
    );
  }
  const cookiesObj = Object.fromEntries(
    cookies.split(';').map((cookie) => {
      const [key, value] = cookie.trim().split('=');
      return [key, value];
    }),
  );

  const refreshToken = cookiesObj['refreshTokenNext'];

  if (!refreshToken) {
    return NextResponse.json(
      { message: 'Refresh token not found' },
      { status: 400 },
    );
  }

  try {
    const res = await axios.post(`${config.BASE_URL}/auth/refresh-token`, {
      refreshToken,
    });

    const response = NextResponse.json({
      message: 'Refresh token success',
    });

    // TODO: check samesite here
    // response.cookies.set('accessToken', res.data.data.accessToken, {
    //     httpOnly: true, // Cookie chỉ có thể được truy cập từ server
    //     secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi truong production
    //     maxAge: 60 * 10, // 10 phut)
    //     path: config.API_PATH,
    //     domain: config.API_DOMAIN,
    //     // sameSite: 'none',
    // });

    const accessToken = res.data.data.accessToken;
    setCookies(response).accessToken(accessToken);

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Refresh token expired', error },
      { status: 401 },
    );
  }
}
