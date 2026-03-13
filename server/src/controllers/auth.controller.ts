import { Context } from 'hono';
import * as authService from '../services/service.auth';

export const register = async (c: Context) => {
    try {
        const body = await c.req.json();

        const newUser = await authService.registerUser(body);

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

        return c.json({
            message: 'Вхід успішний!',
            userId: user.id,
            token: token
        }, 200);
    } catch (error: any) {
        console.log(error);
        return c.json({ message: error.message || 'Помилка сервера' }, 400);
    }
};

