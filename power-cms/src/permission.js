/*
 * @Author: chumengzhen 
 * @Date: 2020-04-22 10:21:13 
 * @Last Modified by: chumengzhen
 * @Last Modified time: 2020-12-02 15:41:51
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
                    console.log('加载路由')
                    // const menuList = resp.menuList
                    const menuList = [
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
                        'upms:signin:read',
                        'upms:signin:create',
                        'upms:signin:update',
                        'upms:signin:delete',
                        'upms:operation:read',
                        'upms:operation:create',
                        'upms:operation:update',
                        'upms:operation:delete',
                        'upms:fault:read',
                        'upms:fault:create',
                        'upms:fault:update',
                        'upms:fault:delete',
                        'upms:param:read',
                        'upms:param:create',
                        'upms:param:update',
                        'upms:param:delete',
                        'upms:tableUpload:read',
                        'upms:map1:read'
                    ]
                    store.dispatch('GenerateRoutes', menuList).then(() => {
                        // 动态添加可访问路由表
                        router.addRoutes(store.getters.addRouters)
                            // hack方法 确保addRoutes已完成，set the replace: true so the navigation will not leave a history record
                            // 这样我们就可以简单的通过 `next(to)` 巧妙的避开之前的那个问题了。这行代码重新进入 `router.beforeEach` 这个钩子，这时候再通过 `next()` 来释放钩子，就能确保所有的路由都已经挂载完成了。
                        next({...to, replace: true })
                    })
                }).catch(() => {
                    console.log('退出')
                    store.dispatch('loginOut').then(() => {
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