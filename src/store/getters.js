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
  }
}
