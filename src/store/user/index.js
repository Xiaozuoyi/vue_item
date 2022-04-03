import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
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
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token);
      //持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //退出登录
  async userLoginout({ commit }) {
    let result = await reqLogout();
    if (result.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};
//准备mutations对象——修改state中的数据
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //清除仓库和本地数据
  CLEAR(state) {
    state.token = "";
    state.userInfo = {};
    removeToken();
  },
};
//准备state对象——保存具体的数据
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
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
