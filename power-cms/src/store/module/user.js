import { getSystem, GetUserInfo, LoginOut, toLogin } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import service from '@/utils/service'


const state = {
    appid: '',
    userName: '',
    userId: '',
    avatar: '',
    menuList: [], //用户权限列表
}

const mutations = {
    SET_APPID: (state, res) => {
        state.appid = res
    },
    SET_USERNAME: (state, res) => {
        state.userName = res
    },
    SET_USERID: (state, res) => {
        state.userId = res
    },
    SET_AVATAR: (state, res) => {
        state.avatar = res
    },
    SET_MENULIST: (state, res) => {
        state.menuList = res
    }
}

const actions = {
    // 登录
    login({ commit }, data) {
        return new Promise((resolve, reject) => {
            toLogin(data).then(res => {
                setToken(res.token)
                return resolve(res)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    // 获取系统列表
    pullUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getSystem().then(res => {
                commit('SET_USERNAME', res.userName)
                commit('SET_USERID', res.userId)
                commit('SET_AVATAR', res.avatar)

                commit('SET_MENULIST', res.menuList) //用户权限列表
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    // 退出登录
    loginOut({ commit }) {
        let data = getToken();
        return new Promise((resolve, reject) => {
            LoginOut(data).then(res => {
                return resolve(res)
            })
        })
    }
}


export default {
    state,
    mutations,
    actions
}