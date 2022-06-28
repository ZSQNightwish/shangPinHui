export default {
//主要作用是，简化仓库中的数据；
  //把将来用在组件中的数据简化 数据结构 search最大仓库  searchList goodsList
  //下方是 search 界面 需要用到的数据，
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  /*
  *
  *商品详情的数据简化
  * */
  categoryView(state) {
    //这里需要判断;有组件挂载之后，数据还没有请求成功
    return state.detailsList.categoryView || {}
  },
  //手机旁边的数据的简化
  skuInfo(state) {
    return state.detailsList.skuInfo || {}
  },
  //产品信息简化
  spuSaleAttrList(state) {
    return state.detailsList.spuSaleAttrList || []

  },
  /*
  *关于购物车返回的数据的简化
  *
  */
  mycartLists(state) {
    return state.mycartList[0]
  }
}
