<template>
  <div class="users-container">
    <!-- 面包屑 -->
    <my-bread sec="订单管理" three="订单列表"></my-bread>

    <!-- 表格 -->
    <el-table :data="orderList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格（元）" width="180"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款">
        <template slot-scope="scope">
          <el-button v-if="scope.row.order_pay===0" type="danger" size="mini" plain>未付款</el-button>
          <el-button v-else type="success" size="mini" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time | formatTime('YYYY-MM-DDTHH:mm:ss')}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template>
          <el-button
            @click="dialogFormVisible=true"
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
      :page-size="sendData.pagesize"
      :current="sendData.pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- 省市联动插件 v-distpicker -->
        <el-form-item label="省市区" :label-width="formLabelWidth">
          <!-- <el-cascader :options="options" v-model="selectedOptions"></el-cascader> -->
          <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible=false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import options from "";
import VDistpicker from "v-distpicker";
export default {
  name: "users",
  data() {
    return {
      orderList: [{}, {}],
      sendData: {
        pagesize: 10,
        pagenum: 1
      },
      total: 0,
      dialogFormVisible: false,
      selectedOptions: [],
    };
  },
  methods: {
    async getorders() {
      let res = await this.$axios.get("orders", {
        params: this.sendData
      });
      // console.log(res)
      this.orderList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    sizeChange(size) {
      this.sendData.pagesize = size;
      this.getorders();
    },
    currentChange(current) {
      this.sendData.pagenum = current;
      this.getorders();
    }
  },
  created() {
    this.getorders();
  },
  components: {
    VDistpicker
  }
};
</script>

<style lang='scss'>
.users-container {
  background-color: #e9eef3;
}
</style>
