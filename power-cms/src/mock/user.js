import { getToken } from '@/utils/auth'

const userMap = {
    // 键名与token保持一致
    // permission是用户的权限
    // 相比于用role来做权限，permission这样可以定制每一个用户的权限
    // permission不能为空
    admin: {
        token: 'admin',
        userName: 'admin',
        userId: 'admin',
        age: 10,
        avatar: 'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
        menuList: [
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
            'upms:mode:read',
            'upms:mode:create',
            'upms:mode:update',
            'upms:mode:delete',
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
    },
    lucy: {
        token: 'lucy',
        userName: 'lucy',
        userId: 'lucy',
        age: 14,
        avatar: 'http://b-ssl.duitang.com/uploads/item/201901/09/20190109072726_aNNZd.thumb.700_0.jpeg',
        menuList: [
            'upms:role:read',
            'upms:role:create',
            'upms:role:update',
            'upms:role:delete',
            'upms:menu:read',
            'upms:menu:create',
            'upms:menu:update',
            'upms:menu:delete',
            'upms:log:read',
            'upms:log:create',
            'upms:log:update',
            'upms:log:delete',
        ]
    }
}

function pullUserInfo() {
    return userMap[getToken()]
}

export { userMap, pullUserInfo }