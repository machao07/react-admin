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

// 今日收入
export function getTodayRevenue() {
    return axios({
        url: "/seller/na/app/seller/home",
        method: "get"
    });
}

// 会员人数
export function getMemberData(sellerId) {
    return axios({
        url: "/seller/na/platform/statistics/home/other/" + sellerId,
        method: "get"
    });
}

// 今日支付
export function getTodayPay() {
    return axios({
        url: "/seller/na/app/seller/today/amount/info",
        method: "get"
    });
}