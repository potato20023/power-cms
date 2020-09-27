import requestD from '../utils/request';

// 获取客户管理工单分配信息
export function getSumList() {
    return requestD({
        url: '/user/order',
        method: 'get'
    })
}
// 获取用户信息列表
export function getUserList(data) {
    return requestD({
        url: '/user/list',
        method: 'get',
        data: data
    })
}