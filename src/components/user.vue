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
        <!-- 组件中需要使用native将其 绑定原生事件 -->
        <el-input
          @keyup.native.enter="search"
          placeholder="请输入内容"
          v-model="sendData.query"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" @click="addFormVisible = true" plain>添加用户</el-button>
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
      <el-table-column prop="mg_state" label="用户状态" width="80">
        <!-- scope只是一个名字 -->
        <template slot-scope="scope">
          <el-switch
            @change="stateChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
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
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>

    <!-- 弹框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="addRules">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="addRules" ref="editForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="editForm.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户权限 -->
    <el-dialog title="编辑用户" :visible.sync="roleFormVisible">
      <el-form ref="editForm">
        <el-form-item label="当前用户" label-width="100px">{{ editUser.username }}</el-form-item>
        <el-form-item label="请选择角色" label-width="100px">
          <el-select v-model="editUser.role_name" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRole('editForm')">确 定</el-button>
      </div>
    </el-dialog>
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
        pagesize: 5
      },
      // 用户信息数组
      userList: [],
      // 显示新增对话框
      addFormVisible: false,
      // 显示编辑对话框
      editFormVisible: false,
      // 显示编辑用户权限框
      roleFormVisible: false,
      addForm: {
        username: "root",
        password: "123456",
        email: "root@xd.cn",
        mobile: "18822255588"
      },
      editForm: {
        username: "root0",
        email: "root0@xd.cn",
        mobile: "18822255588"
      },
      // 当前编辑的用户
      editUser: {},
      roleList: [],
      // 表单验证规则
      addRules: {
        username: [
          { required: true, message: "用户名不可为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6~16", trigger: "blur" }
        ]
      }
    };
  },
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
    // 搜索用户
    async search() {
      let res = await this.$axios.get("users", {
        params: this.sendData
      });
      // console.log(res);
      this.total = res.data.data.total;
      this.userList = res.data.data.users;
    },
    // 状态改变
    stateChange(row) {
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    // 提交新增
    submitAdd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert("submit!");
          let res = await this.$axios.post("users", this.addForm);
          // console.log(res);
          if (res.data.meta.status === 201) {
            this.search();
          }
          this.addFormVisible = false;
        } else {
          this.$message.error("请输入正确的数据");
          return false;
        }
      });
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
    // 页码改变
    currentChange(current) {
      this.sendData.pagenum = current;
      this.search();
    },
    // 页容量改变
    sizeChange(size) {
      this.sendData.pagesize = size;
      this.search();
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