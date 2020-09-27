import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import echarts from 'echarts'

import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$echarts = echarts
Vue.use(elementUI)




// 引入animated css
import '@/assets/style/animate.min.css'
// 全局mock接口
// import './mock'
// 全局权限检查
import './permission'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')