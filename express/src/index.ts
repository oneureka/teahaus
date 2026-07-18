import { serve } from '@hono/node-server'
import spaces from './routes/spaces.js'
import tags from './routes/tags.js'
import user from './routes/user.js'

import { Hono } from 'hono'

const app = new Hono()

app.route('/spaces', spaces)
app.route('/tags', tags)
app.route('/user', user)

if (!process.env.VERCEL) {
  serve({
    fetch: app.fetch,
    port: 3300
  })
}

export default app
