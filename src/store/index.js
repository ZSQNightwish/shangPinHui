import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import modules from "./modules"
import getters from "./getters"

import {getUUID} from "../common/untils"// 封装的游客临时身份 随机字符串

Vue.use(Vuex)
const state = {
  list: [],
  bannerList: [],
  floorList: [],
  searchList: {},
  detailsList: {},
  uuid_token: getUUID(),//游客的临时身份id
  mycartList: []
};
export default new Vuex.Store({
  state,
  getters,//简化获取store中的数据
  mutations,
  actions,
  modules
})
