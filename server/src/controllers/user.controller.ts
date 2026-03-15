import { Context } from "hono";
import * as userService from '../services/service.user';

type Variables = {
    jwtPayload: any;
};
export const getProfile = async (c: Context<{ Variables: Variables }>) => {
    try {
        const payload = c.get('jwtPayload');

        const user = await userService.getUserById(payload.userId);

        return c.json({ user }, 200);

    } catch (error: any) {
        console.log(error);
        return c.json({ message: error.message || 'Помилка отримання профілю' }, 400);
    }
};