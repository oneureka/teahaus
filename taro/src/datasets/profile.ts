export interface Wallet {
  id: string
  userId: string
  balance: number
  totalRecharge: number
  totalWithdraw: number
  createdAt: string
  updatedAt: string
}

export interface PointAccount {
  id: string
  userId: string
  balance: number
  totalEarned: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  nickname: string
  avatar: string
  phone: string
  wechatOpenId: string | null
  wechatUnionId: string | null
  createdAt: string
  updatedAt: string
  wallet: Wallet
  pointAccount: PointAccount
}

export const user: User = {
  id: 'cmrnigkqr0000hfe9yellxbde',
  nickname: '清欢客',
  avatar: 'https://unavatar.io/github/cmrnigkqr0000hfe9yellxbde',
  phone: '13888888888',
  wechatOpenId: null,
  wechatUnionId: null,
  createdAt: '2026-07-16T12:54:21.699Z',
  updatedAt: '2026-07-16T12:54:21.699Z',
  wallet: {
    id: 'cmrnm43ng0000bbe9y2gkgcof',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    balance: 128.5,
    totalRecharge: 500,
    totalWithdraw: 0,
    createdAt: '2026-07-16T14:36:38.140Z',
    updatedAt: '2026-07-16T14:36:38.140Z'
  },
  pointAccount: {
    id: 'cmrnmeevd0000mte9p4ejqzhc',
    userId: 'cmrnigkqr0000hfe9yellxbde',
    balance: 2560,
    totalEarned: 3220,
    createdAt: '2026-07-16T14:44:39.241Z',
    updatedAt: '2026-07-16T14:44:39.241Z'
  }
}
