import { config } from '@/config';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const res = await axios.post(`${config.BASE_URL}/auth/login`, {
            email,
            password,
        });

        const { accessToken, refreshToken } = (await res.data).data;

        const response = NextResponse.json({ message: 'Login success' });

        // Set cookie
        // TODO: check samesite here
        response.cookies.set('accessToken', accessToken, {
            httpOnly: true, // Cookie chỉ có thể được truy cập từ server
            secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi trường production
            maxAge: 60 * 10, // 10 phut)
            path: config.API_PATH,
            domain: config.API_DOMAIN,
            // sameSite: 'none',
        });

        // TODO: check samesite here
        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true, // Cookie chỉ có thể được truy cập từ server
            secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi trường production
            maxAge: 60 * 60 * 24 * 15, // 15 ngày)
            path: config.API_PATH,
            domain: config.API_DOMAIN,
            // sameSite: 'none',
        });

        response.cookies.set('accessTokenNext', accessToken, {
            httpOnly: true, // Cookie chỉ có thể được truy cập từ server
            secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi trường production
            maxAge: 60 * 10,
            path: '/',
            sameSite: 'strict',
        });

        response.cookies.set('refreshTokenNext', refreshToken, {
            httpOnly: true, // Cookie chỉ có thể được truy cập từ server
            secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi trường production
            maxAge: 60 * 60 * 24 * 15,
            path: '/',
            sameSite: 'strict',
        });

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Login failed' }, { status: 500 });
    }
}
