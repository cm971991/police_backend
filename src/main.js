import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import config from '../config/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(VueRouter)

// plugins
import UtilsPlugin from './assets/utils'
import HttpPlugin from './http'

Vue.use(UtilsPlugin)
Vue.use(HttpPlugin)

const router = new VueRouter({
  // mode: 'history',
  base: config.build.assetsPublicPath,
  routes
})

router.beforeEach((to, from, next) => {
  if (routes.find((x) => x.path === to.path || x.name === to.name)) {
    setTimeout(next, 50)
  } else if (routes[2].children && routes[2].children.find((x) => x.path === to.path || x.name === to.name)) {
    let name = to.name
    if (to.name === '订单详情') {
      name += '...' + to.query.OSN.substr(17, 5)
    }
    store.commit('ADD_MENU', {name, path: to.fullPath})
    setTimeout(next, 50)
  } else {
    setTimeout(() => next({name: '404'}), 50)
  }
})
router.afterEach((to) => {
  // 保存当前路由
  store.commit('SET_ROUTE', to)
})
sync(store, router)

// global
window.$globalHub = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

