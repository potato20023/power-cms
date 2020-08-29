import { requestD } from '@/utils/request'

// 用户登录
export function LoginA(data) {
    return requestD({
        url: '/login/login',
        method: 'post',
        data: data
    })
}
// 获取用户信息详情
export function GetUserInfo(id) {
    return requestD({
        url: '',
        method: 'post',
        data: { id }
    })
}
// 用户退出
export function LoginOut(token) {
    return requestD({
        url: '/login/logout',
        method: 'post',
        data: { token }
    })
}
// 获取系统列表
export function getSystem() {
    return requestD({
        url: '/user/getInfo',
        method: 'post'
    })
}