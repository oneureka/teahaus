import {
  mysqlTable,
  mysqlEnum,
  varchar,
  text,
  timestamp,
  date,
  time,
  decimal,
  int,
  boolean,
  uniqueIndex
} from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'

export const orderStatus = mysqlEnum('status', [
  'UNPAID',
  'PAID',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED'
])
export const transactionType = mysqlEnum('type', [
  'RECHARGE',
  'WITHDRAW',
  'PAYMENT',
  'REFUND',
  'REWARD'
])
export const pointActionType = mysqlEnum('type', ['EARN', 'BURN'])

export const users = mysqlTable('User', {
  id: varchar('id', { length: 25 }).primaryKey().notNull(),
  nickname: varchar('nickname', { length: 20 }),
  avatar: varchar('avatar', { length: 200 }),
  phone: varchar('phone', { length: 20 }),
  wechatOpenId: varchar('wechatOpenId', { length: 100 }).unique(),
  wechatUnionId: varchar('wechatUnionId', { length: 100 }),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull()
})

export const usersRelations = relations(users, ({ many, one }) => ({
  favorites: many(userFavorites),
  orders: many(orders),
  pointAccount: one(pointAccounts),
  wallet: one(wallets)
}))

export const userFavorites = mysqlTable(
  'UserFavorite',
  {
    id: varchar('id', { length: 25 }).primaryKey().notNull(),
    userId: varchar('userId', { length: 25 }).notNull(),
    spaceId: varchar('spaceId', { length: 25 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull()
  },
  (table) => ({
    uniqueUserSpace: uniqueIndex('UserFavorite_userId_spaceId_key').on(
      table.userId,
      table.spaceId
    )
  })
)

export const userFavoritesRelations = relations(userFavorites, ({ one }) => ({
  user: one(users, { fields: [userFavorites.userId], references: [users.id] }),
  space: one(spaces, {
    fields: [userFavorites.spaceId],
    references: [spaces.id]
  })
}))

export const spaces = mysqlTable('Space', {
  id: varchar('id', { length: 25 }).primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  category: varchar('category', { length: 30 }),
  description: text('description'),
  businessHours: varchar('businessHours', { length: 50 }),
  address: varchar('address', { length: 200 }),
  district: varchar('district', { length: 20 }),
  lat: decimal('lat', { precision: 10, scale: 7 }),
  lng: decimal('lng', { precision: 10, scale: 7 }),
  phone: varchar('phone', { length: 20 }),
  minPrice: decimal('minPrice', { precision: 10, scale: 2 }),
  isFeatured: boolean('isFeatured').default(false).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull()
})

export const spacesRelations = relations(spaces, ({ many }) => ({
  images: many(spaceImages),
  tags: many(spaceTags),
  rooms: many(rooms),
  orders: many(orders),
  favorites: many(userFavorites)
}))

export const spaceImages = mysqlTable('SpaceImage', {
  id: varchar('id', { length: 25 }).primaryKey().notNull(),
  spaceId: varchar('spaceId', { length: 25 }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  sortOrder: int('sortOrder').default(0).notNull()
})

export const spaceImagesRelations = relations(spaceImages, ({ one }) => ({
  space: one(spaces, { fields: [spaceImages.spaceId], references: [spaces.id] })
}))

export const tags = mysqlTable('Tag', {
  id: varchar('id', { length: 25 }).primaryKey().notNull(),
  name: varchar('name', { length: 30 }).unique().notNull()
})

export const tagsRelations = relations(tags, ({ many }) => ({
  spaces: many(spaceTags)
}))

export const spaceTags = mysqlTable(
  'SpaceTag',
  {
    id: varchar('id', { length: 25 }).primaryKey().notNull(),
    spaceId: varchar('spaceId', { length: 25 }).notNull(),
    tagId: varchar('tagId', { length: 25 }).notNull()
  },
  (table) => ({
    uniqueSpaceTag: uniqueIndex('SpaceTag_spaceId_tagId_key').on(
      table.spaceId,
      table.tagId
    )
  })
)

export const spaceTagsRelations = relations(spaceTags, ({ one }) => ({
  space: one(spaces, { fields: [spaceTags.spaceId], references: [spaces.id] }),
  tag: one(tags, { fields: [spaceTags.tagId], references: [tags.id] })
}))

export const rooms = mysqlTable('Room', {
  id: varchar('id', { length: 25 }).primaryKey().notNull(),
  spaceId: varchar('spaceId', { length: 25 }).notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  sortOrder: int('sortOrder').default(0).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull()
})

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  space: one(spaces, { fields: [rooms.spaceId], references: [spaces.id] }),
  schedules: many(roomSchedules),
  orders: many(orders)
}))

