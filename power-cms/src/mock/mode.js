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
                    userNum: 100001, //用户编号
                    userName: '张琳', // 用户名字
                    phone: 15844821640, // 电话
                    identityNum: 1,  // 用户身份 1:超级管理员 2:变电站管理员  3:普通员工
                    identityName:'超级管理员',
                    createTime: '2018-09-25', // 创建时间
                    state: 1, // 状态 1:正常 2：停用
                    password:'123456'
                },
                {
                    userNum: 100002,
                    userName: '马东',
                    phone: 15844821640,
                    identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                    identityName:'变电站管理员',
                    createTime: '2018-09-25', // 创建时间
                    state: 2, // 状态
                    password:'123456'
                },
                {
                    userNum: 100003,
                    userName: '张山',
                    phone: 15844821640,
                    identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                    identityName:'变电站管理员',
                    createTime: '2018-09-25', // 创建时间
                    state: 2, // 状态
                    password:'123456'
                },
                {
                    userNum: 100004,
                    userName: '徐东',
                    phone: 15844821640,
                    identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                    identityName:'变电站管理员',
                    createTime: '2018-09-25', // 创建时间
                    state: 2, // 状态
                    password:'123456'
                },
                {
                    userNum: 100005,
                    userName: '张琳',
                    phone: 15844821640,
                    identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                    identityName:'变电站管理员',
                    createTime: '2018-09-25', // 创建时间
                    state: 2, // 状态
                    password:'123456'
                },
                {
                    userNum: 100006,
                    userName: '张琳',
                    phone: 15844821640,
                    identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                    identityName:'变电站管理员',
                    createTime: '2018-09-25', // 创建时间
                    state: 2, // 状态
                    password:'123456'
                },
                {
                    userNum: 100007,
                    userName: '张琳',
                    phone: 15844821640,
                    identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                    identityName:'变电站管理员',
                    createTime: '2018-09-25', // 创建时间
                    state: 2, // 状态
                    password:'123456'
                },
                {
                    userNum: 100008,
                    userName: '张琳',
                    phone: 15844821640,
                    identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                    identityName:'变电站管理员',
                    createTime: '2018-09-25', // 创建时间
                    state: 2, // 状态
                    password:'123456'
                },
                {
                    userNum: 100009,   //用户编号
                    userName: '张琳',
                    phone: 15844821640,
                    identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                    identityName:'变电站管理员',
                    createTime: '2018-09-25', // 创建时间
                    state: 2, // 状态
                    password:'123456'
                },
                {
                    userNum: 100010,
                    userName: '张琳',
                    phone: 15844821640,
                    identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                    identityName:'变电站管理员',
                    createTime: '2018-09-25', // 创建时间
                    state: 2, // 状态
                    password:'123456'
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