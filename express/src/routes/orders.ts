import { orders } from '../schema'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import db from '../db'

const app = new Hono()

export default app
