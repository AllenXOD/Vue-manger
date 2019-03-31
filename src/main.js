import Vue from "vue";
import App from "./App.vue";
// 导入UI组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// axios
import axios from "axios";
// axios.defaults.baseURL
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    // console.log(config);
    // 添加token的请求头
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// 响应拦截器 同一处理对应
axios.interceptors.response.use(
  function(response) {
    Vue.prototype.$message.success(response.data.meta.msg);
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axios;

// 全局样式
import "./assets/sass/base.scss";

import router from "./router.js";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
