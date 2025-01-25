import { NextRequest, NextResponse } from 'next/server';
import { config as configNext } from './config';
import httpClient from './httpClient/httpClient';
import { setCookies } from './utils/cookies';

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessTokenNext')?.value;

    if (!accessToken) {
        const refreshToken = request.cookies.get('refreshTokenNext')?.value;
        if (!refreshToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        try {
            const tokenResponse = await httpClient.post(
                `${configNext.BASE_URL}/auth/refresh-token`,
                {
                    refreshToken,
                }
            );

            if (!tokenResponse) {
                throw new Error('Failed to refresh token');
            }

            const tokenData = tokenResponse;

            const { accessToken } = tokenData.data;

            const response = NextResponse.next();

            setCookies(response).accessToken(accessToken);
            setCookies(response).accessTokenNext(accessToken);
            //TODO: call api to get user info
            //TODO: return token to client
            return response;
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
