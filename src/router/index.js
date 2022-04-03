//路由配置文件
import Vue from "vue";
//引入vue-router路由插件
import VueRouter from "vue-router";
import routes from "./router";
//引入store
import store from "@/store";
//使用插件
Vue.use(VueRouter);

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
let router = new VueRouter({
  //配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 };
  },
});

//设置全局路由守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  //1.有token代表登录,全部页面放行
  if (token) {
    if (to.path == "/login" || to.path == "/register") {
      next("/");
    } else {
      //已经登录了,访问的是非注册页面和登录页面
      if (name) {
        //已经登录了且拥有用户信息
        next();
      } else {
        //登录了且没有用户信息
        try {
          //在路由跳转之前获取用户信息,并放行
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //token失效(token过期),清除前后端token,并重新跳转至登录页面
          await store.dispatch("userLoginout");
          next("/login");
        }
      }
    }
  } else {
    //未登录:不能去交易相关页面、不能去支付相关页面、不能去个人中心页面
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
