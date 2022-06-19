import Vue from 'vue'
import VueRouter from 'vue-router'

/*路由的懒加载*/
const home = () => import('../views/home/home')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
