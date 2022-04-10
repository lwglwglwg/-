import axios from "axios";
import { base_url } from "@/config"; //多环境变量url
import { Loading } from "element-ui"; //loading
// import store from '@/store/index.js' //存入vuex

// 1.进度条
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

// 基础 创建axios baseURL 即超时时间
const service = axios.create({
  baseURL: base_url, //url地址
  timeout: 10000,
});
// 请求
var loading;
service.interceptors.request.use(
  //request
  (config) => {
    Nprogress.start();

    loading = Loading.service({
      //loading
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.8)",
    });
    // config.headers['Authorization'] = "Bearer" + store.state.token1//将token1存到本地 / 或vuex
    config.headers["Authorization"] = sessionStorage.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应
service.interceptors.response.use(
  (response) => {
    Nprogress.done(); //1.隐藏进度条
    loading.close(); //关闭loading
    // return response.data  对数据进一步处理
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 抛出
export default service;
