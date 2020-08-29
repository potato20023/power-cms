import Vue from 'vue'
import Vuex from 'vuex'


import permission from './module/permission'
import user from './module/user'
import mode from './module/mode'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        permission,
        user,
        mode
    },
    getters
})