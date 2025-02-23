import { config } from '@/config';
import httpClient from '@/httpClient/httpClient';
import { setCookies } from '@/utils/cookies';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    console.log('[next api route]: ', email);

    const res = await httpClient.post(
      `${config.BASE_URL}/auth/gen-active-token`,
      { email },
    );

    const { activeToken } = res.data;

    console.log('[next api route activeToken]: ', activeToken);

    const response = NextResponse.json({
      message:
        'Register success, please check your email to activate your account',
    });
    setCookies(response).activeTokenNext(activeToken);

    return response;
  } catch (error) {
    console.log('[error]', error);
  }
}
