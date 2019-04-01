<template>
  <div class="users-container">
    <!-- 面包屑 -->
    <my-bread sec="订单管理" three="订单列表"></my-bread>

    <!-- 表格 -->
    <el-table :data="orderList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="email" label="订单价格（元）" width="180"></el-table-column>
      <el-table-column prop="mobile" label="是否付款">
        <template slot-scope="scope">
            <el-button type="danger" plain >未付款</el-button>
            
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="是否发货"></el-table-column>
      <el-table-column prop="mobile" label="下单时间"></el-table-column>

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
      orderList:[{},{}]
    }
  },

};
</script>

<style lang='scss'>
.users-container {
  background-color: #e9eef3;
}
</style>
