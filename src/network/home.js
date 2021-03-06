import {request} from "./request";
/*首页 三级联动的网络请求*/
// /api/product/getBaseCategoryList

//引入模拟的mock发送网络请求的文件
import {mockRequest} from './mockRequest'

export const categoryList = () => {
  return request({
    url: '/api/product/getBaseCategoryList',
    methods: 'get'
  })
}

export const bannerList = () => {
  return mockRequest({
    url: '/banner',
    methods: 'get'
  })
}

/*获取floor组件的 数据*/
export const floorList = () => {
  return mockRequest({
    url: '/floor',
    methods: 'get'
  })
}

/*
*
*
* search 搜索界面的数据
*export const reqSearchList = (data)=>request({url:"/list",method:'post',data});
*
* 这个是真实的数据，不是模拟的*/
export const searchList = (params) => request({
  url: "/api/list",
  methods: 'post',
  data: params
});

/*
*
* 商品详情的 请求
*
* */
//请求的方式  url:"/api/item/{skuid}"
export const detailsList = (skuId) => request({
  url: `/api/item/${skuId}`,
  methods: 'get'
})
/*
*
* 将产品添加到购物车中 需要携带参数，告诉服务器我选中的是哪一个商品  id
* */
export const shopCartList = (skuId, skuNum) => request({
  url: `/api/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
});
/*
*
* 购物车的数据
*
* */
export const mycartList = () => request({
  url: 'api/cart/cartList',
  methods: 'get'
})
/*
*
* 删除购物车产品数据
* */
export const deleteGoods = (skuId) => request({
  url: `/api/cart/deleteCart/${skuId}`,
  method: 'delete'
})

/*
* 修改商品的选中状态
* */
export const changeChecked = (skuId, isChecked) => request({
  url: `/api/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})
/*
*
* 获取验证码的请求
* */
export const CodeREQ = (phone) => request({
  url: `/api/user/passport/sendCode/${phone}`,
  method: 'get'
})
/*
* 用户注册 提交表单数据 服务器存储你的账号和密码
* 因为所需要携带的数据 手机号 密码 验证码等都在data里 so可以直接写data
* */
export const userREQ = (data) => request({
  url: '/api/user/passport/register',
  data,
  method: 'post'
})
/*
* 登录的接口
* */
export const loginREQ = (data) => request({
  url: '/api/user/passport/login',
  data,
  method: 'post'
})
/*
* 获取用户登录成功之后 去向服务器索取token数据，展示 带着用户的token
* */
export const GETREQ = () => request({
  url: '/api/user/passport/auth/getUserInfo',
  method: 'get'
})
/*
* 退出登陆
* */
export const logOutREQ = () => request({
  url: '/api/user/passport/logout',
  method: 'get'
})
