import { Hono } from "hono";
import { registerRoom } from "../controllers/room.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const registerHouserRouter = new Hono()

registerHouserRouter.post('/register', authMiddleware, registerRoom)







export default registerHouserRouter