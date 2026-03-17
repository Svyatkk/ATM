import { Hono } from "hono";
import { addFavHouseCon, getProfile } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { addFavHouse } from "../services/service.user";

const userouter = new Hono()

userouter.get('/profile', authMiddleware, getProfile)
userouter.post('/profile/:houseid', authMiddleware, addFavHouseCon)


export default userouter