export const roomSchedules = mysqlTable(
  'RoomSchedule',
  {
    id: varchar('id', { length: 25 }).primaryKey().notNull(),
    roomId: varchar('roomId', { length: 25 }).notNull(),
    orderId: varchar('orderId', { length: 25 }),
    isBooked: boolean('isBooked').default(false).notNull(),
    startTime: time('startTime', { fsp: 0 }).notNull(),
    endTime: time('endTime', { fsp: 0 }).notNull(),
    date: date('date').notNull()
  },
  (table) => ({
    uniqueSchedule: uniqueIndex(
      'RoomSchedule_roomId_date_startTime_endTime_key'
    ).on(table.roomId, table.date, table.startTime, table.endTime)
  })
)

export const roomSchedulesRelations = relations(roomSchedules, ({ one }) => ({
  room: one(rooms, { fields: [roomSchedules.roomId], references: [rooms.id] }),
  order: one(orders, {
    fields: [roomSchedules.orderId],
    references: [orders.id]
  })
}))

export const orders = mysqlTable('Order', {
  id: varchar('id', { length: 25 }).primaryKey().notNull(),
  orderNo: varchar('orderNo', { length: 20 }).unique().notNull(),
  spaceId: varchar('spaceId', { length: 25 }).notNull(),
  roomId: varchar('roomId', { length: 25 }).notNull(),
  userId: varchar('userId', { length: 25 }).notNull(),
  status: orderStatus.notNull().default('UNPAID'),
  startTime: time('startTime', { fsp: 0 }).notNull(),
  endTime: time('endTime', { fsp: 0 }).notNull(),
  contactName: varchar('contactName', { length: 20 }),
  contactPhone: varchar('contactPhone', { length: 20 }),
  roomPrice: decimal('roomPrice', { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal('totalPrice', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull()
})

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  space: one(spaces, { fields: [orders.spaceId], references: [spaces.id] }),
  room: one(rooms, { fields: [orders.roomId], references: [rooms.id] }),
  schedules: many(roomSchedules),
  transactions: many(transactions),
  pointTransactions: many(pointTransactions)
}))

export const wallets = mysqlTable('Wallet', {
  id: varchar('id', { length: 25 }).primaryKey().notNull(),
  userId: varchar('userId', { length: 25 }).unique().notNull(),
  balance: decimal('balance', { precision: 10, scale: 2 })
    .default('0')
    .notNull(),
  totalRecharge: decimal('totalRecharge', { precision: 10, scale: 2 })
    .default('0')
    .notNull(),
  totalWithdraw: decimal('totalWithdraw', { precision: 10, scale: 2 })
    .default('0')
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull()
})

export const walletsRelations = relations(wallets, ({ one, many }) => ({
  user: one(users, { fields: [wallets.userId], references: [users.id] }),
  transactions: many(transactions)
}))

export const transactions = mysqlTable('Transaction', {
  id: varchar('id', { length: 25 }).primaryKey().notNull(),
  walletId: varchar('walletId', { length: 25 }).notNull(),
  balanceBefore: decimal('balanceBefore', {
    precision: 10,
    scale: 2
  }).notNull(),
  balanceAfter: decimal('balanceAfter', { precision: 10, scale: 2 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  type: transactionType.notNull(),
  orderId: varchar('orderId', { length: 25 }),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
  wallet: one(wallets, {
    fields: [transactions.walletId],
    references: [wallets.id]
  }),
  order: one(orders, {
    fields: [transactions.orderId],
    references: [orders.id]
  })
}))

export const pointAccounts = mysqlTable('PointAccount', {
  id: varchar('id', { length: 25 }).primaryKey().notNull(),
  userId: varchar('userId', { length: 25 }).unique().notNull(),
  balance: int('balance').default(0).notNull(),
  totalEarned: int('totalEarned').default(0).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull()
})

export const pointAccountsRelations = relations(
  pointAccounts,
  ({ one, many }) => ({
    user: one(users, {
      fields: [pointAccounts.userId],
      references: [users.id]
    }),
    transactions: many(pointTransactions)
  })
)

export const pointTransactions = mysqlTable('PointTransaction', {
  id: varchar('id', { length: 25 }).primaryKey().notNull(),
  accountId: varchar('accountId', { length: 25 }).notNull(),
  balanceAfter: int('balanceAfter').notNull(),
  type: pointActionType.notNull(),
  points: int('points').notNull(),
  orderId: varchar('orderId', { length: 25 }),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const pointTransactionsRelations = relations(
  pointTransactions,
  ({ one }) => ({
    account: one(pointAccounts, {
      fields: [pointTransactions.accountId],
      references: [pointAccounts.id]
    }),
    order: one(orders, {
      fields: [pointTransactions.orderId],
      references: [orders.id]
    })
  })
)
