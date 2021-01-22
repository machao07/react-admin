import axios from '../axios'

/* 
* 股东活动列表
*/
export function getList(obj:object){
  return axios({
    url: "/seller/na/platform/order/search/recommend/orders",
    method: "post",
    data: obj
  })
}

/* 
* 股东活动详情
*/
export function getDetail(orderId: number) {
    return axios({
        url: '/seller/na/platform/order/search/recommend/orders/' + orderId,
        method: 'get'
    });
}

/* 
* 优惠券订单列表
*/
export function getCouponList(sellerId: number,obj: object) {
  return axios({
      url: '/seller/na/coupon/order/search/' + sellerId,
      method: 'post',
      data: obj
  });
}