<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <my-bread sec="权限管理" three="权限列表"></my-bread>
    <!-- 表格 border边框 -->
    <el-table border style="width: 100%" :data="rightsList">
      <!-- index顺序排序 -->
      <el-table-column type="index" width="60"></el-table-column>
      <!-- 普通数据使用prop绑定 -->
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180">
        <!-- 自定义模板 -->
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-else-if="scope.row.level==='1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rights",
  data() {
    return {
      rightsList: [{}, {}]
    };
  },
  async created() {
    let res = await this.$axios.get("rights/list");
    this.rightsList = res.data.data;
  }
};
</script>

<style lang='scss'>
.user-container {
  background-color: #e9eef3;
}
</style>