import Vue from "vue";
import App from "./App.vue";
// 导入UI组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// axios
import axios from 'axios'
// axios.defaults.baseURL
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$axios = axios;

// 全局样式
import "./assets/sass/base.scss";

import router from "./router.js";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
