import { Context } from 'hono'
import * as registerhouse from '../services/serivce.registerhouse'

export const registerHost = async (c: Context) => {
    try {
        const payload = c.get('jwtPayload') as any;

        console.log("ДАНІ З ТОКЕНА (payload):", payload);

        const userId = payload?.id || payload?.userId || payload?.sub;

        if (!userId) {
            console.log("Не вдалося знайти ID юзера в payload");
            return c.json({ message: 'Помилка авторизації: невірний формат токена' }, 401);
        }


        const body = await c.req.json();

        const house = await registerhouse.createHouse(body, Number(userId));

        return c.json(house);

    } catch (error: any) {
        console.log("Помилка при створенні житла:", error)
        return c.json({ message: error.message || 'Помилка сервера' }, 400);
    }
}