import Vue from 'vue'
import VueRouter from 'vue-router'

/*路由的懒加载*/
const home = () => import('../views/home/home')
const login = () => import('../views/login/login')
const register = () => import('../views/register/register')
const search = () => import('../views/search/search')

Vue.use(VueRouter)

/*meta 路由元信息 显示和隐藏 通过配合 v-show 啦控制 显示隐藏，
v-show="$route.meta.show， 为true显示，*/
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home,
    meta:{show:true}
  },
  {
    path: '/login',
    component: login,
    meta:{show:false}
  },
  {
    path: '/register',
    component: register,
    meta:{show:false}
  },
  {
    path: '/search/:keywords',
    name:'search',
    component: search,
    meta:{show:true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
