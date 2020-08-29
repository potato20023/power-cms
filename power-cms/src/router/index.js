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
    // 用户角色权限管理
    // {
    //     path: '/permission',
    //     component: Layout,
    //     redirect: '/permission/role',
    //     meta: { title: '角色管理', icon: 'icon-yonghu' },
    //     children: [
    //         {
    //             path: 'role',
    //             name: '角色管理',
    //             component: () =>
    //                 import ('@/view/permission/role'),
    //             meta: { title: '角色管理', icon: 'icon-yonghu' },
    //             menu: 'upms:role:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'user',
    //             name: '表格',
    //             component: () =>
    //                 import ('@/view/permission/user'),
    //             meta: { title: '表格', icon: 'icon-yonghu' },
    //             menu: 'upms:user:read',
    //             hidden: false
    //         },
    //         {
    //             path: 'userAdd',
    //             name: '用户管理-添加用户',
    //             component: () =>
    //                 import ('@/view/permission/userAdd'),
    //             meta: { title: '用户管理-添加用户', icon: 'icon-yonghu' },
    //             menu: 'upms:user:read',
    //             hidden: true
    //         },
    //         {
    //             path: 'menu',
    //             name: '菜单管理',
    //             component: () =>
    //                 import ('@/view/permission/menu'),
    //             meta: { title: '菜单管理', icon: 'icon-yonghu' },
    //             menu: 'upms:menu:read',
    //             hidden: false
    //         }
    //     ]
    // },

    // 富文本编辑器
    {
        path: '/mode',
        component: Layout,
        redirect: '/mode/index',
        meta: { title: '富文本编辑器', icon: 'icon-box' },
        children: [{
                path: 'index',
                name: 'quillEditor',
                component: () =>
                    import ('@/view/richTextEditor/quillEditor'),
                meta: { title: 'quillEditor', icon: 'icon-box' },
                menu: 'upms:mode:read',
                hidden: false
            },
            {
                path: 'log',
                name: 'wangeditor',
                component: () =>
                    import ('@/view/richTextEditor/wangeditor'),
                meta: { title: 'wangeditor', icon: 'icon-box' },
                menu: 'upms:log:read',
                hidden: false
            }
        ]
    },
    // 表格
    {
        path: '/table',
        component: Layout,
        redirect: '/table/list',
        meta: { title: '表格', icon: 'icon-table' },
        children: [{
                path: 'list',
                name: '表格列表',
                component: () =>
                    import ('@/view/table/tableList'),
                meta: { title: '表格列表', icon: 'icon-List' },
                menu: 'upms:tableList:read',
                hidden: false
            },
            {
                path: 'upload',
                name: '上传excel',
                component: () =>
                    import ('@/view/table/tableUpload'),
                meta: { title: '上传excel', icon: 'icon-shangchuan' },
                menu: 'upms:tableUpload:read',
                hidden: false
            }
        ]
    },
    // echarts
    {
        path:'/echarts',
        component:Layout,
        redirect:'/echarts/map1',
        meta:{title:'echarts',icon:''},
        children:[
            {
                path:'map1',
                name:'map1',
                component:()=>import('@/view/echarts/map1'),
                meta:{title:'map1',icon:''},
                menu:'upms:map1:read',
                hidden:false
            }
        ]
    }
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouter
})