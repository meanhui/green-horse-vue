import Vue from 'vue'
import Router from 'vue-router'
import HealthPage from '@/components/HealthPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HealthPage',
      component: HealthPage,
      meta: {
        title:"杭州市扫码通行"
      }
    }
  ]
})



// WEBPACK FOOTER //
// ./src/router/index.js