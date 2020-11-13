const router =  [
  {
    path: '/home',
    name: '首页',
    index: 'home',
    icon: 'icon-home'
  },
  {
    path: '',
    name: '订单管理',
    index: 'order_mag',
    icon: 'icon-gouwucheman',
    subs: [
      {
        path: '/promotion',
        name: '推广活动订单',
        index: 'promotion',
      }
    ]
  }
]

export default router