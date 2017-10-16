import login from './pages/login/login.vue'
import notFind from './components/404.vue'

export default [
  {path: '/', component: login},
  {path: '/login', component: login},
  {
    path: '/main',
    component: resolve => require(['./layouts/Main.vue'], resolve),
    children: [
      {
        path: '/404',
        name: '404',
        component: notFind
      },
      {
        path: '/single_tracking',
        name: '单个定位',
        component: resolve => require(['./pages/tracking/single/singleTracking.vue'], resolve)
      },
      {
        path: '/batch_tracking',
        name: '批量定位',
        component: resolve => require(['./pages/tracking/batch/batchTracking.vue'], resolve)
      },
      {
        path: '/log_operation',
        name: '操作日志',
        component: resolve => require(['./pages/log/log.vue'], resolve)
      }
    ]
  }
]
