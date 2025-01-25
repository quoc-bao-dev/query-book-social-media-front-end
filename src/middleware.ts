import { NextRequest, NextResponse } from 'next/server';
import { config as configNext } from './config';

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessTokenNext')?.value;
    console.log('[token Next]: ', accessToken);

    if (!accessToken) {
        const refreshToken = request.cookies.get('refreshTokenNext')?.value;
        if (!refreshToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        try {
            const tokenResponse = await await fetch(
                `${configNext.BASE_URL}/auth/refresh-token`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refreshToken }),
                }
            );

            if (!tokenResponse.ok) {
                throw new Error('Failed to refresh token');
            }

            const tokenData = await tokenResponse.json();

            const { accessToken } = tokenData.data;

            const response = NextResponse.next();
            response.cookies.set('accessToken', accessToken, {
                httpOnly: true, // Cookie chỉ có thể được truy cập từ server
                secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi trường production
                maxAge: 60 * 10, // 10 phut)
                path: configNext.API_PATH,
                domain: configNext.API_DOMAIN,
                // sameSite: 'none',
            });
            response.cookies.set('accessTokenNext', accessToken, {
                httpOnly: true, // Cookie chỉ có thể được truy cập từ server
                secure: process.env.NODE_ENV === 'production', // Chỉ set cookie với HTTPS trong môi trường production
                maxAge: 60 * 10,
                path: '/',
                sameSite: 'strict',
            });
            return response;
            //TODO: call api to get user info
            //TODO: return token to client
        } catch (error) {
            console.log('[error]: refresh token in middleware ');
            console.log(error);

            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}

export const config = {
    matcher: ['/'],
};
