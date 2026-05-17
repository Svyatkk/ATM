import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';
import { JWT_SECRET } from '../config/jwt.config';

type Variables = {
    jwtPayload: any;
};

export const authMiddleware = async (c: Context<{ Variables: Variables }>, next: Next) => {
    const token = getCookie(c, 'token');

    if (!token) {
        return c.json({ message: 'Неавторизовано: відсутній токен' }, 401);
    }


    try {
        const decodedPayload = await verify(token, JWT_SECRET, 'HS256');
        c.set('jwtPayload', decodedPayload);

        await next();
    } catch (error) {
        return c.json({ message: 'Неавторизовано: недійсний токен' }, 401);
    }
};


