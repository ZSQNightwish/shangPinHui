import {setTOKEN,removeTOKEN} from "@/common/token"//封装的 本地存储的token数据
export default {
  setCategoryList(state, list) {
    state.list = list;
  },
  setBannserList(state, bannerList) {
    state.bannerList = bannerList;
  },
  setFloorListList(state, floorList) {
    state.floorList = floorList;
  },
  setSearchList(state, searchList) {
    state.searchList = searchList
  },
  setDetailsList(state, detailsList) {
    state.detailsList = detailsList
  },
  setCartList(state, mycartList) {
    state.mycartList = mycartList
  },
  setCODE(state, user) {
    state.user = user
  },
  userLOGIN(state, token) {
    state.token = token
  },
  userINFOSS(state, userinfo) {
    state.userinfo = userinfo
  },
  changeLogin(state) {
    state.token = '';
    state.userinfo = {}
    removeTOKEN();//清空本地存储的token
  }

}
