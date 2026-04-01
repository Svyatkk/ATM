import { Hono } from "hono";
import { gethousebyid, registerHost } from "../controllers/house.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { gethosts } from '../controllers/house.controller'
import { getAllCities, getCityByName, getMostPopularCities } from "../controllers/city.controller";
const cityRoute = new Hono()

cityRoute.get('/city', getAllCities)

cityRoute.get('/city/:name', getCityByName)
cityRoute.get('/city/popular', getMostPopularCities)



export default cityRoute