import { Hono } from "hono";
import { registerHost } from "../controllers/host.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { gethosts } from '../controllers/host.controller'
const registerHouserRouter = new Hono()

registerHouserRouter.post('/registerHost', authMiddleware, registerHost)

registerHouserRouter.get('/', gethosts)



export default registerHouserRouter