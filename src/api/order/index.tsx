import axios from '../axios'

export function getList(obj:object){
  return axios({
    url: "/seller/na/platform/order/search/recommend/orders",
    method: "post",
    data: obj
  })
}