import requestD from '../utils/request';

// 获取用户列表
export function getUserList(data){
    return requestD({
        url:'/rcpmcs/user/listSystemUser',
        method:'post',
        params:data
    })
}
// 新增用户
export function addUser(data){
    return requestD({
        url:'/rcpmcs/user/saveSystemUser',
        method:'post',
        params:data
    })
}
// 编辑用户
export function updateUser(data){
    return requestD({
        url:'/rcpmcs/user/updateSystemUser',
        method:'post',
        params:data
    })
}
// 删除用户
export function deleteUser(data){
    return requestD({
        url:'/rcpmcs/user/opSystemUser',
        method:'post',
        params:data
    })
}

// 获取变电站列表
export function getSubstationManagement(data){
    return requestD({
        url:'/rcpmcs/station/listConvertingStation',
        method:'post',
        params:data
    })
}
// 新增变电站
export function addSubstationManagement(data){
    return requestD({
        url:'/rcpmcs/station/saveConvertingStation',
        method:'post',
        params:data
    })
}
// 编辑变电站
export function updateSubstationManagement(data){
    return requestD({
        url:'/rcpmcs/station/updateConvertingStation',
        method:'post',
        params:data
    })
}
// 删除变电站
export function deleteSubstationManagement(data){
    return requestD({
        url:'/rcpmcs/station/deleteConvertingStation',
        method:'post',
        params:data
    })
}

// 获取线路列表
export function getLineManagement(data){
    return requestD({
        url:'/rcpmcs/station/listStationLine',
        method:'post',
        params:data
    })
}
// 新增线路
export function addLineManagement(data){
    return requestD({
        url:'/rcpmcs/station/saveStationLine',
        method:'post',
        params:data
    })
}
// 编辑线路
export function updateLineManagement(data){
    return requestD({
        url:'/rcpmcs/station/updateStationLine',
        method:'post',
        params:data
    })
}
// 删除线路
export function deleteLineManagement(data){
    return requestD({
        url:'/rcpmcs/station/deleteStationLine',
        method:'post',
        params:data
    })
}

// 获取采集器列表
export function getCollectorManagement(data){
    return requestD({
        url:'/rcpmcs/station/listStationCollector',
        method:'post',
        params:data
    })
}
// 新增采集器
export function addCollectorManagement(data){
    return requestD({
        url:'/rcpmcs/station/saveStationCollector',
        method:'post',
        params:data
    })
}
// 编辑采集器
export function updateCollectorManagement(data){
    return requestD({
        url:'/rcpmcs/station/updateStationCollector',
        method:'post',
        params:data
    })
}
// 删除采集器
export function deleteCollectorManagement(data){
    return requestD({
        url:'/rcpmcs/station/deleteStationCollector',
        method:'post',
        params:data
    })
}

// 获取电表列表
export function getAmmeterList(data){
    return requestD({
        url:'/rcpmcs/ammeter/listAmmeter',
        method:'post',
        params:data
    })
}
// 新增电表
export function addAmmeter(data){
    return requestD({
        url:'/rcpmcs/ammeter/saveAmmeter',
        method:'post',
        params:data
    })
}
// 编辑电表
export function updateAmmeter(data){
    return requestD({
        url:'/rcpmcs/ammeter/updateAmmeter',
        method:'post',
        params:data
    })
}
// 删除电表
// export function deleteAmmeter(data){
//     return requestD({
//         url:'/rcpmcs/station/deleteStationCollector',
//         method:'post',
//         params:data
//     })
// }

//登录日志列表
export function getLogList(data){
    return requestD({
        url:'/rcpmcs/log/listLogLogin',
        method:'post',
        params:data
    })
}
export function getLogOperationList(data){
    return requestD({
        url:'/rcpmcs/log/listLogOperation',
        method:'post',
        params:data
    })
}