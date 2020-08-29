/*
 * @Author: chumengzhen 
 * @Date: 2020-04-22 10:21:13 
 * @Last Modified by: chumengzhen
 * @Last Modified time: 2020-04-25 10:38:05
 * 全局权限检测，包括（路由的全局守卫）
 */

import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'

//  路由全局前置守卫
const whiteList = ['/login', '/check'] // 白名单
router.beforeEach((to, from, next) => {
    if (getToken()) {
        // 有token时
        if (to.path == '/login') {
            // 有token时访问登录页，跳转至首页
            next({ path: '/' })
        } else {
            // 有token时访问非登录页
            if (store.getters.menuList.length === 0) {
                store.dispatch('pullUserInfo').then(resp => {
                    const menuList = resp.menuList
                    store.dispatch('GenerateRoutes', menuList).then(() => {
                        // 动态添加可访问路由表
                        router.addRoutes(store.getters.addRouters)
                            // hack方法 确保addRoutes已完成，set the replace: true so the navigation will not leave a history record
                            // 这样我们就可以简单的通过 `next(to)` 巧妙的避开之前的那个问题了。这行代码重新进入 `router.beforeEach` 这个钩子，这时候再通过 `next()` 来释放钩子，就能确保所有的路由都已经挂载完成了。
                        next({...to, replace: true })
                    })
                }).catch(() => {
                    store.dispatch('logout').then(() => {
                        next('/login')
                    })
                })
            } else {
                next()
            }

        }
    } else {
        // 没有token时
        if (whiteList.indexOf(to.path) > -1) {
            // 白名单，免密登录
            next()
        } else {
            // 否则就跳转至登录页
            next({ path: '/login' })
        }
    }
})