import { constantRouter, asyncRouterMap } from '@/router'


function hasPermission(menus, route) {
    if (route.menu) {
        // 如果这个路由有menu属性，就需要判断用户是否拥有此menu权限
        return menus.indexOf(route.menu) > -1;
    } else {
        return true
    }
}


// 递归过滤异步路由表，返回符合用户菜单权限的路由表
function filterAsyncRouter(asyncRouterMap, userPermission) {
    const accessedRouters = asyncRouterMap.filter(route => {
        // filter  js语法里数组的过滤筛选方法
        // includes js检查数组中是否含有此变量
        // 如果children中为空，将被过滤掉；children中不为空，按照权限过滤children是否有权限
        if (route.children && route.children.length) {
            route.children = route.children.filter(route1 => {
                    return userPermission.includes(route1.menu)
                })
                // 如果过滤一圈children后，没有子元素都没有权限了，这个父级菜单就也不显示
            return (route.children && route.children.length)
        } else {
            return false
        }
    })
    return accessedRouters
}


const state = {
    routers: constantRouter,
    addRouters: []
}

const mutations = {
    SET_ROUTERS: (state, res) => {
        state.addRouters = res
        state.routers = constantRouter.concat(res)
    }
}

const actions = {
    GenerateRoutes({ commit }, userPermission) {
        return new Promise((resolve, reject) => {
            let accessRouters;
            accessRouters = filterAsyncRouter(asyncRouterMap, userPermission)
            commit('SET_ROUTERS', accessRouters)
            resolve(accessRouters)
        })
    }
}

export default {
    state,
    mutations,
    actions
}