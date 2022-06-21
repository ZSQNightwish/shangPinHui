<template>
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!--      列表栏的 过度动画-->
      <transition name="sort">
        <div class="sort" v-show="showList">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item"
                 v-for="(item,index) in list"
                 :key="list.categoryId"
                 :class="{active:index===currentIndex}">
              <h3 @mouseenter="itemClick(index)"
                  @mouseleave="leave">
                <a
                  :data-categoryName="item.categoryName"
                  :data-categoryId="item.categoryId">{{ item.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem"
                     v-for="(item2,index) in item.categoryChild"
                     :key="item2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="item2.categoryName"
                        :data-categoryId2="item2.categoryId">{{ item2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="(item3,index) in item2.categoryChild"
                          :key="item3.categoryId">
                        <a
                          :data-categoryName="item3.categoryName"
                          :data-categoryId3="item3.categoryId">{{ item3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {debounce, throttle} from "../../../common/untils";//防抖 和节流函数
export default {
  data() {
    return {
      currentIndex: -1,//为-1的时候，没有鼠标经过所有的都不会有样式变化
      showList: true,//默认显示列表
    }
  },
  methods: {
    /*列表栏的 节流*/
    itemClick(index) {
      // this.currentIndex = index
      this.currentIndex = index
      throttle(() => {
      }, 500)
    },
    leave() {
      console.log(666);
      this.currentIndex = -1
    },
    goSearch(event) {
      // this.$router.push('/search')
      let data = event.target;
      let {categoryname, categoryid, categoryid2, categoryid3} = data.dataset;
      if (categoryname) {
        let location = {name: 'search'}
        let query = {categoryName: categoryname}
        if (categoryid) {
          query.categoryId = categoryid
        } else if (categoryid2) {
          query.categoryId2 = categoryid2
        } else {
          query.categoryId3 = categoryid3
        }
        location.query = query;
        this.$router.push(location)
      }
    }
  },
  mounted() {

    /*当组件挂载完毕，当showlist 变为false 才能让他跳转的时候，不显示列表*/
    /*当为search组件内时候，为false 隐藏*/
    if (this.$route.name === 'search') {
      this.showList = false
    }
  },
  computed: {
    ...mapState({
      list: state => state.list
    })

  }
}
</script>

<style scoped lang="less">

.type-nav {
  .active {
    background-color: #666666;
  }

  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                  font-size: 12px;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
/* vue 过去动画*/
          .sort-enter {
            height: 0;
          }
          .sort-enter-to{
            height: 460px;
          }
          .hello-leave-active {
           transition: height .3s ease;
          }
        }
      }
    }
  }
}
</style>
