import { reqCartList, reqDeleteCartById, reqUpdateCheckdById } from "@/api";
//购物车模块数据仓库
//准备actions对象——响应组件中用户的动作
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车商品
  async deleteCartListById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    // if (result.code == 200) {
    return "ok";
    // } else {
    //   return Promise.reject(new Error("failed"));
    // }
  },
  //修改商品勾选状态
  async updateCheckdById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckdById(skuId, isChecked);
    // if (result.code == 200) {
    return "ok";
    // } else {
    //   return Promise.reject(new Error("failed"));
    // }
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    //获取购物车全部商品
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch("deleteCartListById", item.skuId) : "";
      //将每一次返回的promise添加到数组中
      promiseAll.push(promise);
    });
    //只要promise都为成功,返回结果即为成功。如果有一个失败，即返回的为失败
    return Promise.all(promiseAll);
  },
  //修改全部商品的勾选状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckdById", {
        skuId: item.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
//准备mutations对象——修改state中的数据
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
//准备state对象——保存具体的数据
const state = {
  cartList: [],
};
//计算属性(简化仓库中的数据)
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};
//创建并暴露store
export default {
  actions,
  mutations,
  state,
  getters,
};
