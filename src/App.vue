<template>
  <div id="app">
    <headers/>
    <router-view/>
    <footers v-show="$route.meta.show"/>
    <keep-alive />
  </div>
</template>

<script>
import headers from "components/common/headers";
import footers from "components/common/footers";

export default {
  name: "app",
  components: {
    headers,
    footers
  },
  mounted() {
    //派发action 获取三级商品的数据
    this.$store.dispatch('requestCatgeoryList')
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
