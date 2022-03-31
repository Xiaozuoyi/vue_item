//api统一管理文件
import requesting from "./requesting";
import mockRequest from "./mockAjax";

//三级联动接口(发请求)
export const reqCategoryList = () =>
  requesting.get(`/product/getBaseCategoryList`);
//首页轮播图接口
export const reqGetBannerList = () => mockRequest.get("/banner");
//家用电器轮播图接口
export const reqGetFloorList = () => mockRequest.get("/floor");
//搜索模块接口
export const reqGetSearchInfo = (params) =>
  requesting({ url: "/list", method: "post", data: params });
//获取产品详情的接口
export const reqProductDetails = (skuId) =>
  requesting({ url: `/item/${skuId}`, method: "get" });
//添加到购物车接口
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requesting({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });
//获取购物车列表数据接口
export const reqCartList = () =>
  requesting({ url: `/cart/cartList`, method: "get" });
//删除购物车产品接口
export const reqDeleteCartById = (skuId) =>
  requesting({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
//修改商品的选中状态
export const reqUpdateCheckdById = (skuId, isChecked) =>
  requesting({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });
//获取验证码
export const reqGetCode = (phone) =>
  requesting({ url: `/user/passport/sendCode/${phone}`, method: "get" });
//用户注册
export const reqUserRegister = (data) =>
  requesting({ url: `/user/passport/register`, data, method: "post" });
//用户登录
export const reqUserLogin = (data) =>
  requesting({ url: `/user/passport/login`, data, method: "post" });
//获取用户信息
export const reqUserInfo = () =>
  requesting({ url: `/user/passport/auth/getUserInfo`, method: "get" });
//退出登录
export const reqLogout = () =>
  requesting({ url: `/user/passport/logout`, method: "get" });
