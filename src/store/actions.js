import {
  categoryList,
  bannerList,
  floorList,
  searchList
} from '@/network/home'

export default {
  async requestCatgeoryList({commit}) {
    let result = await categoryList();
    /*    console.log(result);*/
    if (result.code === 200) {
      commit('setCategoryList', result.data);
    }
  },
  async getBanner({commit}) {
    let result = await bannerList();
    console.log(result);
    if (result.code === 200) {
      commit('setBannserList', result.data);
    }
  },
  /*获取floor数据*/
  async getFloor({commit}) {
    let result = await floorList();
    if (result.code === 200) {
      commit('setFloorListList', result.data);
    }
  },
/*
*
*
* 搜索界面的网络数据
*
* */
  async getSearch({commit},params={}) {
    let result = await searchList(params);
    console.log(result);
    if (result.code === 200) {
      commit('setSearchList', result.data);
    }
  }
}

