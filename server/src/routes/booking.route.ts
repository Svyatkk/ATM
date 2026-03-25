import { Hono } from "hono";

import { createBooking } from "../controllers/booking.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const bookingRoute = new Hono()



bookingRoute.post('/createBooking', authMiddleware, createBooking)





export default bookingRoute