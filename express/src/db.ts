import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from './schema'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const pool = mysql.createPool(process.env.TEAHAUS_DATABASE_URL)

export default drizzle(pool, {
  mode: 'default',
  schema
})
