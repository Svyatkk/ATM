import { Context } from 'hono';
import { setCookie } from 'hono/cookie';

export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

export const setAuthCookie = (c: Context, token: string): void => {
    setCookie(c, 'token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/',
        maxAge: COOKIE_MAX_AGE_SECONDS,
    });
};