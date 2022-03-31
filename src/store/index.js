import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
//对外暴露一个Store类的一个实例
export default new Vuex.Store({
  //实现Vuex仓库模块式开发式存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
  },
});
