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



