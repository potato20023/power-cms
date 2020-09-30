import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/view/layout/layout'

Vue.use(Router)

export const constantRouter = [{
        path: '',
        redirect: '/index',
        name: '首页',
        component: Layout,
        meta: { title: '首页', icon: 'icon-Homehomepagemenu' },
        children: [{
            path: 'index',
            name: '首页',
            component: () =>
                import ('@/view/homepage/index'),
            meta: { title: '首页', icon: 'icon-Homehomepagemenu' },
            hidden: false
        }]
    },
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
        path: '/table',
        component: Layout,
        redirect: '/table/list',
        meta: { title: '账号管理', icon: 'icon-table' },
        children: [{
                path: 'list',
                name: '账号管理',
                component: () =>
                    import ('@/view/table/tableList'),
                meta: { title: '账号管理', icon: 'icon-List' },
                menu: 'upms:tableList:read',
                hidden: false
            },
        ]
    },
    // 变电站管理
    {
        path: '/mode',
        component: Layout,
        redirect: '/mode/index',
        meta: { title: '管理一', icon: 'icon-box' },
        children: [{
                path: 'index',
                name: '管理一',
                component: () =>
                    import ('@/view/substation/substationManagement'),
                meta: { title: '管理一', icon: 'icon-box' },
                menu: 'upms:sub:read',
                hidden: false
            },
            {
                path: 'log',
                name: '管理二',
                component: () =>
                    import ('@/view/richTextEditor/wangeditor'),
                meta: { title: '管理二', icon: 'icon-box' },
                menu: 'upms:log:read',
                hidden: false
            }
        ]
    },
    // 电表管理
    // {
    //     path: '/table',
    //     component: Layout,
    //     redirect: '/table/list',
    //     meta: { title: '电表管理', icon: 'icon-table' },
    //     children: [
    //         {
    //             path: 'upload',
    //             name: '电表管理',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '电表管理', icon: 'icon-shangchuan' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //     ]
    // },
    // // 故障管理
    // {
    //     path: '/table',
    //     component: Layout,
    //     redirect: '/table/list',
    //     meta: { title: '故障管理', icon: 'icon-table' },
    //     children: [
    //         {
    //             path: 'upload',
    //             name: '故障管理',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '故障管理', icon: 'icon-shangchuan' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //     ]
    // },
    // // 抄表管理
    // {
    //     path: '/table',
    //     component: Layout,
    //     redirect: '/table/upload',
    //     meta: { title: '抄表管理', icon: 'icon-table' },
    //     children: [ {
    //             path: 'upload',
    //             name: '参数设置',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '参数设置', icon: 'icon-shangchuan' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'upload',
    //             name: '自动抄表',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '自动抄表', icon: 'icon-shangchuan' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'upload',
    //             name: '手动抄表',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '手动抄表', icon: 'icon-List' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //     ]
    // },
    // // 操作日志
    // {
    //     path: '/table',
    //     component: Layout,
    //     redirect: '/table/upload',
    //     meta: { title: '操作日志', icon: 'icon-table' },
    //     children: [
    //         {
    //             path: 'upload',
    //             name: '登录日志',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '登录日志', icon: 'icon-shangchuan' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'upload',
    //             name: '参数修改日志',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '参数修改日志', icon: 'icon-shangchuan' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'upload',
    //             name: '手动抄表日志',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '手动抄表日志', icon: 'icon-shangchuan' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'upload',
    //             name: '自动抄表日志',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '自动抄表日志', icon: 'icon-List' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'upload',
    //             name: '电站操作日志',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '电站操作日志', icon: 'icon-List' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'upload',
    //             name: '电表操作日志',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '电表操作日志', icon: 'icon-List' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'upload',
    //             name: '时间同步日志',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '时间同步日志', icon: 'icon-List' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'upload',
    //             name: '采集器操作日志',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '采集器操作日志', icon: 'icon-List' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //     ]
    // },
    // // 采集器管理
    // {
    //     path: '/table',
    //     component: Layout,
    //     redirect: '/table/list',
    //     meta: { title: '采集器管理', icon: 'icon-table' },
    //     children: [
    //         {
    //             path: 'upload',
    //             name: '采集器管理',
    //             component: () =>
    //                 import ('@/view/table/tableUpload'),
    //             meta: { title: '采集器管理', icon: 'icon-shangchuan' },
    //             menu: 'upms:tableUpload:read',
    //             hidden: false
    //         },
    //     ]
    // },
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouter
})