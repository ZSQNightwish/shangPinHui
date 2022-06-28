<template>
  <div class="cart">
    <h2>全部商品</h2>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in mycartLists.cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list"
                   :checked="item.isChecked===1"
                   @change="updateChecked(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">

            <a class="mins" @click="handler('minus',-1,item)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt"
                   :value="item.skuNum"
                   @change="handler('change',$event.target.value*1,item)">
            <a class="plus" @click="handler('add',1,item)">+</a>

          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCARTID(item)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isALL" @change="updateAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAll">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费）:</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'mycart',
  mounted() {
    this.getMyCart();
  },
  methods: {
    //购物车的网络请求
    getMyCart() {
      this.$store.dispatch('getMyCart')
    },
    //修改产品的个数 派发action 修改服务器里的个数
    //三个参数：type 是加还是减  num 是个数，item 是点击的是哪一个商品id
    async handler(type, num, item) {
      switch (type) {
        case'add': //判断给服务器变化的量
          num = 1
          break;
        case 'minus'://判断产品大于1才可以传给服务器
          num = item.skuNum > 1 ? -1 : 0
          break;
        case 'change'://判断文本框 是否是非法数字 或 负数，都是0；原来的值就不会变
          if (isNaN(num) || num < 1) {
            num = 0
          } else {
            num = parseInt(num) - item.skuNum
          }
      }
      try {
        await this.$store.dispatch('getShopCart', {
          skuId: item.skuId,
          skuNum: num
        })
        this.getMyCart();
      } catch (error) {
      }
    },
    /*
    * 删除商品
    * */
    async deleteCARTID(item) {
      try {
        //如果成功再次发送请求
        await this.$store.dispatch('deleteCART', item.skuId)
        this.getMyCart();
      } catch (error) {
        alert('faile')
      }
    },
    /*
    * 修改产品的选中状态
    * */
    async updateChecked(item, event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('changeStatus', {
          skuId: item.skuId, isChecked
        })
        this.getMyCart();
      } catch (error) {
        alert(error.message)
      }
    },
    /*
    * 删除全部选中的商品 不需要传递参数
    * */
    async deleteAll() {
      try {
        await this.$store.dispatch('deleteAllGoods')
        this.getMyCart();
      } catch (error) {
        alert('faile')
      }
    },
    /*
    * 修改所有产品的选中状态
    * */
    async updateAll(event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        //派发actions
        await this.$store.dispatch(' updateIsAll', isChecked)
        this.getMyCart();
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(['mycartLists']),
    //产品的总价计算
    totalPrice() {
      let sum = 0;
      if (this.mycartLists.cartInfoList.length > 0) {
        this.mycartLists.cartInfoList.forEach(item => {
          sum += item.skuNum * item.skuPrice
        })
        return sum
      }
    },
    //判断复选框是否全选
    isALL() {
      return this.mycartLists.cartInfoList.every(item => item.isChecked === 1)
    }
  }
}
</script>

<style lang="less" scoped>
li {
  list-style: none;
}

.cart {
  width: 1200px;
  margin: 0 auto;

  h2 {
    margin: 9px 0;
    font-size: 16px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 36px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
