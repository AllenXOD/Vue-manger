<template>
  <div class="users-container">
    <!-- 面包屑 -->
    <my-bread sec="商品管理" three="商品分类"></my-bread>
    <!--输入框 -->
    <el-row>
      <el-col :span="12">
        <el-button type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="cateList" style="width: 100%" border row-key="cat_id">
      <!-- <el-table-column  type="expand"></el-table-column> -->
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="cat_level" label="级别" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-else-if="scope.row.cat_level===1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted">无效</span>
          <span v-else>有效</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <!-- scope 是一个名字 -->
        <template slot-scope="scope">
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            plain
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 18]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="0"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return{
      cateList:[{},{}]
    }
  },
  async created() {
    let res = await this.$axios.get(`categories`,{
      params: {
        type: 3
      }
    });
    this.cateList = res.data.data;
  },
};
</script>

<style lang='scss'>
.users-container {
  background-color: #e9eef3;
}
</style>
