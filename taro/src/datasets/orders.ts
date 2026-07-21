export type OrderStatus =
  'UNPAID' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface Order {
  id: string
  orderNo: string
  spaceId: string
  roomId: string
  userId: string
  status: OrderStatus
  startTime: string
  endTime: string
  contactName: string
  contactPhone: string
  roomPrice: number
  totalPrice: number
  createdAt: string
  updatedAt: string
}

export const orderList: Order[] = [
  {
    id: 'cmrnlon2m0000xge9wxghxezx',
    orderNo: 'TH20260601001',
    spaceId: 'cmrnipkl10000obe9w860hukt',
    roomId: 'cmrnjdx7f00005me96c43msh4',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    status: 'COMPLETED',
    startTime: '06:00:00',
    endTime: '08:00:00',
    contactName: '清欢客',
    contactPhone: '13888888888',
    roomPrice: 128,
    totalPrice: 256,
    createdAt: '2026-07-16T14:24:36.814Z',
    updatedAt: '2026-07-16T14:24:36.814Z'
  },
  {
    id: 'cmrnloosi0001xge9pi8mt6fd',
    orderNo: 'TH20260602002',
    spaceId: 'cmrnipvjc0008obe9dlvcyoon',
    roomId: 'cmrnjejl1000g5me9e0b797xj',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    status: 'COMPLETED',
    startTime: '02:00:00',
    endTime: '04:00:00',
    contactName: '清欢客',
    contactPhone: '13888888888',
    roomPrice: 88,
    totalPrice: 176,
    createdAt: '2026-07-16T14:24:39.042Z',
    updatedAt: '2026-07-16T14:24:39.042Z'
  },
  {
    id: 'cmrnloqym0002xge903xkdovg',
    orderNo: 'TH20260605003',
    spaceId: 'cmrniq4fy000eobe9kzg9eyn8',
    roomId: 'cmrnjezfg000r5me99gnmu3g6',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    status: 'COMPLETED',
    startTime: '01:00:00',
    endTime: '03:00:00',
    contactName: '清欢客',
    contactPhone: '13888888888',
    roomPrice: 168,
    totalPrice: 336,
    createdAt: '2026-07-16T14:24:41.854Z',
    updatedAt: '2026-07-16T14:24:41.854Z'
  },
  {
    id: 'cmrnloslz0003xge92vzdbcak',
    orderNo: 'TH20260608004',
    spaceId: 'cmrnipohw0003obe94jkqojbo',
    roomId: 'cmrnje3nt00055me9e4hcz416',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    status: 'COMPLETED',
    startTime: '07:00:00',
    endTime: '09:00:00',
    contactName: '清欢客',
    contactPhone: '13888888888',
    roomPrice: 128,
    totalPrice: 256,
    createdAt: '2026-07-16T14:24:43.991Z',
    updatedAt: '2026-07-16T14:24:43.991Z'
  },
  {
    id: 'cmrnlou3r0004xge9iymubpo4',
    orderNo: 'TH20260701005',
    spaceId: 'cmrnipu1f0007obe98xeua9yz',
    roomId: 'cmrnjee0o000c5me9vgstwc4n',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    status: 'PAID',
    startTime: '06:00:00',
    endTime: '08:00:00',
    contactName: '清欢客',
    contactPhone: '13888888888',
    roomPrice: 88,
    totalPrice: 176,
    createdAt: '2026-07-16T14:24:45.927Z',
    updatedAt: '2026-07-16T14:24:45.927Z'
  },
  {
    id: 'cmrnlow3a0005xge9emd3lclt',
    orderNo: 'TH20260703006',
    spaceId: 'cmrnipvjc0008obe9dlvcyoon',
    roomId: 'cmrnjekmw000h5me9alde913t',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    status: 'PAID',
    startTime: '02:00:00',
    endTime: '04:30:00',
    contactName: '清欢客',
    contactPhone: '13888888888',
    roomPrice: 78,
    totalPrice: 195,
    createdAt: '2026-07-16T14:24:48.502Z',
    updatedAt: '2026-07-16T14:24:48.502Z'
  },
  {
    id: 'cmrnloxt10006xge910nr3ocd',
    orderNo: 'TH20260710007',
    spaceId: 'cmrnipn3f0002obe9lddjcxc4',
    roomId: 'cmrnje2jj00045me9qa0hvcgo',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    status: 'UNPAID',
    startTime: '06:00:00',
    endTime: '08:00:00',
    contactName: '清欢客',
    contactPhone: '13888888888',
    roomPrice: 58,
    totalPrice: 116,
    createdAt: '2026-07-16T14:24:50.725Z',
    updatedAt: '2026-07-16T14:24:50.725Z'
  },
  {
    id: 'cmrnlp2ks0007xge9oy84hiak',
    orderNo: 'TH20260716008',
    spaceId: 'cmrniq2pg000dobe9sxa1eot5',
    roomId: 'cmrnjey1a000q5me9kcchjiva',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    status: 'IN_PROGRESS',
    startTime: '06:00:00',
    endTime: '08:00:00',
    contactName: '清欢客',
    contactPhone: '13888888888',
    roomPrice: 68,
    totalPrice: 136,
    createdAt: '2026-07-16T14:24:56.908Z',
    updatedAt: '2026-07-16T14:24:56.908Z'
  },
  {
    id: 'cmrnlp4ui0008xge9181vd0y4',
    orderNo: 'TH20260520009',
    spaceId: 'cmrnipz4t000aobe96be9pr2h',
    roomId: 'cmrnjep5a000k5me9b1uoqagy',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    status: 'CANCELLED',
    startTime: '02:00:00',
    endTime: '04:00:00',
    contactName: '清欢客',
    contactPhone: '13888888888',
    roomPrice: 68,
    totalPrice: 136,
    createdAt: '2026-07-16T14:24:59.850Z',
    updatedAt: '2026-07-16T14:24:59.850Z'
  },
  {
    id: 'cmrnlp6dz0009xge9uvx6dvt2',
    orderNo: 'TH20260525010',
    spaceId: 'cmrniq1mm000cobe9lbcjgqs0',
    roomId: 'cmrnjeuz8000o5me9gjszklia',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    status: 'CANCELLED',
    startTime: '01:00:00',
    endTime: '03:00:00',
    contactName: '清欢客',
    contactPhone: '13888888888',
    roomPrice: 88,
    totalPrice: 176,
    createdAt: '2026-07-16T14:25:01.847Z',
    updatedAt: '2026-07-16T14:25:01.847Z'
  }
]
