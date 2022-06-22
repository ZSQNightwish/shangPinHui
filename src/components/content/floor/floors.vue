<template>
  <!--楼层-->
  <div class="floor">
    <div class="title clearfix">
      <div class="fl">{{ list.name }}</div>
      <div class="fr">
        <ul class="nav-tabs ">
          <li class="active" v-for="item in list.navList">
            <a :href="item.url" data-toggle="tab">{{ item.text }}</a>
          </li>

        </ul>
      </div>
    </div>
    <div class="py-container">
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(item,index) in list.keywords" :key="index">{{ item }}</li>
              </ul>
              <img :src="list.imgUrl"/>
            </div>
            <div class="floorBanner">
              <div class="swiper-container" id="floor1Swiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <swiper>
                      <swiper-item v-for="item in list.carouselList" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                      </swiper-item>
                    </swiper>
                  </div>
                </div>
              </div>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[0]"/>
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]"/>
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg"/>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]"/>
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[3]"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper/index"//封装的轮播模块
export default {
  name: "floors",
  components: {
    Swiper,
    SwiperItem
  },
  props: ['list']

}
</script>

<style scoped lang="less">

.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }

  .title {
    width: 1200px;
    height: 40px;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;

    li {
      list-style: none;
    }

    .fl {
      float: left;
      font-size: 16px;
      color: red;
      font-weight: 700;

    }

    .nav-tabs li a {
      float: right;
      padding-left: 18px;
      font-size: 13px;
    }


  }
}

</style>
