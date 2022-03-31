import { reqGetCode, reqUserRegister, reqUserLogin } from "@/api";
//登录注册模块数据仓库
//准备actions对象——响应组件中用户的动作
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //用户登录
  userLogin({ commit }, data) {},
};
//准备mutations对象——修改state中的数据
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
};
//准备state对象——保存具体的数据
const state = {
  code: "",
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
