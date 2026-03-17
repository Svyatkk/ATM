import { Hono } from "hono";
import { registerHost } from "../controllers/registerhost.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const registerHouserRouter = new Hono()

registerHouserRouter.post('/registerHost', authMiddleware, registerHost)


export default registerHouserRouter