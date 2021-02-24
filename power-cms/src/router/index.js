import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/view/layout/layout'

Vue.use(Router)

export const constantRouter = [
    // {
    //     path: '',
    //     redirect: '/index',
    //     name: '首页',
    //     component: Layout,
    //     meta: { title: '首页', icon: 'icon-Homehomepagemenu' },
    //     children: [
    //         {
    //             path: 'index',
    //             name: '首页',
    //             component: () =>
    //                 import ('@/view/homepage/index'),
    //             meta: { title: '首页', icon: 'icon-Homehomepagemenu' },
    //             hidden: false
    //         }
    //     ]
    // },
    {
        path: '/login',
        name: '登录',
        component: () =>
            import ('@/view/login'),
        meta: { title: '登录' },
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/view/error-page/404'),
        hidden: true
    },
    {
        path: '/check',
        name: '验证码',
        component: () =>
            import ('@/view/components/check-text'),
        hidden: false
    },
    {
        path: '/score',
        name: '星星评论',
        component: () =>
            import ('@/view/components/score'),
        hidden: false
    }

]

// 异步路由表
export const asyncRouterMap = [
    // 账号管理
    {
        path: '/user',
        component: Layout,
        redirect: '/user/index',
        meta: { title: '权限管理', icon: 'icon-table' },
        children: [{
                path: 'index',
                name: '账号管理',
                component: () =>
                    import ('@/view/user/index'),
                meta: { title: '账号管理', icon: 'icon-List' },
                menu: 'upms:user:read',
                hidden: false
            },
        ]
    },
    // 个人中心
    {
        path: '/personal',
        component: Layout,
        redirect: '/personal/index',
        meta: { title: '个人中心', icon: 'icon-table' },
        children: [{
                path: 'index',
                name: '资料编辑',
                component: () =>
                    import ('@/view/user/personal'),
                meta: { title: '资料编辑', icon: 'icon-List' },
                menu: 'upms:personal:read',
                hidden: false
            },
        ]
    },
    // 变电站管理
    {
        path: '/mode',
        component: Layout,
        redirect: '/mode/index',
        meta: { title: '变电站管理', icon: 'icon-box' },
        children: [{
                path: 'index',
                name: '变电站管理',
                component: () =>
                    import ('@/view/substation/substationManagement'),
                meta: { title: '变电站管理', icon: 'icon-box' },
                menu: 'upms:sub:read',
                hidden: false
            },
            {
                path: 'line',
                name: '线路管理',
                component: () =>
                    import ('@/view/substation/lineManagement'),
                meta: { title: '线路管理', icon: 'icon-box' },
                menu: 'upms:line:read',
                hidden: false
            },
            {
                path: 'collector',
                name: '采集器管理',
                component: () =>
                    import ('@/view/substation/collectorManagement'),
                meta: { title: '采集器管理', icon: 'icon-box' },
                menu: 'upms:collector:read',
                hidden: false
            }
        ]
    },
    // 电表管理
    {
        path: '/ammeter',
        component: Layout,
        redirect: '/ammeter/index',
        meta: { title: '电表管理', icon: 'icon-table' },
        children: [
            {
                path: 'index',
                name: '电表管理',
                component: () =>
                    import ('@/view/ammeter/index'),
                meta: { title: '电表管理', icon: 'icon-shangchuan' },
                menu: 'upms:ammeter:read',
                hidden: false
            },
        ]
    },
    // 操作日志
    {
        path:'/journal',
        component:Layout,
        redirect:'/journal/signin',
        meta:{title:'日志管理',icon:'icon-box'},
        children:[
            {
                path:'signin',
                name:'登录日志',
                component:()=>import('@/view/journal/journalSignIn'),
                meta:{title:'登录日志',icon:''},
                menu:'upms:signin:read',
                hidden:false
            },
            // {
            //     path:'operation',
            //     name:'操作日志',
            //     component:()=>import('@/view/journal/journalOperation'),
            //     meta:{title:'操作日志',icon:''},
            //     menu:'upms:operation:read',
            //     hidden:false
            // },
            {
                path:'journalsync',
                name:"同步日志",
                component:()=>import('@/view/journal/journalSync'),
                meta:{title:'同步日志',icon:''},
                menu:'upms:journalSync:read',
                hidden:false
            }

        ]
    },
    // 故障管理
    {
        path: '/fault',
        component: Layout,
        redirect: '/fault/index',
        meta: { title: '故障列表', icon: 'icon-table' },
        children: [
            {
                path: 'index',
                name: '故障列表',
                component: () =>
                    import ('@/view/fault/realTimeFault'),
                meta: { title: '故障列表', icon: 'icon-shangchuan' },
                menu: 'upms:fault:read',
                hidden: false
            },
        ]
    },
    // 抄表管理
    {
        path: '/param',
        component: Layout,
        redirect: '/param/index',
        meta: { title: '抄表管理', icon: 'icon-table' },
        children: [ {
                path: 'upload',
                name: '抄表日期设置',
                component: () =>
                    import ('@/view/param/param'),
                meta: { title: '抄表日期设置', icon: 'icon-shangchuan' },
                menu: 'upms:param:read',
                hidden: false
            }
        ]
    },
    // 反控管理
    {
        path: '/contraryControl',
        component: Layout,
        redirect: '/contraryControl/index',
        meta: { title: '反控管理', icon: 'icon-table' },
        children: [ {
                path: 'index',
                name: '远程反控',
                component: () =>
                    import ('@/view/contraryControl/index'),
                meta: { title: '远程反控', icon: 'icon-shangchuan' },
                menu: 'upms:contraryControl:read',
                hidden: false
            }
        ]
    },
    
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouter
})