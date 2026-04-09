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


    } catch (error: any) {
        console.error("Помилка бронювання:", error.message);

        return c.json({
            message: error.message || "Помилка при бронюванні"
        }, 400);
    }
}

export const removeOrder = async (c: Context<{ Variables: Variables }>) => {
    try {
        const payload = await c.get('jwtPayload') as any;

        const bookingId = Number(c.req.param('bookingId'))

        await serviceBooking.removeBooking(payload.userid, bookingId)



        return c.json({ message: "Успішно видалено" })


    } catch (error) {
        console.log(error)
        return c.json({ message: "Помилка при виаленні замовлення" }, 500)
    }
}

export const getOrder = async (c: Context<{ Variables: Variables }>) => {
    try {
        const payload = await c.get('jwtPayload') as any;
        const booking = await serviceBooking.getOrder(payload.userId)

        return c.json(booking)
    } catch (error) {
        console.log(error)
        return c.json({ message: "Помилка при отриманні замовлення" }, 500)
    }
}
