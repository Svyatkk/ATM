import { Hono } from "hono";
import { register, login } from '../controllers/auth.controller'

const authrouter = new Hono()

authrouter.post('/register', register)
authrouter.post('/login', login)


export default authrouter