import { Context } from 'hono'
import * as registerhouse from '../services/serivce.house'
import { JWTPayload } from 'hono/utils/jwt/types'




export const registerHost = async (c: Context) => {
    try {
        const payload = c.get('jwtPayload') as any;


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

export const gethousebyid = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'))
        const house = await registerhouse.getHouseByid(id)

        if (!house) {
            return c.json({ message: 'Житло не знайдено' }, 404)
        }

        return c.json(house)
    } catch (error) {
        console.log(error)

        return c.json({ message: 'Помилка при отриманні житла' }, 500)
    }
}


export const getSearchedHouses = async (c: Context) => {
    try {
        const cityName = String(c.req.query('city'))
        const capacity = Number(c.req.query('capacity'))
        if (!cityName || !capacity) {
            return c.json({ message: 'Місто та кількість гостей обовʼязкові' }, 400);
        }
        const houses = await registerhouse.getSearchedHouses(cityName, capacity);
        return c.json(houses)

    } catch (error) {
        console.log(error)
        return c.json({ message: 'Помилка при пошуку житла' }, 500)
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