import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  user as mockUser,
  type Wallet,
  type PointAccount
} from '@/datasets/profile'

export interface UserInfo {
  id?: string
  nickname?: string
  avatar?: string
  phone?: string
  userTitle?: string
  wallet?: Wallet
  pointAccount?: PointAccount
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfo>({ ...mockUser })

  const isLoggedIn = computed(() => !!token.value)
  const userId = computed(() => userInfo.value.id || '')
  const userNickname = computed(() => userInfo.value.nickname || '未登录')
  const userAvatar = computed(() => userInfo.value.avatar || '')
  const userTitle = computed(() => userInfo.value.userTitle || '品茗会员')
  const wallet = computed(() => userInfo.value.wallet)
  const pointAccount = computed(() => userInfo.value.pointAccount)
  const balance = computed(() => wallet.value?.balance ?? 0)
  const points = computed(() => pointAccount.value?.balance ?? 0)

  function setToken(newToken: string) {
    token.value = newToken
  }

  function setUserInfo(info: Partial<UserInfo>) {
    userInfo.value = { ...userInfo.value, ...info }
  }

  function setWalletBalance(newBalance: number) {
    if (wallet.value) {
      wallet.value.balance = newBalance
    }
  }

  function setPointsBalance(newBalance: number) {
    if (pointAccount.value) {
      pointAccount.value.balance = newBalance
    }
  }

  function clearUser() {
    token.value = ''
    userInfo.value = {}
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    userId,
    userNickname,
    userAvatar,
    userTitle,
    wallet,
    pointAccount,
    balance,
    points,
    setToken,
    setUserInfo,
    setWalletBalance,
    setPointsBalance,
    clearUser
  }
})
