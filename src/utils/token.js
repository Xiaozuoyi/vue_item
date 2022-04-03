//会话存储token
export const setToken = (token) => {
  sessionStorage.setItem("Token", token);
};
//会话读取token
export const getToken = () => {
  return sessionStorage.getItem("Token");
};
//清除本地存储的token
export const removeToken = () => sessionStorage.removeItem("Token");
