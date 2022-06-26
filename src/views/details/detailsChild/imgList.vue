<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <!--轮播图    -->
        <img :src="skuInfo.skuDefaultImg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: "imgList",
  computed: {
    ...mapGetters(['skuInfo'])
  }
}
</script>
<style lang="less" scoped>
li {
  list-style: none;
}

.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }
}
</style>
