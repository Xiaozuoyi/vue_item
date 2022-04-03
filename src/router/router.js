//引入路由组件
import Home from "@/pages/Home"; //首页
import Search from "@/pages/Search"; //搜索
import Login from "@/pages/Login"; //登录
import Register from "@/pages/Register"; //注册
import Detail from "@/pages/Detail"; //商品详情
import AddCartSuccess from "@/pages/AddCartSuccess"; //添加购物车
import ShopCart from "@/pages/ShopCart"; //购物车
import Trade from "@/pages/Trade"; //订单页面
import Pay from "@/pages/Pay"; //支付页面
import PaySuccess from "@/pages/PaySuccess"; //支付成功页面
import Center from "@/pages/Center"; //个人中心
//引入二级路由
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";
export default [
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
    meta: { show: true, title: "购物车" },
  },
  {
    path: "/trade",
    component: Trade,
    meta: { show: true, title: "订单页面" },
  },
  {
    path: "/pay",
    component: Pay,
    meta: { show: true, title: "支付页面" },
  },
  {
    path: "/paySuccess",
    component: PaySuccess,
    meta: { show: true, title: "支付成功" },
  },
  {
    path: "/center",
    component: Center,
    meta: { show: true, title: "个人中心" },
    //二级路由组件
    children: [
      {
        path: "/center",
        redirect: "/center/myOrder",
      },
      {
        path: "myOrder",
        component: MyOrder,
      },
      {
        path: "groupOrder",
        component: GroupOrder,
      },
    ],
  },
];
