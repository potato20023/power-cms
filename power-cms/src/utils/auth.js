import Cookies from 'js-cookie'
const PowerToken = 'PowerToken'
const appid = 'App'

export function getToken() {
    return Cookies.get(PowerToken)
}
export function setToken(d) {
    return Cookies.set(PowerToken, d)
}
export function removeToken() {
    return Cookies.remove(PowerToken)
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