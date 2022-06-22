import {categoryList, bannerList, floorList} from '@/network/home'

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
  }
}

