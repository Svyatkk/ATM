import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { jwt } from 'hono/jwt'
import authrouter from './routes/auth.routes'
const app = new Hono()

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_for_dev';
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({ adapter })


app.route('/api/auth', authrouter)



app.get('/', (c) => {
    return c.text('Привіт, сервер на Hono + Prisma 7 працює!')
})

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})

