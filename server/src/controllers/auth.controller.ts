import { Context } from 'hono';
import * as authService from '../services/service.auth';
import { setAuthCookie } from '../helpers/cookie.helper';

export const register = async (c: Context) => {
    try {
        const body = await c.req.json();
        const newUser = await authService.registerUser(body);
        const { token } = await authService.loginUser({ email: body.email, password: body.password })
        setAuthCookie(c, token);
        return c.json({ message: 'Реєстрація успішна!', userId: newUser.id }, 201);
    } catch (error: any) {
        console.log(error);
        return c.json({ message: error.message || 'Помилка сервера' }, 400);
    }
};


export const login = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { user, token } = await authService.loginUser(body);
        setAuthCookie(c, token);
        return c.json({ message: 'Успішний вхід!', userId: user.id }, 200);

    } catch (error: any) {
        console.log(error);
        return c.json({ message: error.message || 'Помилка сервера' }, 400);
    }
};

