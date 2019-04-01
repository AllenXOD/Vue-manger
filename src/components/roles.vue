<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <my-bread sec="权限管理" three="角色列表"></my-bread>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="12">
        <el-button type="default" @click="addFormVisible = true" plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 border边框 -->
    <el-table border style="width: 100%">
      <!-- index顺序排序 -->
      <el-table-column type="index" label="#"></el-table-column>
      <!-- 普通数据使用prop绑定 -->
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column label="角色名称" width="180"></el-table-column>
      <el-table-column label="角色描述" width="180"></el-table-column>
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
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="delOne(scope.row)"
            plain
          ></el-button>
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-check"
            @click="showRole(scope.row)"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
export default {
  name: 'roles',
  methods: {
    // 编辑编辑按钮
    async handleEdit(index, row) {
      // console.log(index);
      // console.log(row);
      let res = await this.$axios.get(`users/${row.id}`);
      this.editForm = res.data.data;
      if (res.data.meta.status === 200) {
        this.editFormVisible = true;
      }
    },
    // 删除用户
    delOne(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // axios
          let res = await this.$axios.delete(`users/${row.id}`);
          if (res.data.meta.status === 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 保存修改
    async submitEdit() {
      // 修改的字段可以为空 这个不用表单验证
      // 直接发请求即可
      let res = await this.$axios.put(`users/${this.editForm.id}`, {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      });
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.search();
      }
      // 关闭弹框
      this.editFormVisible = false;
    },
    // 用户权限框
    async showRole(row) {
      this.roleFormVisible = true;
      this.editUser = row;
      let res = await this.$axios.get("roles");
      this.roleList = res.data.data;
      // 获取银狐角色
    },
    async submitRole() {
      // 获取角色&用户id
      let res = await this.$axios.put(`users/${this.editUser.id}/role`, {
        rid: this.editUser.role_name
      });
      if (res.data.meta.status === 200) {
        this.roleFormVisible = false;
        this.search();
      }
    },
  },
  created() {

  }
};
</script>

<style lang='scss'>
.user-container {
  background-color: #eeeeff;
}
</style>