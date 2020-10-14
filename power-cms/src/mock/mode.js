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
            identityName: '超级管理员',
            createTime: '2018-09-25', // 创建时间
            state: 1, // 状态 1:正常 2：停用
            password: '123456'
        },
        {
            userNum: 100002,
            userName: '马东',
            phone: 15844821640,
            identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
            identityName: '变电站管理员',
            createTime: '2018-09-25', // 创建时间
            state: 2, // 状态
            password: '123456'
        },
        {
            userNum: 100003,
            userName: '张山',
            phone: 15844821640,
            identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
            identityName: '变电站管理员',
            createTime: '2018-09-25', // 创建时间
            state: 2, // 状态
            password: '123456'
        },
        {
            userNum: 100004,
            userName: '徐东',
            phone: 15844821640,
            identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
            identityName: '变电站管理员',
            createTime: '2018-09-25', // 创建时间
            state: 2, // 状态
            password: '123456'
        },
        {
            userNum: 100005,
            userName: '张琳',
            phone: 15844821640,
            identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
            identityName: '变电站管理员',
            createTime: '2018-09-25', // 创建时间
            state: 2, // 状态
            password: '123456'
        },
        {
            userNum: 100006,
            userName: '张琳',
            phone: 15844821640,
            identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
            identityName: '变电站管理员',
            createTime: '2018-09-25', // 创建时间
            state: 2, // 状态
            password: '123456'
        },
        {
            userNum: 100007,
            userName: '张琳',
            phone: 15844821640,
            identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
            identityName: '变电站管理员',
            createTime: '2018-09-25', // 创建时间
            state: 2, // 状态
            password: '123456'
        },
        {
            userNum: 100008,
            userName: '张琳',
            phone: 15844821640,
            identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
            identityName: '变电站管理员',
            createTime: '2018-09-25', // 创建时间
            state: 2, // 状态
            password: '123456'
        },
        {
            userNum: 100009,   //用户编号
            userName: '张琳',
            phone: 15844821640,
            identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
            identityName: '变电站管理员',
            createTime: '2018-09-25', // 创建时间
            state: 2, // 状态
            password: '123456'
        },
        {
            userNum: 100010,
            userName: '张琳',
            phone: 15844821640,
            identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
            identityName: '变电站管理员',
            createTime: '2018-09-25', // 创建时间
            state: 2, // 状态
            password: '123456'
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

const datas = {
    code: 200,
    data: {
        name: '名字',
        obj: {
            over: '290',
            all: '1000'
        },
        list: [
            {
                userNum: 100008,
                userName: '张琳',
                phone: 15844821640,
                identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                identityName: '变电站管理员',
                createTime: '2018-09-25', // 创建时间
                state: 2, // 状态
                password: '123456'
            },
            {
                userNum: 100009,   //用户编号
                userName: '张琳',
                phone: 15844821640,
                identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                identityName: '变电站管理员',
                createTime: '2018-09-25', // 创建时间
                state: 2, // 状态
                password: '123456'
            },
            {
                userNum: 100010,
                userName: '张琳',
                phone: 15844821640,
                identityNum: 2, // 1:超级管理员 2:变电站管理员  3:普通员工
                identityName: '变电站管理员',
                createTime: '2018-09-25', // 创建时间
                state: 2, // 状态
                password: '123456'
            }
        ]
    }
}

const datas1 = {
    code: 300,
    message: '错误说明文字'
}

const aaa = {
    code: 200,
    data: {
        list: [
            {
                id: 2,
                stationName: "测试111",
                stationAddress: "222",
                stationFzr: "222",
                stationFzrdh: "222",
                createTime: "2020-09-22T19:52:11.000+00:00",
                upTime: "2020-09-23T23:12:36.000+00:00",
                level: "34",
                opuser: 1,
                status: 1,
            },
            {
                id: 1,
                stationName: "11",
                stationAddress: "11",
                stationFzr: "11",
                stationFzrdh: "11",
                createTime: "2020-09-22T19:50:01.000+00:00",
                upTime: "2020-09-23T23:04:05.000+00:00",
                level: "11",
                opuser: 1,
                status: 0,
            }
        ],
        total: 34
    },
    message: '成功'
}

export { orderList, userList, userAddSelect }