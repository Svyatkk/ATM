import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const app = new Hono()


const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })



const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

app.get('/', (c) => {
    return c.text('Привіт, сервер на Hono + Prisma 7 працює!')
})

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})

