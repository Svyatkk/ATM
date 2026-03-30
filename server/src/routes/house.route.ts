import { Hono } from "hono";
import { getApartments, gethousebyid, getSearchedHouses, registerHost } from "../controllers/house.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { gethosts } from '../controllers/house.controller'
const registerHouserRouter = new Hono()

registerHouserRouter.post('/registerHost', authMiddleware, registerHost)

registerHouserRouter.get('/', gethosts)
registerHouserRouter.get('/find', getSearchedHouses)
registerHouserRouter.get('/apartments', getApartments)







registerHouserRouter.get('/:id', gethousebyid)






export default registerHouserRouter