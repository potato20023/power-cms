import { userMap } from './user'

function login(userInfo) {
    let { userName } = JSON.parse(userInfo.body)
    return userMap[userName]
}

function logout() {
    return {
        code: 200,
        message: '退出成功'
    }
}

export { login, logout }