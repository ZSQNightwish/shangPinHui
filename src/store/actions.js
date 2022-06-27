import {
  categoryList,
  bannerList,
  floorList,
  searchList,
  detailsList,
  shopCartList
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
  async getSearch({commit}, params = {}) {
    let result = await searchList(params);
    console.log(result);
    if (result.code === 200) {
      commit('setSearchList', result.data);
    }
  },
  /*
  *
  * 商品细节的数据
  *
  *
  * */

  async getDetails({commit}, skuId) {
    let result = await detailsList(skuId);
    if (result.code === 200) {
      commit('setDetailsList', result.data);
    }
  },
  /*
  *
  * 将产品添加到购物车
  *添加成功 200 代表成功，不需要存储数据
  * */
  async getShopCart({commit}, {skuId, skuNum}) {
    let result = await shopCartList(skuId, skuNum)
    if (result.code === 200) {//200 代表成功
      return 'ok'
    } else {//加入购物车失败
      return Promise.reject(new Error('sorry,failed to add to cart'))
    }
  }
}
