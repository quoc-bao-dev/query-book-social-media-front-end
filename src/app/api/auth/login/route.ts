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

    const { accessToken, refreshToken, twoFaToken } = await res.data;

    const response = NextResponse.json({
      message: 'Login success',
      accessToken,
      refreshToken,
      twoFaToken,
    });

    setCookies(response).accessTokenNext(accessToken);
    setCookies(response).refreshTokenNext(refreshToken);

    return response;
  } catch (error) {
    const httpError = error as HttpError;
    console.log('[error]', httpError);

    if (
      httpError.status === 400 &&
      httpError.message === 'User is not active'
    ) {
      return NextResponse.json(httpError, { status: httpError.status });
    }

    if (error)
      return NextResponse.json({ message: httpError.message }, { status: 500 });
  }
}
