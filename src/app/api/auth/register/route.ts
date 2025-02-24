import { config } from '@/config';
import { setCookies } from '@/utils/cookies';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json();

    const registerResponse = await axios.post(
      `${config.BASE_URL}/auth/register`,
      {
        email,
        username,
        password,
      },
    );

    const {
      data: { activeToken },
    } = registerResponse.data;

    const response = NextResponse.json({
      message:
        'Register success, please check your email to activate your account',
    });

    setCookies(response).activeTokenNext(activeToken);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      return NextResponse.json(
        { ...response?.data },
        { status: response?.status },
      );
    }
  }
}
