<template>
  <div id="home">
    <index/>
    <listcontainer/>
    <recommend/>
    <rank/>
    <like/>
    <floors v-for="(item,index) in floorList"
            :key="item.id"
            :list="item"/>
  </div>
</template>

<script>
import index from "components/content/TypeNav/index" //图标下面的导航栏
import listcontainer from "components/content/listContainer/listcontainer"; //商品汇快报模块
import recommend from "components/content/TodayRecommend/recommend";//今日推荐模块
import rank from "components/content/Rank/rank";//排行模块
import like from "components/content/GuessLike/like";//猜你喜欢模块
import floors from "components/content/floor/floors";//多楼层模块

import {mapState} from "vuex";

export default {
  name: "home",
  components: {
    index,
    listcontainer,
    recommend,
    rank,
    like,
    floors

  },
  mounted() {
    this.$store.dispatch('getFloor')
    //当用户登录成功之后，在首页展示信息派发actions
    // this.$store.dispatch('userInfo')
  },
  computed: {
    ...mapState({
      floorList: state => state.floorList
    })
  }
}
</script>

<style scoped>

</style>
