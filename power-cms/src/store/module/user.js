import { GetUserInfo, LoginOut, toLogin } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import service from '@/utils/service'


const state = {
    userName: '',
    userId: '',
    avatar: '',
    menuList: [], //用户权限列表
    csType: 1    // 权限1是超级管理员 2是普通用户，普通用户只能‘看’不能‘增删改’
}

const mutations = {
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
    },
    SET_CSTYPE: (state, res) => {
        state.csType = res
    }
}

const actions = {
    // 登录
    login({ commit }, data) {
        return new Promise((resolve, reject) => {
            toLogin(data).then(res => {
                if (res.code == 200) {
                    setToken(res.data.p2)   // 存储token在cookie
                    sessionStorage.setItem('csId', res.data.p1)
                    commit('SET_USERNAME', res.data.csLoginName)
                    commit('SET_USERID', res.data.csId)
                    commit('SET_CSTYPE', res.data.csType)   //权限
                } else {
                    // this.$message({
                    //     type: 'danger',
                    //     message: res.message
                    // })
                    alert(res.message)
                }

                return resolve(res)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    // 获取用户信息
    pullUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            let data = { csId: sessionStorage.getItem('csId') }
            GetUserInfo(data).then(res => {
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
                    'upms:line:read',
                    'upms:line:create',
                    'upms:line:update',
                    'upms:line:delete',
                    'upms:collector:read',
                    'upms:collector:create',
                    'upms:collector:update',
                    'upms:collector:delete',
                    'upms:ammeter:read',
                    'upms:ammeter:create',
                    'upms:ammeter:update',
                    'upms:ammeter:delete',
                    'upms:tableUpload:read',
                    'upms:map1:read'
                ]
                commit('SET_MENULIST', aaa) //用户权限列表
                if (res.code === 200) {
                    console.log('用户信息获取成功')
                    commit('SET_USERNAME', res.data.csLoginName)
                    commit('SET_USERID', res.data.csId)
                    commit('SET_CSTYPE', res.data.csType)   //权限
                }
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