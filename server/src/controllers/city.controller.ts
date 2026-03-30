
import { Context } from 'hono'
import * as registerhouse from '../services/serivce.house'
import { JWTPayload } from 'hono/utils/jwt/types'
import * as cityService from '../services/city.service';
type Variables = {
    jwtPayload: any;
};


export const getAllCities = async (c: Context) => {


    try {
        const cities = await cityService.getAllCities()


        return c.json(cities)


    } catch (error) {
        console.log(error)
    }

}

export const getCityByName = async (c: Context) => {
    try {
        const name = String(c.req.param('name'))
        const city = await cityService.getCityByName(name)
        return c.json(city)
    } catch (error) {

        console.log(error)
        return c.json({ message: 'Помилка при отриманні міста' }, 500)
    }
}