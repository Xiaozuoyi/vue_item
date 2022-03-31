import { v4 as uuidv4 } from "uuid";
export const getUUID = () => {
  //从本地存储读取uuid
  let uuid_token = localStorage.getItem("UUIDToken");
  if (!uuid_token) {
    //如果没有就生成uuid
    uuid_token = uuidv4();
    localStorage.setItem("UUIDToken", uuid_token);
  }
  //切记一定要有返回值,如没有返回值,uuid会为undefined
  return uuid_token;
};
