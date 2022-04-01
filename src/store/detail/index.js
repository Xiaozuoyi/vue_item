/* Search模块的数据仓库 */
import { reqProductDetails, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块(生成一个随机字符串)
import { getUUID } from "@/utils/uuid_token";
//准备actions对象——响应组件中用户的动作
const actions = {
  async getProductDetails({ commit }, skuId) {
    let result = await reqProductDetails(skuId);
    if (result.code == 200) {
      commit("GETPRODUCTDETAILS", result.data);
    }
  },
  //添加至购物车
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};
//准备mutations对象——修改state中的数据
const mutations = {
  GETPRODUCTDETAILS(state, commodityInfo) {
    state.commodityInfo = commodityInfo;
  },
};
//准备state对象——保存具体的数据
const state = {
  commodityInfo: {},
  uuid_token: getUUID(),
};
//计算属性(简化仓库中的数据)
const getters = {
  //路径导航简化的数据
  categoryView(state) {
    return state.commodityInfo.categoryView || {};
  },
  //产品信息的简化数据
  skuInfo(state) {
    return state.commodityInfo.skuInfo || {};
  },
  //售卖属性的简化数据
  spuSaleAttrList(state) {
    return state.commodityInfo.spuSaleAttrList || [];
  },
};
//创建并暴露store
export default {
  actions,
  mutations,
  state,
  getters,
};