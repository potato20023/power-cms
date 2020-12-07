const state = {
    screenWidth: document.documentElement.clientWidth, // 屏幕宽度
    screenHeight: document.documentElement.clientHeight, // 屏幕高度
    breadList: [], // 面包屑导航
    ifList: sessionStorage.getItem('ifList') ? sessionStorage.getItem('ifList') : true, // 列表页是否列表（false：显示新增或更新，true：显示列表）
}

const mutations = {
    // 设置屏幕宽度
    'SET_SCREEN_WIDTH': (state, res) => {
        state.screenWidth = res
    },
    // 设置屏幕高度
    'SET_SCREEN_HEIGHT': (state, res) => {
        state.screenHeight = res
    },
    // 设置面包屑导航
    SET_BREAD_LIST: (state, res) => {
        state.breadList = res
    },
    // 列表页是否列表
    SET_IF_LIST: (state, res) => {
        state.ifList = res
    }
}
const actions = {}

export default {
    state,
    mutations,
    actions
}