import Vue from "vue";
import App from "./App.vue";

// 导入UI组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 全局注册面包屑
import myBread from "./components/myBread.vue";
Vue.component("my-bread", myBread);

// 全局样式
import "./assets/sass/base.scss";

// 路由
import router from "./router.js";

// 导入myaxios 插件
import myaxios from "./myaxios.js";
Vue.use(myaxios);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
