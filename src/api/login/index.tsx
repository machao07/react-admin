import axios from '../axios'

export function loginName(obj: any) {
    return axios({
        url: "/user/noa/auth/seller/login",
        method: "post",
        data: obj
    })
}