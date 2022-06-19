<template>
  <div id="app">
    <headers/>
    <router-view/>
    <footers v-show="$route.meta.show"/>

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
}
</script>

<style>
@import "assets/css/base.css";
</style>
