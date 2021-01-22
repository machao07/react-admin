const menuList =  [
  {
    path: '/home',
    name: '首页',
    index: 'home',
    icon: 'icon-home'
  },
  {
    path: '/order_mag',
    name: '订单管理',
    index: 'order_mag',
    icon: 'icon-gouwucheman',
    subs: [
      {
        path: '/promotion',
        name: '股东活动订单',
        index: 'promotion',
      },
      {
        path: '/couponOrder',
        name: '优惠券订单',
        index: 'couponOrder',
      }
    ]
  }
]

export default menuList