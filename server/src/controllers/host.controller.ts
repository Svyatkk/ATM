import { Context } from 'hono'
import * as registerhouse from '../services/serivce.house'
import { JWTPayload } from 'hono/utils/jwt/types'




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

export const gethosts = async (c: Context) => {

    try {


        const hosue = await registerhouse.getHouses()
        return c.json(hosue)


    } catch (error) {
        console.log(error)
    }
}

// import * as userService from '../services/service.user';

// type Variables = {
//     jwtPayload: any;
// };
// export const getProfile = async (c: Context<{ Variables: Variables }>) => {
//     try {
//         const payload = c.get('jwtPayload');

//         const user = await userService.getUserById(payload.userId);

//         return c.json({ user }, 200);


//     } catch (error: any) {
//         console.log(error);
//         return c.json({ message: error.message || 'Помилка отримання профілю' }, 400);
//     }


// };