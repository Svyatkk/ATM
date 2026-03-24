
import { Context } from 'hono'
import * as registerhouse from '../services/serivce.house'
import { JWTPayload } from 'hono/utils/jwt/types'
import * as roomService from '../services/service.room';
type Variables = {
    jwtPayload: any;
};


export const registerRoom = async (c: Context<{ Variables: Variables }>) => {
    try {
        const payload = c.get('jwtPayload');

        const body = await c.req.json()


        const room = await roomService.createRoom(body, payload.id)

        return c.json(room)



    } catch (error) {
        console.log(error)
    }
}
