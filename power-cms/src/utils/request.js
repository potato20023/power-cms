import axios from 'axios'
import service from './service'
import { getToken, setToken, removeToken } from '@/utils/auth'

// 创建实例
const requestD = axios.create({
    baseURL: service.serviceUrl,
    timeout: 5000
})

axios.defaults.withCredentials = true;

// 添加请求拦截器
requestD.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    if (getToken()) {
        config.headers = {
            "p1":1,
            "p2": getToken(),
            "Content-Type": "application/json;chartset=UTF-8"
        }
    }
    return config;
}, err => {
    // 对请求错误做些什么
    return Promise.reject(err);
})


// 添加响应拦截器
requestD.interceptors.response.use(res => {
    // 对响应数据做些什么
    let _this = this
    if (res.data.code == 203) {
        // 登录超时
        alert('登录超时')
        removeToken()
        _this.$router.path('/login')
    }
    return res.data;
}, err => {
    return Promise.reject(err)
})

export default requestD 