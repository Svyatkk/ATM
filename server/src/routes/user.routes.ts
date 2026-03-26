import { Hono } from "hono";
import { addFavHouseCon, deleteFavHouseCon, getProfile, showFavCon } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { addFavHouse } from "../services/service.user";

const userouter = new Hono()

userouter.get('/profile', authMiddleware, getProfile)
userouter.post('/profile/:houseid', authMiddleware, addFavHouseCon)
userouter.post('/profile/delete-fav/:houseid', authMiddleware, deleteFavHouseCon)


userouter.get('/favourites', authMiddleware, showFavCon);



export default userouter

