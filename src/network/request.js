import axios from 'axios'
import nprogress from 'nprogress'//进度条功能引入
import "nprogress/nprogress.css"//进度条的样式引入
//start  进度条开始
//done  进度条结束

/*
* //因为添加购物车携带的参数只能带 数量和价格 所以id利用请求拦截带过去
* 添加一个请求头，这个是请求头的字段不是乱写的，是和后台协商命名的
* */
import store from "@/store";

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    if (store.state.uuid_token) {
      //给请求头添加一个请求头
      config.headers.userTempId = store.state.uuid_token
    }
    //如果有token需要带给服务器
    if (store.state.token.token) {
      config.headers.token = store.state.token.token
    }
    nprogress.start();
    console.log(store);
    return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    nprogress.done()
    return res.data;
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
