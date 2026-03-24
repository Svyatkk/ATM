import { Hono } from "hono";
import { gethousebyid, registerHost } from "../controllers/house.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { gethosts } from '../controllers/house.controller'
import { findCity } from "../services/city.service";
import { findCityCon } from "../controllers/city.controller";
const cityRoute = new Hono()

cityRoute.post('/find', findCityCon)




export default cityRoute