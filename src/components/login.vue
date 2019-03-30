<template>
  <div class="login">
    <div class="box">
      <el-form label-width="80px" label-position="top">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="scss">
// @import url('../assets/sass/login.scss');
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;
  .box {
    width: 550px;
    height: 420px;
    padding: 35px;
    // 怪异盒模型
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    .my-btn {
      width: 100%;
    }
  }
}
</style>
