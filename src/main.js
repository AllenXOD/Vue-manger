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

// 全局注册面包屑
import myBread from "./components/myBread.vue";
Vue.component("my-bread", myBread);

// 请求拦截器 在发送请求前对请求进行处理 <钩子>
axios.interceptors.request.use(
  function(config) {
    // console.log(config);
    // 添加 token的请求头
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
    // 此方法是element-ui提供 所以必须先引入才能生效
    // response.data.meta.status === 200 || response.data.meta.status === 201 || response.data.meta.status === 204
    if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
      Vue.prototype.$message.success(response.data.meta.msg);
    } else {
      Vue.prototype.$message.warning(response.data.meta.msg);
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axios;

// 全局样式
import "./assets/sass/base.scss";

// 路由
import router from "./router.js";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");