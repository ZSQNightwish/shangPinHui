import axios from 'axios'
import nprogress from 'nprogress'//进度条功能引入
import "nprogress/nprogress.css"//进度条的样式引入
//start  进度条开始
//done  进度条结束

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    nprogress.start();
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
