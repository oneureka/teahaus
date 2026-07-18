import { Hono } from 'hono'
import db from '../db'

const app = new Hono()

app.get('/', async (c) => {
  const data = await db.query.tags.findMany()
  return c.json(data)
})

export default app
