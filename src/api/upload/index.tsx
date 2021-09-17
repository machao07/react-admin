import axios from '../axios'

export function uploadSubmit(sellerId: string | number, data: any) {
    return axios({
        url: '/seller/na/files/' + sellerId + '/upload',
        method: 'post',
        data
    });
}