<template>
  <!-- 面包屑 -->
  <el-breadcrumb class="my-bread" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{sec}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{three}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "myBread",
  props: ["sec", "three"]
};
</script>

<style>
.my-bread {
  background-color: #ddddee;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}
</style>
