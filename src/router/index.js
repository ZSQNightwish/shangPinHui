import Vue from 'vue'
import VueRouter from 'vue-router'

/*路由的懒加载*/
const home = () => import('../views/home/home')
const login = () => import('../views/login/login')
const register = () => import('../views/register/register')
const search = () => import('../views/search/search')
const detail = () => import('../views/details/detail')
const shopcart = () => import('../views/shopCart/shopcart')

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
    meta: {show: true}
  },
  {
    path: '/login',
    component: login,
    meta: {show: false}
  },
  {
    path: '/register',
    component: register,
    meta: {show: false}
  },
  {
    path: '/search/:keywords',
    name: 'search',
    component: search,
    meta: {show: true}
  },
  {
    path: '/detail/:skuid',
    component: detail,
    meta: {show: true}
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: shopcart,
    meta: {show:true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  //vue原生的滚动效果
  scrollBehavior(to, from, savePosition) {
    //返回的y为0 代表滚动条在最上方
    //效果 当你浏览一个页面到最底部的时候，滚动条也再最底部的，此时你要跳转到新的页面
    //在新的页面里 滚动条应该在最顶部 才合理，而不是还在底部
    return {y: 0}
  }
})

export default router
