const menuList =  [
  {
    title: '首页',
    key: 'home',
    icon: 'icon-home'
  },
  {
    title: '订单管理',
    key: 'order_mag',
    icon: 'icon-gouwucheman',
    subs: [
      {
        title: '股东活动订单',
        key: 'promotion',
      },
      {
        title: '优惠券订单',
        key: 'couponOrder',
      }
    ]
  },
  {
    title: '配置管理',
    key: 'configuration_mag',
    icon: 'icon-peizhi',
    subs: [
      {
        title: '金币配置',
        key: 'gold',
      }
    ]
  }
]

export default menuList;