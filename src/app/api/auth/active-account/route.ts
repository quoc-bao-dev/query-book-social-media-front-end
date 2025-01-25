import { config } from '@/config';
import axios from 'axios';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    const { otp } = await request.json();

    const cookies = request.headers.get('cookie');

    if (!cookies) {
        return NextResponse.json(
            { message: 'Active token not found' },
            { status: 400 }
        );
    }
    const cookiesObj = Object.fromEntries(
        cookies.split(';').map((cookie) => {
            const [key, value] = cookie.trim().split('=');
            return [key, value];
        })
    );

    const activeToken = cookiesObj['activeTokenNext'];

    console.log('[next api route]: ', activeToken);

    if (!activeToken) {
        return NextResponse.json(
            { message: 'Active token not found' },
            { status: 400 }
        );
    }

    try {
        const res = await axios.post(
            `${config.BASE_URL}/auth/register/verify-otp`,
            {
                activeToken,
                otp,
            }
        );

        const { accessToken, refreshToken } = (await res.data).data;

        const response = NextResponse.json({
            message: 'Active account success',
        });

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
        if (axios.isAxiosError(error) && error.response) {
            const { message }: { message: string } = error.response.data;
            if (message) {
                return NextResponse.json({ message }, { status: 400 });
            }
        }
    }
}
