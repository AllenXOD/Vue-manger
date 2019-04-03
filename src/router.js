import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import login from "./components/login.vue";
import index from "./components/index.vue";
import user from "./components/user.vue";
import roles from "./components/roles.vue";
import rights from "./components/rights.vue";
import reports from "./components/reports.vue";
import params from "./components/params.vue";
import orders from "./components/orders.vue";
import goods from "./components/goods.vue";
import categories from "./components/categories.vue";

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index
    },
    {
      path: "/",
      component: index,
      children: [
        {
          path: "",
          redirect: "users"
        },
        {
          // 用户列表
          path: "users",
          component: user
        },
        {
          // 角色列表
          path: "roles",
          component: roles
        },
        {
          // 权限列表
          path: "rights",
          component: rights
        },
        {
          // 数据报表
          path: "reports",
          component: reports
        },
        {
          // 分类参数
          path: "params",
          component: params
        },
        {
          // 订单列表
          path: "orders",
          component: orders
        },
        {
          // 商品列表
          path: "goods",
          component: goods
        },
        {
          // 商品分类
          path: "categories",
          component: categories
        }
      ]
    }
  ]
});
// 注册全局导航守卫
/* 
    to 去的路由信息
    from 来的路由信息
    next 继续向后执行 和express的中间键类似
*/
router.beforeEach((to, from, next) => {
  // console.log(to);
  if (to.path == "/login") {
    //   如果不是去登录页则判断是否有token
    next();
  } else {
    if (window.sessionStorage.getItem("token")) {
      next();
    } else {
        Vue.prototype.$message.error("请登录!");
        next("/login");
    }
  }
});

export default router;
