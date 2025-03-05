import { config } from '@/config';
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

    const accessToken = res.data.data.accessToken;
    const response = NextResponse.json({
      message: 'Refresh token success',
      accessToken,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Refresh token expired', error },
      { status: 401 },
    );
  }
}
