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
          <el-button type="success">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-container">
      <el-aside class="my-aside" width="200px">
        <!-- router 开启路由跳转 -->
        <el-menu router="true" default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <!-- index 跳转的路径 -->
              <el-menu-item index="/user">
                <i class="el-icon-menu"></i>
                用户中心
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
  name: "index"
};
</script>

<style lang="scss">
</style>
