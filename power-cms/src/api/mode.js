import requestD from '../utils/request';

// 获取变电站列表
export function getSubstationManagement(data){
    return requestD({
        url:'/rcpmcs/station/listConvertingStation',
        method:'get',
        params:data
    })
}