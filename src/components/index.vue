<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/logo.svg">
        </el-col>
        <el-col :span="18">
          <h2>后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <el-button @click="logout" type="success">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-container">
      <el-aside class="my-aside" width="200px">
        <!-- router 开启路由跳转 -->
        <el-menu router default-active="users" class="el-menu-vertical-demo">
          <el-submenu :index="item.id+''" v-for="(item,i) in menuList" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <!-- index 跳转的路径 -->
              <el-menu-item :index="it.path" v-for="(it,i) in item.children" :key="i">
                <i class="el-icon-menu"></i>
                {{it.authName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import "../assets/sass/index.scss";
export default {
  name: "index",
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    }
  },
  beforeCreate() {
    if (!window.sessionStorage.getItem("token")) {
      this.$message.error("请登录");
      this.$router.push("/login");
    }
  },
  async created() {
    let res = await this.$axios.get("menus");
    console.log(res);
    this.menuList = res.data.data;
  }
};
</script>

<style lang="scss">
</style>
