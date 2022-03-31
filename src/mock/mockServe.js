//先引入mockjs模块
import Mock from "mockjs";
//引入JSON数据文件
import banner from "./banner.json";
import floor from "./floor.json";
//mock数据:第一个参数请求地址,第二个参数请求数据
Mock.mock("/mock/banner", { code: 200, data: banner }); //首页轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor }); //家用电器轮播图数据
