import {
  categoryList,
  bannerList,
  floorList,
  searchList,
  detailsList,
  shopCartList,
  mycartList,
  deleteGoods,
  changeChecked,
  CodeREQ,
  userREQ,
  loginREQ,
  GETREQ,
  logOutREQ
} from '@/network/home'

import {setTOKEN, removeTOKEN} from "@/common/token"//封装的 本地存储的token数据

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
    state.mycartLists.cartInfoList.forEach(item => {
      let result = dispatch('changeStatus', {skuId: item.skuId, isChecked})
      PromiseAll.push(result)
    })
    return Promise.all(PromiseAll)
  },
  /*
  * 获取验证码请求
  * */
  async getCode({commit}, phone) {
    let result = await CodeREQ(phone)
    //如果成功存储验证码
    if (result.code === 200) {
      commit('setCODE', result.data)
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  /*
  * 用户注册请求 这里user或起名字叫data 都可以
  * */
  async userRegister({commit}, user) {
    let result = await userREQ(user)
  },
  /*
* 登录请求
* */
  async userLogin({commit}, data) {
    let result = await loginREQ(data)
    //服务器下发的token 需要验证token和用户匹配 展示
    //vuex 中存储的数据，一刷新就会消失，因为token需要持续化存储，so可以存储到本地
    if (result.code === 200) {
      commit('userLOGIN', result.data)
      //持续化的存储token 存储到本地 然后使用getitem
      // localStorage.setItem('TOKEN', result.data.token)
      //下方的写法和上方一样，下方的是从外面引入封装的函数，
      setTOKEN(result.data.token)
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  /*
  * 获取用户登录成功之后 去向服务器索取token数据展示 带着用户的token
  * 需要把token存储到本地，添加到请求头里面
  * */
  async userInfo({commit}) {
    let result = await GETREQ()
    if (result.code === 200) {
      commit('userINFOSS', result.data)
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  /*
  * 退出登录的请求
  * */
  async userlogOUT({commit}) {
    let result = await logOutREQ()
    console.log(result);
    if (result.code === 200) {
      commit('changeLogin')
    }else {
      return Promise.reject(new Error('failed'))
    }
  }
}


