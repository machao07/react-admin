import axios from '../axios';

/* 
* 金币回显
*/
export function getCoin(targetId: number|string) {
    return axios({
        url: '/seller/na/member/gold/coin/gold/coin/' + targetId,
        method: 'get'
    });
}

/* 
* 金币添加
*/
export function addCoin(targetId: number|string, count: number) {
    return axios({
        url: '/seller/na/member/gold/coin/gold/coin/' + targetId + '/' + count,
        method: 'post',
    });
}