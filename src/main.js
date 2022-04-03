import Vue from "vue";
import App from "./App.vue";
//三级联动组件----全局组件
import TypeNav from "@/components/TypeNav";
Vue.component(TypeNav.name, TypeNav);
//轮播图组件----全局组件
import Carousel from "@/components/Carousel";
Vue.component(Carousel.name, Carousel);
//分页器全局组件
import Pagination from "@/components/Pagination";
Vue.component(Pagination.name, Pagination);
//Element UI
import { MessageBox } from "element-ui";
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入懒加载插件
import VueLazyload from "vue-lazyload";
import atm from '@/assets/1.gif';
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: atm
})
//引入表单验证插件
import "@/plugins/validate";


//引入路由
import router from "@/router";
Vue.config.productionTip = false;
//引入vuex
import store from "@/store";
//引入mock数据
import "@/mock/mockServe";
//引入swiper样式
import "swiper/css/swiper.css";
//统一引入
import * as API from "@/api";
new Vue({
  render: (h) => h(App),
  router,
  store,
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount("#app");
