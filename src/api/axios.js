import axios from 'axios'
import {
    message
} from 'antd'
import {
    HashRouter
} from 'react-router-dom'
import {
    getToken,
    removeToken
} from './token'

const router = new HashRouter()
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'https://qa.huilianshenghua.com/api' : '/api',
    timeout: 3000
})

instance.interceptors.request.use(
    config => {
        let token = getToken();
        if (token && token !== undefined && token !== "" && token !== "undefined") {
            config.headers['Authorization'] = "Bearer " + token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
)

instance.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === 401) {
            //尚未登录
            removeToken();
            router.history.push('/login');
        }

        if (res.code !== "0") {
            message.open({ // notification
                message: '失败',
                content: res.message,
                type: 'error'
            });
            return Promise.reject(res);
        } else {
            return res;
        }
    }
)

export default instance;