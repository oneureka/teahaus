import { serve } from '@hono/node-server'
import spaces from './routes/spaces'
import orders from './routes/orders'
import { Hono } from 'hono'

const app = new Hono()

app.route('/spaces', spaces)
app.route('/orders', orders)

if (!process.env.VERCEL) {
  serve({
    fetch: app.fetch,
    port: 3300
  })
}

export default app
