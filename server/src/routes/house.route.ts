import { Hono } from "hono";
import { gethousebyid, getSearchedHouses, registerHost } from "../controllers/house.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { gethosts } from '../controllers/house.controller'
const registerHouserRouter = new Hono()

registerHouserRouter.post('/registerHost', authMiddleware, registerHost)

registerHouserRouter.get('/', gethosts)
registerHouserRouter.get('/find/:cityName/:capacity', getSearchedHouses)


registerHouserRouter.get('/:id', gethousebyid)






export default registerHouserRouter