// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/index.css';
import clickoutside from '@/util/clickoutside';
import './assets/iconfont/iconfont.css'
import less from 'less'
import CedorUtils from './util/index'
import axios from './util/axios'

Vue.use(less)
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.directive('clickoutside', clickoutside)

Vue.config.productionTip = false
Vue.prototype.utils = CedorUtils
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
