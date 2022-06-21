import {categoryList} from '@/network/home'

export default {
  async requestCatgeoryList({commit}) {
    let result = await categoryList();
/*    console.log(result);*/
    if (result.code === 200) {
      commit('setCategoryList', result.data);
    }
  }
}
