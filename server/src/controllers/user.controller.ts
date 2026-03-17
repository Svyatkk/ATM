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


export const addFavHouseCon = async (c: Context<{ Variables: Variables }>) => {
    try {
        const payload = c.get('jwtPayload');

        const houseid = Number(c.req.param('houseId'))


        const house = await userService.addFavHouse(payload.userid, houseid)

        return c.json(house)


    } catch (error: any) {
        console.log(error)
        return c.json({ message: error.message }, 400);


    }
}