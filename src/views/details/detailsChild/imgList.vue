<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="(item,index) in skuInfo.skuImageList"
           :key="index">
        <!--轮播图    -->
        <img :src="item.imgUrl" alt=""
             :class="{active: currentIndex === index}"
             @click="change(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>
<script>
import Swiper from "swiper" //引入下载的swiper插件
import "swiper/css/swiper.min.css"//引入对应的css样式文件

import {mapGetters} from "vuex";

export default {
  name: "imgList",
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    change(index) {
      this.currentIndex = index
      this.$bus.$emit('getIndex',this.currentIndex)

    }
  },
  computed: {
    ...mapGetters(['skuInfo'])
  },
  watch: {
    skuInfo(newValue, oldValue) {
      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {
          loop: true, // 循环模式选项
          pagination: { // 如果需要分页器
            el: '.swiper-pagination',
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          //控制显示几张图片的位置
          slidesPerView: 3
        })
      })
    }
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
    float: left;

    img {
      width: 50px;
      height: 50px;
      overflow: hidden;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 12px;
    top: 21px;
    width: 19px;
    height: 50px;
    background-color: #ccc;
  }

  .swiper-button-prev {
    right: auto;
    left: 0;
    top: 21px;
    width: 19px;
    height: 50px;
    background-color: #ccc;
  }

}
</style>
