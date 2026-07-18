import { orders, transactions, pointTransactions } from '../schema'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import db from '../db'

const app = new Hono()

app.get('/', async (c) => {
  const user = await db.query.users.findFirst({
    with: {
      wallet: true,
      pointAccount: true
    }
  })

  return c.json(user)
})

app.get('/orders', async (c) => {
  const user = await db.query.users.findFirst()

  const data = await db.query.orders.findMany({
    where: eq(orders.userId, user.id as string)
  })

  return c.json(data)
})

app.get('/transactions', async (c) => {
  const user = await db.query.users.findFirst({
    with: {
      wallet: true,
      pointAccount: true
    }
  })

  if (c.req.query('type') === 'wallet') {
    const data = await db.query.transactions.findMany({
      where: eq(transactions.walletId, user.wallet.id)
    })

    return c.json(data)
  }

  const data = await db.query.pointTransactions.findMany({
    where: eq(pointTransactions.accountId, user.pointAccount.id)
  })

  return c.json(data)
})

export default app
