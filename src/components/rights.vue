<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <my-bread sec="权限管理" three="权限列表"></my-bread>
    <!-- 表格 border边框 -->
    <el-table border style="width: 100%">
      <!-- index顺序排序 -->
      <el-table-column type="index" label="#"></el-table-column>
      <!-- 普通数据使用prop绑定 -->
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column label="权限名称" width="180"></el-table-column>
      <el-table-column label="路径" width="180"></el-table-column>
      <el-table-column label="层级" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name: 'rights'
};
</script>

<style lang='scss'>
.user-container {
  background-color: #e9eef3;
}
</style>