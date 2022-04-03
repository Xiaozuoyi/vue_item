//vee-validate插件:表单验证区域
import Vue from "vue";
import VeeValidate, { Field } from "vee-validate";
//中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

//表单验证规则
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    required: "这是必填字段",
    confirmed: "两次输入不一致",
  },
  attributes: {
    username: "用户名",
    password: "密码",
    phone: "手机号",
    code: "验证码",
    confirmPassword: "确认密码",
    agree: "同意协议",
  },
});

//自定义校验规则
VeeValidate.Validator.extend("agree", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});
