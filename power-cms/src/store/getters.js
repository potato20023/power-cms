const getters = {
    screenWidth: state => state.mode.screenWidth, // 获取屏幕宽度
    screenHeight: state => state.mode.screenHeight, // 获取屏幕高度
    // 用户信息
    appid: state => state.user.appid,
    userName: state => state.user.userName,
    userId: state => state.user.userId,
    avatar: state => state.user.avatar,
    menuList: state => state.user.menuList, // 系统权限列表
    csType: state => state.user.csType,   // 权限

    // 左侧折叠面板路由
    routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,

    breadList: state => state.mode.breadList, // 面包屑导航
    ifList: state => state.mode.ifList, // 列表页是否列表（false：显示新增或更新，true：显示列表）
}

export default getters