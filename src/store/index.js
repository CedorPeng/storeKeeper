import Vue from 'vue'
import Vuex from 'vuex'
/**
 * @页面刷新不丢失vuex传值的插件
 * @ npm install vuex-persistedstate
 * */
import createPersistence from 'vuex-persistedstate'

Vue.use(Vuex)

import oneVuexTransition from './module/oneVuexTransition'
import getters from './getters'


export default new Vuex.Store({
  modules: {
    oneVuexTransition
  },
  getters,
  plugins: [createPersistence({
    storage: window.sessionStorage
  })]
})




