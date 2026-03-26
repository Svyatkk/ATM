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


export const addFavHouseCon = async (c: Context) => {
    try {
        const payload = c.get('jwtPayload') as { userId: number };
        const userId = payload.userId;

        if (!userId) {
            return c.json({ message: 'Помилка: Не знайдено userId у токені' }, 401);
        }

        const houseId = Number(c.req.param('houseid'));

        if (!houseId || isNaN(houseId)) {
            return c.json({ message: 'Помилка: Невірний ID житла' }, 400);
        }

        const house = await userService.addFavHouse(houseId, userId);

        return c.json({ success: true, house });

    } catch (error: any) {
        console.log("❌ ПОМИЛКА БЕКЕНДУ ПРИ ДОДАВАННІ:", error);

        return c.json({ message: error?.message || 'Внутрішня помилка сервера (дивись термінал бекенду)' }, 400);
    }
}

export const deleteFavHouseCon = async (c: Context) => {
    try {
        const payload = c.get('jwtPayload') as { userId: number };
        const userId = payload.userId;

        if (!userId) {
            return c.json({ message: 'Помилка: Не знайдено userId у токені' }, 401);
        }

        const houseId = Number(c.req.param('houseid'));

        if (!houseId || isNaN(houseId)) {
            return c.json({ message: 'Помилка: Невірний ID житла' }, 400);
        }

        const house = await userService.deleteFavHouse(houseId, userId);

        return c.json({ success: true, house });

    } catch (error: any) {
        console.log("❌ ПОМИЛКА БЕКЕНДУ ПРИ ДОДАВАННІ:", error);

        return c.json({ message: error?.message || 'Внутрішня помилка сервера (дивись термінал бекенду)' }, 400);
    }
}


export const showFavCon = async (c: Context<{ Variables: Variables }>) => {
    try {
        const payload = c.get('jwtPayload');

        const houses = await userService.showFavourites(payload.userId)

        return c.json(houses)

    } catch (error) {
        console.log(error)
    }
}