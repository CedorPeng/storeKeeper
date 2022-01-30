import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage/index.vue'
import sale from '@/components/sale/index.vue'
import stock from '@/components/stock/index.vue'
import purchase from '@/components/purchase/index.vue'
import storeManage from '@/components/storeManage/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/sale',
      name: 'sale',
      component: sale
    },
    {
      path: '/stock',
      name: 'stock',
      component: stock
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: purchase
    },
    {
      path: '/storeManage',
      name: 'storeManage',
      component: storeManage
    },
    {
      path: '*',
      name: 'homePage',
      component: homePage
    },
  ]
})
