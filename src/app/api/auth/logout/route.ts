import { config } from '@/config';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout success!' });

  const cookiesStore = await cookies();

  const refreshToken = cookiesStore.get('refreshTokenNext')?.value;

  await axios.post(`${config.BASE_URL}/auth/logout`, {
    refreshToken,
  });

  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  response.cookies.delete('accessTokenNext');
  response.cookies.delete('refreshTokenNext');

  return response;
}
