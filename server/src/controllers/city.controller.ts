
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