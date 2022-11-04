import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '健康码',
      component: () => import('@/views/home/index'),
      meta: {
        title:"杭州市扫码通行"
      }
    }
  ]
})



// WEBPACK FOOTER //
// ./src/router/index.js