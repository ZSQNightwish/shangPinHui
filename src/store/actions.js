import {
  categoryList,
  bannerList,
  floorList,
  searchList,
  detailsList,
  shopCartList,
  mycartList,
  deleteGoods,
  changeChecked
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
    console.log(result);
    if (result.code === 200) {//200 代表成功
      return 'ok'
    } else {//加入购物车失败
      return Promise.reject(new Error('sorry,failed to add to cart'))
    }
  },
  /*
*
* 购物车请求
*
* */
  async getMyCart({commit}) {
    let result = await mycartList();
    if (result.code === 200) {
      commit('setCartList', result.data);
    }
  },
  /*
  *
  * 删除购物车产品 不需要返回数据 只需要成功或者失败
  * */
  async deleteCART({commit}, skuId) {
    let result = await deleteGoods(skuId)
    console.log(result);
    if (result.code === 200) {
      return 'ok'
    } else {//删除失败
      return Promise.reject(new Error('failed'))
    }
  },
  /*
  * 修改产品选中状态
  * */
  async changeStatus({commit}, {skuId, isChecked}) {
    let result = await changeChecked(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  /*
  * 删除全部勾选的产品
  * */
  deleteAllGoods({dispacth, getters}) {
//context 小仓库  commit 提交mutaions 修改state getters  dispath state仓库数据
    //现在获取的的就是 现在购物车中所存在的商品数据
    let PromiseAll = []
    getters.mycartLists.cartInfoList.forEach(item => {
      //result 返回的是一个Promise对象
      let result = item.isChecked === 1 ? dispacth('deleteCART', item.skuId) : ''
      PromiseAll.push(result)//将每一次返回的promise添加到数组中
    })
    return Promise.all(PromiseAll)
  },
  /*
 * 修改所有的选中状态
 * */
  updateIsAll({dispatch, state}, isChecked) {
    let PromiseAll = []
    state.mycartLists[0].cartInfoList.forEach(item => {
      let result = dispatch('changeStatus', {skuId: item.skuId, isChecked})
      PromiseAll.push(result)
    })
    return Promise.all(PromiseAll)
  }
}


