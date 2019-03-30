<template>
  <div class="login">
    <div class="box">
      <h2>用户登录</h2>
      <!-- model 表单数据 rules 验证规则 -->
      <el-form label-width="80px" :model="loginForm" :rules="rules" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import "../assets/sass/login.scss";
export default {
  name: "login",
  data() {
    return {
      // 表单数据
      loginForm: {
        username: "",
        password: ""
      },
      // 表单验证规则
      rules: {
        //   required 是否必须填写 message 提示消息 trigger 触发方式
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 4, max: 16, message: "长度在4~16个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "长度在6~16个字符", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style lang="scss">
</style>
