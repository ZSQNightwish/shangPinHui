<template>
  <div>
    <!--利用.native 修饰符去监听组件的 鼠标事件，    -->
    <index @mouseenter.native="searchShowList" ref="child" @mouseleave.native="hideList"/>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 下列都是面包屑关于的展示：：           分类的面包屑-->
            <li class="with-x" v-show="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeName">×</i>
            </li>
            <!--            关键字的面包屑-->
            <li class="with-x" v-show="searchParams.keywords">{{ searchParams.keywords }}<i @click="removeKeyword">×</i>
            </li>
            <!--     品牌 trandmark的面包屑-->
            <li class="with-x" v-show="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
              @click="removetrademark">×</i>
            </li>
            <!--    售卖属性的展示：比如 型号，内存啥的 因为里面的属性很多，需要截取  -->
            <li class="with-x" v-for="(item,index) in searchParams.props"
                :key="index">{{ item.split(':')[1] }}<i
              @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <search-selector @trandmarkInfo="trandmarkInfo"
                         @attrInfo="attrInfo"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeSort('1')"><a>综合<span v-show="isOne">↑</span></a></li>
                <li :class="{active:isTwo}" @click="changeSort('2')"><a>价格<span v-show="isTwo">↓</span></a></li>
              </ul>
            </div>
          </div>
          <!--          商品展示列表-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(item,index) in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`">
                      <img :src="item.defaultImg" alt="">
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="#" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ item.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="#" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--    这里是先test 传一些假数据-->
    <pages :pageNo="searchParams.pageNo"
           :pageSize="searchParams.pageSize"
           :total="total"
           :continues="5"
           @getPageNo="getPageNo"/>
  </div>

</template>

<script>
import index from "@/components/content/TypeNav/index";//搜索模块的 导航栏引入
import searchSelector from "./searchChild/SearchSelector";
import pages from "../../components/common/pages";//分页的模块

import {mapGetters, mapState} from "vuex";//映射vuex的 仓库数据为 本地search数据


export default {
  name: "search",
  components: {
    index,
    searchSelector,
    pages
  },
  data() {
    return {
      searchParams: {
        category1Id: "",//产品相应的id
        category2Id: "",
        category3Id: "",
        categoryName: "", //产品的名字
        keywords: "", //搜索的关键字
        order: "1:desc", //排序:初始状态应该是综合且降序 参数：{1：综合 ；2：价格  asc：升序 decs：降序}
        pageNo: 1, //第几页
        pageSize: 10, //每一页展示条数
        props: [], //平台属性的操作
        trademark: "",//品牌
        total: ''

      },
    }
  },
  methods: {
    searchShowList() {
      this.$refs.child.showList = true;
    },
    hideList() {
      this.$refs.child.showList = false
    },
    /*
    *
    *网络请求  向服务器发送请求 返回search 的数据
    * 封装的函数调用，mounted
    * */
    getSearchDate() {
      this.$store.dispatch('getSearch', this.searchParams)
    },
    removeName() {
      this.searchParams.categoryName = '';//只是清空了分类标签；还需要清除下面展示的该分类的数据
      //所以还需要发送请求置空之前的数据
      // this.searchParams.category1Id = '';
      // this.searchParams.category2Id = '';
      // this.searchParams.category3Id = '';
      //上方的写法也可以，还是上方还会把字段带给服务器，当为underfined时不会带给服务器；减少占带宽
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getSearchDate();
      //删除的同时，也需要更改地址栏的参数
      if (this.$route.params) {
        this.$router.push({name: 'search', params: this.$route.params})
      }
    },
    removeKeyword() {
      this.searchParams.keywords = undefined
      //再次发送请求
      this.getSearchDate();
      /*清空搜索框的keyword*/
      this.$bus.$emit('clear')
      if (this.$route.query) {
        this.$router.push({name: 'search', query: this.$route.query})
      }
    },
    removetrademark() {
      this.searchParams.trademark = '';
      this.getSearchDate();
    },
    removeProps(index) {
      console.log(index);
      this.searchParams.props.splice(index, 1)
      this.getSearchDate();
    },
    trandmarkInfo(item) {
      console.log('我是父组件', item);
      this.searchParams.trademark = `${item.tmId}:${item.tmName}`;
      this.getSearchDate();
    },
    attrInfo(attr, attrValue) {
      // console.log(attr, attrValue);
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      /*这里的判断是 点击在面包屑上展示，但是一直点击就会一直展示
      * 所以就需要去重，如果这个面包屑已经有了，就不push*/
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
      }
      this.getSearchDate();
    },
    /*排序操作*/
    changeSort(flag) {
      //flag 是一个标记 代表用户点击的是综合1 还是价格2 用户点击的时候传递进来
      // let originOrder = this.searchParams.order
      //下方获取的是 最初始的状态
      let originFlag = this.searchParams.order.split(':')[0]//代表1还是2
      let originSort = this.searchParams.order.split(':')[1]//代表升序还是降序 默认是desc
      // console.log(originFlag);console.log(originSort);
      let newOrder = ''
      //点击的是综合 1是综合  2是价格；如果是1判断综合：升？降 默认是desc 如果等于desc就是降序，如果不等asc升序
      //起始的状态是 综合1：降序desc
      //如果用点击的是价格2，if判断不等，执行else;如果在此点击价格 执行if 起始状态改变相等，然后判断取反
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`
        //点击的是价格
      } else {
        newOrder = `${flag}:${'desc'}`
      }
      //将新的值赋值给order 然后返回给服务器筛选排序
      //如果用户在此点击价格 就会在执行if判断；此时originFlag已经被赋值 初始值变为了2 所以相等
      //就会取反 在此发送请求筛选排序
      this.searchParams.order = newOrder
      this.getSearchDate();
    },
    /*
    * 当前页数的回调
    * */
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getSearchDate()
    }
  },
  computed: {
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    ...mapGetters([
      'goodsList',
    ]),
    ...mapState({
      total: state => state.searchList.total
    })
  },
  /*
  * 在组件挂载之前执行，把参数整理返回给后台
  * */
  beforeMount() {
    //在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  /*组件挂载完毕之后，执行一次，仅一次，但是search界面不只是发送一次请求，*/
  mounted() {
    /*所以需要把这次请求封装为函数，需要时调用，*/
    // this.$store.dispatch('getSearch', {})
    this.getSearchDate();
  },
  watch: {
    //组件实例身上是有$route这个属性的【包含：路由信息】
    //只要路由发生变化，立即在向服务器发请求
    $route(newValue, oldValue) {
      //每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3
      //再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发起ajax请求
      this.getSearchDate();
      //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给他赋予新的数据
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
}
</script>

<style lang="less" scoped>
li {
  list-style: none;
}

.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 3px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
