import { spaces } from '../schema'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import db from '../db'

const app = new Hono()

app.get('/', async (c) => {
  const data = await db.query.spaces.findMany({
    with: {
      tags: true,
      images: true
    }
  })

  return c.json(data)
})

app.get('/:id', async (c) => {
  const spaceId = c.req.param('id')
  const data = await db.query.spaces.findFirst({
    where: eq(spaces.id, spaceId),
    with: {
      tags: true,
      rooms: true,
      images: true
    }
  })

  return c.json(data)
})

export default app
