import{request} from "./request";
/*首页 三级联动的网络请求*/
// /api/product/getBaseCategoryList

export const categoryList=()=>{
  return request({
    url:'/api/product/getBaseCategoryList',
    methods:'get'
  })
}

