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
        data:data
    })
}