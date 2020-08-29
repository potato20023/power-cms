// 客户工单分配列表
const orderList = {
        code: 200,
        data: {
            list: [{
                    title: '待分配',
                    num: 68
                },
                {
                    title: '抢单中',
                    num: 3
                },
                {
                    title: '跟踪中',
                    num: 5
                },
                {
                    title: '已成交',
                    num: 13
                },
                {
                    title: '留存',
                    num: 68
                },
            ]
        }
    }
    // 客户管理数据列表
const userList = {
        code: 200,
        data: {
            list: [{
                    userNum: 100001, //客户编号
                    userName: '张琳梵', // 客户名字
                    phone: 15844821640, // 电话
                    job: '餐饮', // 行业
                    address: '河南省郑州市高新区翠竹街88号', // 地址
                    from: '手动录入', //来源
                    salesman: '李明', // 销售人员
                    createTime: '2018-09-25', // 入库时间
                    state: 1, // 状态
                    track: '15', // 跟踪
                    degree: 3 // 难易度
                },
                {
                    userNum: 100002,
                    userName: '马东',
                    phone: 15844821640,
                    job: '餐饮',
                    address: '河南省郑州市高新区翠竹街33号',
                    from: '手动录入',
                    salesman: '李明',
                    createTime: '2018-09-25',
                    state: 2,
                    track: '15',
                    degree: 3
                },
                {
                    userNum: 100003,
                    userName: '山西面馆',
                    phone: 15844821640,
                    job: '餐饮',
                    address: '河南省郑州市高新区翠竹街88号',
                    from: '手动录入',
                    salesman: '李明',
                    createTime: '2018-09-25',
                    state: 3,
                    track: '15',
                    degree: 3
                },
                {
                    userNum: 100004,
                    userName: '徐东旭',
                    phone: 15844821640,
                    job: '餐饮',
                    address: '河南省郑州市高新区翠竹街88号',
                    from: '手动录入',
                    salesman: '李明',
                    createTime: '2018-09-25',
                    state: 4,
                    track: '15',
                    degree: 4
                },
                {
                    userNum: 100005,
                    userName: '张琳梵',
                    phone: 15844821640,
                    job: '百货',
                    address: '河南省郑州市高新区翠竹街88号',
                    from: '手动录入',
                    salesman: '李明',
                    createTime: '2018-09-25',
                    state: 5,
                    track: '15',
                    degree: 3
                },
                {
                    userNum: 100006,
                    userName: '张琳梵',
                    phone: 15844821640,
                    job: '餐饮',
                    address: '河南省郑州市高新区翠竹街88号',
                    from: '手动录入',
                    salesman: '李明',
                    createTime: '2018-09-25',
                    state: 1,
                    track: '15',
                    degree: 3
                },
                {
                    userNum: 100007,
                    userName: '张琳梵',
                    phone: 15844821640,
                    job: '餐饮',
                    address: '河南省郑州市高新区翠竹街88号',
                    from: '手动录入',
                    salesman: '李明',
                    createTime: '2018-09-25',
                    state: 1,
                    track: '15',
                    degree: 3
                },
                {
                    userNum: 100008,
                    userName: '张琳梵',
                    phone: 15844821640,
                    job: '餐饮',
                    address: '河南省郑州市高新区翠竹街88号',
                    from: '手动录入',
                    salesman: '李明',
                    createTime: '2018-09-25',
                    state: 1,
                    track: '15',
                    degree: 3
                },
                {
                    userNum: 100009,
                    userName: '张琳梵',
                    phone: 15844821640,
                    job: '餐饮',
                    address: '河南省郑州市高新区翠竹街88号',
                    from: '手动录入',
                    salesman: '李明',
                    createTime: '2018-09-25',
                    state: 1,
                    track: '15',
                    degree: 3
                },
                {
                    userNum: 1000010,
                    userName: '张琳梵',
                    phone: 15844821640,
                    job: '餐饮',
                    address: '河南省郑州市高新区翠竹街88号',
                    from: '手动录入',
                    salesman: '李明',
                    createTime: '2018-09-25',
                    state: 1,
                    track: '15',
                    degree: 3
                }
            ]
        }
    }
    // 客户新增中选项的信息
const userAddSelect = {
    code: 200,
    data: {
        jobList: [
            { label: '超市百货', value: 1 },
            { label: '餐饮', value: 2 },
            { label: '商铺', value: 3 },
            { label: '五金', value: 4 },
            { label: '五金', value: 5 },
            { label: '物业', value: 6 },
            { label: '商铺', value: 3 },
            { label: '五金', value: 4 },
            { label: '五金', value: 5 },
            { label: '物业', value: 6 },
        ]
    }
}

export { orderList, userList, userAddSelect }