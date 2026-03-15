import { Hono } from "hono";
import { getProfile } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const userouter = new Hono()

userouter.get('/profile', authMiddleware, getProfile)

export default userouter
