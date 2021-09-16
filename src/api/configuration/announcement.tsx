import axios from '../axios';

/* 
* 公告列表
*/
export function getNoticeList(targetId: number | string, type: number) {
    return axios({
        url: '/seller/na/wx/setting/notice/' + targetId + '/' + type,
        method: 'get'
    });
}

/* 
* 公告添加
*/
export function addNotice(targetId: number | string, type: number, obj: any) {
    return axios({
        url: '/seller/na/wx/setting/notice/' + targetId + '/' + type,
        method: 'post',
        data: obj
    });
}

/* 
* 公告启用
*/
export function enable(targetId: number | string, type: number, id: number | string, status: number) {
    return axios({
        url: '/seller/na/wx/setting/notice/' + targetId + '/' + type + '/' + id,
        method: 'put',
        params: {
            status: status
        }
    });
}

/* 
* 公告禁用
*/
export function disable(targetId: number | string, type: number, id: number | string, status: number) {
    return axios({
        url: '/seller/na/wx/setting/notice/' + targetId + '/' + type + '/' + id,
        method: 'put',
        params: {
            status: status
        }
    });
}

/* 
* 公告删除
*/
export function delNotice(targetId: number | string, type: number, id: number | string) {
    return axios({
        url: '/seller/na/wx/setting/notice/' + targetId + '/' + type + '/' + id,
        method: 'delete',
    });
}