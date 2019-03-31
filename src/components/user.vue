<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <el-breadcrumb class="my-bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="sendData.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 border边框 -->
    <el-table border :data="userList" style="width: 100%">
      <!-- index顺序排序 -->
      <el-table-column type="index" label="#"></el-table-column>
      <!-- 普通数据使用prop绑定 -->
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="role_name" label="类型" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户操作" width="80">
        <!-- scope只是一个名字 -->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <!-- 自定义列 设置template 通过slot-scope 的值获取数据 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
          <el-button type="warning" size="mini" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      total: 0,
      sendData: {
        // 搜索框输入数据
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      // 用户信息数组
      userList: []
    };
  },
  methods: {
    // 编辑编辑按钮
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    // 搜索用户
    async search() {
      let res = await this.$axios.get("users", {
        headers: {
          Authorization: window.sessionStorage.getItem("token")
        },
        params: this.sendData
      });
      // console.log(res);
      this.total = res.data.data.total;
      this.userList = res.data.data.users;
    }
  },
  created() {
    this.search();
  }
};
</script>

<style lang='scss'>
.user-container {
  background-color: #eeeeff;
  .my-bread {
    background-color: #ddddee;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
}
</style>
