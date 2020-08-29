import Mock from 'mockjs'
import * as loginAPI from './login'
import * as userAPI from './user'
import * as modeAPI from './mode'


Mock.setup({
    timeout: '300-600'
})

// 登录相关接口
Mock.mock('/login/login', 'post', loginAPI.login)
Mock.mock('/login/logout', 'post', loginAPI.logout)

// 获取用户信息
Mock.mock('/user/getInfo', 'post', userAPI.pullUserInfo)

// 获取客户管理工单分配数
Mock.mock('/user/order', 'get', modeAPI.orderList)
Mock.mock('/user/list', 'get', modeAPI.userList)

export default Mock