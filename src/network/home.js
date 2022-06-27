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
  method: 'post',
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
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
});

