import { Hono } from "hono";

import { createBooking } from "../controllers/booking.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { getOrder } from "../controllers/booking.controller";
const bookingRoute = new Hono()



bookingRoute.post('/createBooking', authMiddleware, createBooking)

bookingRoute.get('/orders', authMiddleware, getOrder)





export default bookingRoute