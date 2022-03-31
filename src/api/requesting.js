//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
//引入store
import store from "@/store/";

const requesting = axios.create({
  //配置对象
  baseURL: "/api", //基础路径,发送请求的时候,路径当中会出现api
  timeout: 5000, //设置请求超时的时间5s
});
//请求拦截器
requesting.interceptors.request.use((config) => {
  nprogress.start(); //进度条开始
  if (store.state.detail.uuid_token) {
    //请求头添加一个字段(不能瞎写需要和后端商量)
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  return config;
});
//响应拦截器
requesting.interceptors.response.use(
  (response) => {
    nprogress.done(); //进度条结束
    return response.data; //拦截处理响应结果，直接返回需要的数据
  },
  (err) => {
    alert("服务器响应数据失败");
  }
);
// 对外暴露
export default requesting;
