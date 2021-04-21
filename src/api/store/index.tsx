import axios from '../axios'

/* 
* 店铺管理列表
*/
export function getList(num: number, page: number, obj:object){
  return axios({
    url: "/seller/na/sellerShop/page?num=" + num + '&page=' + page,
    method: "post",
    data: obj
  })
}