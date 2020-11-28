import requestD from '../utils/request'

// 用户登录
export function toLogin(data) {
    return requestD({
        url: '/rcpmcs/system/login',
        method: 'post',
        params: data
    })
}
// 获取用户信息详情
export function GetUserInfo(data) {
    return requestD({
        url: '/rcpmcs/user/getSystemUser',
        method: 'get',
        params: data
    })
}
// 用户退出
export function LoginOut(token) {
    return requestD({
        url: '/rcpmcs/system/logout',
        method: 'get',
    })
}
// 修改密码
export function changePasword() {
    return requestD({
        url: '/rcpmcs/user/updateSystemUser',
        method: 'post',
        params:data
    })
}