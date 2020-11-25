import axios from '../../api/axios'

// 获取商户信息
export function getSellerInfo(sellerId) {
    return axios({
        url: '/seller/na/platform/shop/seller/' + sellerId,
        method: 'get'
    })
}

// 交易额、销售额、账户余额
export function getAmount(sellerId) {
    return axios({
        url: "/seller/na/platform/statistics/home/counting/" + sellerId,
        method: "get"
    });
}