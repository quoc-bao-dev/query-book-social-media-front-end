import { config } from '@/config';
import httpClient from '@/httpClient/httpClient';
import { setCookies } from '@/utils/cookies';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // const res = await axios.post(`${config.BASE_URL}/auth/login`, {
        //     email,
        //     password,
        // });

        const res = await httpClient.post(`${config.BASE_URL}/auth/login`, {
            email,
            password,
        });
        const { accessToken, refreshToken } = await res.data;

        const response = NextResponse.json({ message: 'Login success' });

        // Set cookie

        setCookies(response).accessToken(accessToken);
        setCookies(response).accessTokenNext(accessToken);
        setCookies(response).refreshToken(refreshToken);
        setCookies(response).refreshTokenNext(refreshToken);
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Login failed' }, { status: 500 });
    }
}
