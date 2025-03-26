import { setCookies } from '@/utils/cookies';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { accessToken, refreshToken } = await request.json();

  const response = NextResponse.json({
    message: 'Set cookies success',
    accessToken,
    refreshToken,
  });

  setCookies(response).accessTokenNext(accessToken);
  setCookies(response).refreshTokenNext(refreshToken);

  return response;
}
