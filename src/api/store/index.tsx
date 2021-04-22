import axios from '../axios'

/* 
* 店铺管理
*/
// 列表
export function getList(num: number, page: number, obj:object){
  return axios({
    url: "/seller/na/sellerShop/page?num=" + num + '&page=' + page,
    method: "post",
    data: obj
  })
}

//启禁用 
export function enable(status: number, shopId: number) {
    return axios({
        url: '/seller/na/sellerShop/' + status + '/' + shopId,
        method: 'put'
    });
}

//结算规则
export function addRule(shopId: number, obj: object) {
    return axios({
        url: '/seller/na/sellerShop/update/' + shopId,
        method: 'post',
        params: obj
    });
}