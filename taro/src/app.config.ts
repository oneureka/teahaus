export default defineAppConfig({
  permission: {
    'scope.userLocation': {
      desc: '定位将用于推荐附近的商家和服务'
    }
  },
  requiredPrivateInfos: ['getLocation'],
  pages: [
    'pages/home/index',
    'pages/orders/index',
    'pages/space/index',
    'pages/order/index',
    'pages/checkout/index',
    'pages/profile/index',
    'pages/coupons/index',
    'pages/wallet/index',
    'pages/transfer/index',
    'pages/points/index',
    'pages/faq/index',
    'pages/feedback/index',
    'pages/verify/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'TeaHaus',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#A8A29E',
    selectedColor: '#57534E',
    backgroundColor: '#F5F5F4',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/orders/index',
        text: '订单',
        iconPath: 'assets/icons/order.png',
        selectedIconPath: 'assets/icons/order-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/icons/mine.png',
        selectedIconPath: 'assets/icons/mine-active.png'
      }
    ]
  }
})
