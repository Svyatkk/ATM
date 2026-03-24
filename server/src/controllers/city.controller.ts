
import { Context } from 'hono'
import * as registerhouse from '../services/serivce.house'
import { JWTPayload } from 'hono/utils/jwt/types'
import * as cityService from '../services/city.service';
type Variables = {
    jwtPayload: any;
};


export const findCityCon = async (c: Context) => {


}