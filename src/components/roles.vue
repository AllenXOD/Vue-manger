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
    <el-table border style="width: 100%" :data="rolesList">
      <!-- index顺序排序 -->
      <el-table-column type="index" label="#"></el-table-column>
      <!-- 普通数据使用prop绑定 -->
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <!-- 自定义列 设置template 通过slot-scope 的值获取数据 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button
            type="primary"
            @click="enterEdit(scope.row)"
            size="mini"
            icon="el-icon-edit"
            plain
          ></el-button>
          <el-button
            type="danger"
            @click="delOne(scope.row)"
            size="mini"
            icon="el-icon-delete"
            plain
          ></el-button>
          <el-button
            type="warning"
            @click="showTree(scope.row)"
            size="mini"
            icon="el-icon-check"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <el-dialog title="新增角色" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="rules">
        <el-form-item label="角色名称" prop="roleName" label-width="100">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="add-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="新增角色" :visible.sync="editFormVisible">
      <el-form :model="editForm" ref="editForm" :rules="rules">
        <el-form-item label="角色名称" prop="roleName" label-width="100">
          <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100">
          <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="add-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitedit('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 树形菜单 -->
    <el-dialog title="分配角色" :visible.sync="treeVisable">
      <el-tree
        :data="rightList"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="add-footer">
        <el-button @click="treeVisable = false">取 消</el-button>
        <el-button type="primary" @click="submitTree()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    return {
      rolesList: [{}, {}],
      addFormVisible: false,
      editFormVisible: false,
      treeVisable: false,
      addForm: {
        roleName: "",
        roleDesc: ""
      },
      editForm: {
        roleName: "",
        roleDesc: "",
        id: 0
      },
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ]
      },
      defaultProps: {
        children: "children",
        label: "authName"
      },
      rightList: [],
      checkedKeys: [],
      // 当前操作tree的角色
      treeItem: {}
    };
  },
  methods: {
    async getRoles() {
      let res = await this.$axios.get("roles");
      // console.log(res);
      this.rolesList = res.data.data;
    },
    submitAdd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.post("roles", this.addForm);
          if (res.data.meta.status === 201) {
            this.getRoles();
            this.addFormVisible = false;
          }
        } else {
          this.$message.warning("请输入正确的数据");
          return false;
        }
      });
    },
    delOne(row) {
      this.$confirm("此操作将永久删除该角色，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await this.$axios.delete(`roles/${row.id}`);
        if (res.data.meta.status === 200) {
          this.getRoles();
        }
      });
    },
    async enterEdit(row) {
      let res = await this.$axios.get(`roles/${row.id}`);
      this.editForm.id = res.data.data.roleId;
      this.editForm.roleName = res.data.data.roleName;
      this.editForm.roleDesc = res.data.data.roleDesc;
      this.editFormVisible = true;
    },
    submitedit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证成功
          let res = await this.$axios.put(
            `roles/${this.editForm.id}`,
            this.editForm
          );
          // console.log(res);
          if (res.data.meta.status === 200) {
            this.getRoles();
          }

          // 关闭对话框
          this.editFormVisible = false;
        } else {
          // 失败
          this.$message.warning("请正确输入数据");
          return false;
        }
      });
    },
    async showTree(row) {
      let res = await this.$axios.get("rights/tree");
      this.rightList = res.data.data;
      let checkedKeys = [];
      // row.children.forEach(v=>{
      //   checkedKeys.push(v.id);
      //   v.children.forEach(v=>{
      //     checkedKeys.push(v.id);
      //     v.children.forEach(v=>{
      //       checkedKeys.push(v.id);
      //     })
      //   })
      // })
      // 递归实现
      function getcheckedKeys(item) {
        if (item.children) {
          item.children.forEach(v => {
            checkedKeys.push(v.id);
            getcheckedKeys(v);
          });
        }
      }
      getcheckedKeys(row);
      this.checkedKeys = checkedKeys;
      this.treeVisable = true;
      this.treeItem = row;
    },
    async submitTree() {
      // 获取id
      let rids = this.$refs.tree.getCheckedKeys().join(",");
      let res = await this.$axios.post(`roles/${this.treeItem.id}/rights`, {
        rids
      });
      if (res.data.meta.status === 200) {
        this.getRoles();
        this.treeVisable = false;
      }
      let menuRes = await this.$axios.get("menus");
      // console.log(menuRes);
      this.$store.commit("changeMenu", menuRes.data.data);
    }
  },
  created() {
    this.getRoles();
  }
};
</script>

<style lang='scss'>
.user-container {
  background-color: #eeeeff;
}
</style>