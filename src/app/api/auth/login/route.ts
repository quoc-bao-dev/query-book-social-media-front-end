import { config } from '@/config';
import httpClient from '@/httpClient/httpClient';
import { HttpError } from '@/types/common';
import { setCookies } from '@/utils/cookies';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const res = await httpClient.post(`${config.BASE_URL}/auth/login`, {
      email,
      password,
    });

    const { accessToken, refreshToken } = await res.data;

    const response = NextResponse.json({ message: 'Login success' });

    // Set cookie
    response.headers.set(
      'Set-Cookie',
      `refreshToken=${refreshToken}; HttpOnly; Secure; Max-Age=1296000; Path=/; Domain=${config.API_DOMAIN}; SameSite=None`,
    );
    response.headers.set(
      'Set-Cookie',
      `accessToken=${accessToken}; HttpOnly; Secure; Max-Age=1296000; Path=/; Domain=${config.API_DOMAIN}; SameSite=None`,
    );
    setCookies(response).accessToken(accessToken);
    setCookies(response).accessTokenNext(accessToken);
    setCookies(response).refreshToken(refreshToken);
    setCookies(response).refreshTokenNext(refreshToken);
    return response;
  } catch (error) {
    const httpError = error as HttpError;

    if (
      httpError.status === 400 &&
      httpError.message === 'User is not active'
    ) {
      return NextResponse.json(httpError, { status: httpError.status });
    }

    console.log('[error]', httpError);

    if (error)
      return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
