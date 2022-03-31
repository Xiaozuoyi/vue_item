import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
/* Home模块的数据仓库 */
//准备actions对象——响应组件中用户的动作
const actions = {
  //通过api里面的接口函数调用,向服务器发送请求,获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit("COTEGORYLIST", result.data);
    }
  },
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  async getFoolList({ commit }) {
    let result = await reqGetFloorList();
    if (result.code == 200) {
      commit("REQGETFLOORLIST", result.data);
    }
  },
};
//准备mutations对象——修改state中的数据
const mutations = {
  COTEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  REQGETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
//准备state对象——保存具体的数据
const state = {
  categoryList: [], //初始值根据接口返回值初始化
  bannerList: [], //轮播图数据
  floorList: [], //家用电器数据
};

//创建并暴露store
export default {
  actions,
  mutations,
  state,
};
