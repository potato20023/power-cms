import Cookies from 'js-cookie'
const AdminToken = 'AdminToken'
const appid = 'App'

export function getToken() {
    return Cookies.get(AdminToken)
}
export function setToken(d) {
    return Cookies.set(AdminToken, d)
}
export function removeToken() {
    return Cookies.remove(AdminToken)
}

export function getAppid() {
    return Cookies.get(appid)
}
export function setAppid(data) {
    return Cookies.set(appid, data)
}
export function removeAppid() {
    return Cookies.remove(appid)
}