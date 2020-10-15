import requestD from '../utils/request';

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