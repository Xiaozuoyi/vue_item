const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭语法检查
  lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://39.98.123.211", // 代理目标的基础路径
        changeOrigin: true,
      },
    },
  },
});
