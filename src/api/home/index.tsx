import axios from '../axios'

// 获取商户信息
export function getSellerInfo(sellerId: string | number) {
    return axios({
        url: '/seller/na/platform/shop/seller/' + sellerId,
        method: 'get'
    })
}

// 交易额、销售额、账户余额
export function getAmount(sellerId: string | number) {
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
export function getMemberData(sellerId: string | number) {
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

// 修改密码
export function modifyPassword(obj: any) {
    return axios({
        url: '/seller/na/platform/statistics/home/modify/password',
        method: 'get',
        params: obj
    });
}

// 数据统计
export function dashBoard(sellerId: string | number) {
    return axios({
        url: "/seller/na/platform/statistics/home/counting/" + sellerId,
        method: "get"
    });
}