import axios from 'axios'
/* import { Toast } from 'element-ui' */
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
// create an axios instance
const service = axios.create({
  baseURL: baseApi , // url = base api url + request url
 /*  withCredentials: true, */ // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})
// request拦截器 request interceptor
let loding;
service.interceptors.request.use(
  config => {
    /* loding = Toast.loading({
      duration: 10000,
      message: "加载...",
       forbidClick:true,
    }) */
    /*  token设置  */
     config.headers['Authorization']= JSON.parse(localStorage.getItem("token"))
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  res => {
   /*  loding.clear() */
    return Promise.resolve(res)
  },
  error => {
    /* Toast.clear() */
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service

/* import axios from 'axios'

// 设置axios的基地址【面试题】
// 每次diaoy个接口时都要写上完整的地址，每个接口的地址前面部分是相同的，on
// 接口地址有相同的部分，我们要把相同的部分提取出设置一下，后面调用接口就不需要写相同的部分

// axios.defaults.baseURL="相同的地址"
axios.defaults.baseURL=""

// 添加请求拦截器----（设置请求头，传递token）
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器---处理共性的错误统一做处理
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });



//   导出
export default axios; */