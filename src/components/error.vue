<template>
  <div class="error">
    404 not found 
    <br></br>
    ({{num}} 秒后返回登陆)
    <!-- <router-link to="/">返回主页</router-link> -->
  </div>
</template>

<script>
export default {
  name: "error",
  data() {
    return {
      num: 10
    };
  },
  created() {
    let timeId = setInterval(() => {
      this.num--;
      if (this.num <= 0) {
        clearInterval(timeId);
        this.$router.push("/login");
      }
    }, 1000);
  }
};
</script>

<style>
.error {
  font-size: 60px;
}
</style>
