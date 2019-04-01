<template>
  <div class="users-container">
    <!-- 面包屑 -->
    <my-bread sec="商品管理" three="商品列表"></my-bread>
    <!--输入框 -->
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
        
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="goodsList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="email" label="商品价格（元）" width="180"></el-table-column>
      <el-table-column prop="mobile" label="商品重量"></el-table-column>
      <el-table-column prop="mobile" label="创建时间"></el-table-column>

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
      goodsList:[{},{}]
    }
  },

};
</script>

<style lang='scss'>
.users-container {
  background-color: #e9eef3;
}
</style>
