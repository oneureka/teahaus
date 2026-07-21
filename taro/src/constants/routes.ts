export const ROUTES = {
  home: '/pages/home/index',
  orders: '/pages/orders/index',
  order: '/pages/order/index',
  profile: '/pages/profile/index',
  space: '/pages/space/index',
  checkout: '/pages/checkout/index',
  coupons: '/pages/coupons/index',
  wallet: '/pages/wallet/index',
  transfer: '/pages/transfer/index',
  points: '/pages/points/index',
  faq: '/pages/faq/index',
  feedback: '/pages/feedback/index',
  verify: '/pages/verify/index'
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

export const buildRoute = (
  path: RoutePath,
  query?: Record<string, string | number | boolean>
): string => {
  if (!query) return path
  const search = Object.entries(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
  return `${path}?${search}`
}
