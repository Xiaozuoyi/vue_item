import {
  reqAddressInfo,
  reqOrderInfo,
  reqSubmitOrder,
  reqPayInfo,
} from "@/api";
//模块数据仓库
//准备actions对象——响应组件中用户的动作
const actions = {
  //获取用户信息地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit("GETUSERADDRESS", result.data);
    }
  },
  //获取商品清单
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      commit("GETORDERINFO", result.data);
    }
  },
  //提交订单
  async submitOrder({ commit }, { tradeNo, data }) {
    let result = await reqSubmitOrder(tradeNo, data);
    if (result.code == 200) {
      commit("SUBMITORDER", result.data);
      return "ok";
    } else {
      alert(result.message);
      return "error";
    }
  },
  //获取订单信息
  async OrderInformation({ commit }, orderId) {
    let result = await reqPayInfo(orderId);
    if (result.code == 200) {
      commit("ORDERINFORMATION", result.data);
    }
  },
};
//准备mutations对象——修改state中的数据
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
  SUBMITORDER(state, orderNumber) {
    state.orderNumber = orderNumber;
  },
  ORDERINFORMATION(state, orderDetails) {
    state.orderDetails = orderDetails;
  },
};
//准备state对象——保存具体的数据
const state = {
  address: [],
  orderInfo: {},
  orderNumber: "",
  orderDetails: {},
};
//计算属性(简化仓库中的数据)
const getters = {};
//创建并暴露store
export default {
  actions,
  mutations,
  state,
  getters,
};
