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
      <el-aside class="my-aside" width="200px"></el-aside>
      <el-main class="my-main"></el-main>
    </el-container>
  </el-container>
</template>

<script>
// import '../assets/sass/index.scss';
export default {
  name: "index"
};
</script>

<style lang="scss">
.index-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .my-header {
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;
    img {
        height: 60px;
    }
    h2 {
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }
  .my-container {
    flex: 1;
    .my-aside {
      background-color: skyblue;
    }
    .my-main {
      background-color: #f0f;
    }
  }
}
</style>
