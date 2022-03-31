/* Search模块的数据仓库 */
import { reqGetSearchInfo } from "@/api";
//准备actions对象——响应组件中用户的动作
const actions = {
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
//准备mutations对象——修改state中的数据
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
//准备state对象——保存具体的数据
const state = {
  searchList: {},
};
//计算属性(简化仓库中的数据)
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
};
//创建并暴露store
export default {
  actions,
  mutations,
  state,
  getters,
};
