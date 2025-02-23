import { config } from '@/config';
import httpClient from '@/httpClient/httpClient';
import { HttpError } from '@/types/common';
import { setCookies } from '@/utils/cookies';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const { otp } = await request.json();

  const cookies = request.headers.get('cookie');

  if (!cookies) {
    return NextResponse.json(
      { message: 'Active token not found' },
      { status: 400 },
    );
  }
  const cookiesObj = Object.fromEntries(
    cookies.split(';').map((cookie) => {
      const [key, value] = cookie.trim().split('=');
      return [key, value];
    }),
  );

  const activeToken = cookiesObj['activeTokenNext'];

  console.log('[next api route]: ', activeToken);

  if (!activeToken) {
    return NextResponse.json(
      { message: 'Active token not found' },
      { status: 400 },
    );
  }

  try {
    const res = await httpClient.post(
      `${config.BASE_URL}/auth/register/verify-otp`,
      {
        activeToken,
        otp,
      },
    );

    const { accessToken, refreshToken } = res.data;

    const response = NextResponse.json({
      message: 'Active account success',
    });

    setCookies(response).accessToken(accessToken);
    setCookies(response).accessTokenNext(accessToken);
    setCookies(response).refreshToken(refreshToken);
    setCookies(response).refreshTokenNext(refreshToken);

    return response;
  } catch (error) {
    const { message }: { message: string } = error as HttpError;
    console.log(error);

    return NextResponse.json({ message }, { status: 400 });
  }
}
