import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { config as configNext } from './config';

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessTokenNext')?.value;
    console.log('[token Next]: ', accessToken);

    if (!accessToken) {
        const refreshToken = request.cookies.get('refreshTokenNext')?.value;
        if (refreshToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const tokenResponse = await axios.post(
                `${configNext.BASE_URL}/auth/refresh-token`,
                {
                    refreshToken,
                }
            );

            // console.log(tokenResponse.data);

            const { accessToken } = tokenResponse.data.data;

            console.log('[token]: refresh token success ', accessToken);

            //TODO: call api to get user info
            //TODO: return token to client
        } catch (error) {
            console.log('[error]: refresh token in middleware ');
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    try {
        const userResponse = await axios.get(
            `${configNext.BASE_URL}/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log('[userResponse]: ', userResponse.data.data);
        //TODO: call api to get user info
    } catch (error) {
        console.log('[error]: get user in middleware ');
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/'],
};
