import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

/*路由的懒加载*/
const home = () => import('../views/home/home')
const login = () => import('../views/login/login')
const register = () => import('../views/register/register')
const search = () => import('../views/search/search')
const detail = () => import('../views/details/detail')
const shopcart = () => import('../views/shopCart/shopcart')
const mycart = () => import('../views/shopCart/mycart')
const trade = () => import('../views/trade/trade')

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
    meta: {show: true}
  },
  {
    path: '/mycart',
    name: 'mycart',
    component: mycart,
    meta: {show: true}
  },
  {
    path: '/trade',
    name: 'trade',
    component: trade,
    meta: {show: true}
  }
]

const router = new VueRouter({
  mode: 'history', base: process.env.BASE_URL, routes, //vue原生的滚动效果
  scrollBehavior(to, from, savePosition) {
    //返回的y为0 代表滚动条在最上方
    //效果 当你浏览一个页面到最底部的时候，滚动条也再最底部的，此时你要跳转到新的页面
    //在新的页面里 滚动条应该在最顶部 才合理，而不是还在底部
    return {y: 0}
  }
})
/*
*
* 全局守卫 ：前置守卫 在路由跳转之前进行判断
*
* */
router.beforeEach(async (to, from, next) => {
//from to 从哪里到哪里 next()是 放行函数 next(path) next(false)
  next();
  //当用户登录了 才会有token
  let token = store.state.user.token
  let name = store.state.user.userinfo.name
  //登录之后 就无法再次进入登录页面 让他跳转到首页
  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      //登录了 但是进的不是login
      if (name) {
        next();
      } else {
        //没有用户信息.派发action让仓库存储用户信息在跳转
        try {
          //获取用户信息成功放行
          await store.dispatch('userInfo')
          next();
        } catch (error) {
          //token失效获取不到用户信息 需要清除之前的token 然后跳转到login 重新派发token
          store.dispatch('userlogOUT');
          next('/login')
        }
      }
      next()
    }
  } else {
    //未登录 全部放行
    next();
  }
})

export default router
