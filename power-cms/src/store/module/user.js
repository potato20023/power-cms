import { GetUserInfo, LoginOut, toLogin } from '@/api/login'
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
                setToken(res.data.csId)
                return resolve(res)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    // 获取用户信息
    pullUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            let data = {csId:getToken()}
            GetUserInfo(data).then(res => {
                console.log('获取用户信息')

                // if(res.code === 200){
                //     commit('SET_USERNAME', res.data.csLoginName)
                //     commit('SET_USERID', res.data.csId)
                    let aaa = [
                        'upms:role:read',
                        'upms:role:create',
                        'upms:role:update',
                        'upms:role:delete',
                        'upms:user:read',
                        'upms:user:create',
                        'upms:user:update',
                        'upms:user:delete',
                        'upms:menu:read',
                        'upms:menu:create',
                        'upms:menu:update',
                        'upms:menu:delete',
                        'upms:sub:read',
                        'upms:sub:create',
                        'upms:sub:update',
                        'upms:sub:delete',
                        'upms:log:read',
                        'upms:log:create',
                        'upms:log:update',
                        'upms:log:delete',
                        'upms:tableList:read',
                        'upms:tableList:create',
                        'upms:tableList:update',
                        'upms:tableList:delete',
                        'upms:tableUpload:read',
                        'upms:map1:read'
                    ]
                    commit('SET_MENULIST', aaa) //用户权限列表
                // }
                
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
                removeToken()
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