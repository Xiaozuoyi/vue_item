//路由配置文件
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from "@/pages/Home"; //首页
import Search from "@/pages/Search"; //搜索
import Login from "@/pages/Login"; //登录
import Register from "@/pages/Register"; //注册
import Detail from "@/pages/Detail"; //商品详情
import AddCartSuccess from "@/pages/AddCartSuccess"; //添加购物车
import ShopCart from "@/pages/ShopCart";

//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.reqlace;
//重写push reqlace
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.reqlace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//配置路由
export default new VueRouter({
  //配置路由
  routes: [
    //redirect重定向
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
      meta: { show: true, title: "首页" },
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: Search,
      meta: { show: true, title: "搜索" },
    },
    {
      path: "/login",
      component: Login,
      meta: { show: false, title: "登录" },
    },
    {
      path: "/register",
      component: Register,
      meta: { show: false, title: "注册" },
    },
    {
      path: "/detail/:commodityId",
      component: Detail,
      meta: { show: true, title: "商品详情" },
    },
    {
      path: "/addcartsuccess",
      name: "addcartsuccess",
      component: AddCartSuccess,
      meta: { show: true, title: "添加购物车" },
    },
    {
      path: "/shopcart",
      component: ShopCart,
      meta: { show: true, title: "支付页面" },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 };
  },
});
