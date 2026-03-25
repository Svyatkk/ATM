import { Context } from 'hono'
import * as serviceBooking from '../services/booking.service'
import { JWTPayload } from 'hono/utils/jwt/types'
import { jwt } from 'hono/jwt';
type Variables = {
    jwtPayload: any;
};



export const createBooking = async (c: Context<{ Variables: Variables }>) => {
    try {
        const body = await c.req.json()
        const payload = await c.get('jwtPayload') as any;

        const booking = await serviceBooking.bookTheRoom(payload.userId, body)


        return c.json(booking)


    } catch (error) {
        console.log(error)
    }
}

