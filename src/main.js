import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './mock/mockServe' //引入模拟的mock数据

/*
* 解决双击报错的问题
* */
import Router from 'vue-router'

Vue.config.productionTip = false
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
