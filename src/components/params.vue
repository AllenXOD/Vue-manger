<template>
  <div class="params-container">
    <!-- 面包屑 -->
    <my-bread sec="商品管理" three="分类参数"></my-bread>
    <!--alert -->
    <el-alert class="my-alert" title="注意:只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
    <!-- 级联选择器 -->
    <el-row class="my-row">
      <el-col :span="24">
        <span>请选择商品分类:&nbsp;&nbsp;</span>
        <!-- 级联选择器 -->
        <el-cascader :props="props" expand-trigger="hover" :options="options" v-model="selectedOptions2"></el-cascader>
      </el-col>
    </el-row>
    <!-- tab栏 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="动态参数" name="first">
        <el-button class="my-btn" type="primary" size="mini">添加动态参数</el-button>
        <!-- 表格 -->
        <el-table :data="dynamicList" style="width: 100%" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="username" label="商品参数" width="180"></el-table-column>
          <el-table-column label="操作">
            <!-- scope 是一个名字 -->
            <template slot-scope="scope">
              <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
              <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="second">
        <el-button class="my-btn" type="primary" size="mini" disabled>添加静态参数</el-button>
        <!-- 表格 -->
        <el-table :data="staticList" style="width: 100%" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="username" label="属性名称" width="180"></el-table-column>
          <el-table-column prop="username" label="属性值" width="180"></el-table-column>
          <el-table-column label="操作">
            <!-- scope 是一个名字 -->
            <template slot-scope="scope">
              <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
              <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "params",
  data() {
    return {
      options: [],
      selectedOptions2: [],
      // tabs用到的数据
      activeName: "first",
      // table的数据
      dynamicList: [{}, {}],
      staticList: [{}, {}],
      props: {
        value: 'cat_id',
        label: 'cat_name'
      }
    };
  },
  methods: {},
  async created() {
    let res = await this.$axios.get("categories", {
      params: {
        type: 3
      }
    });
    this.options = res.data.data;
  }
};
</script>

<style lang='scss'>
.params-container {
  .my-alert {
    margin: 20px 0;
  }
  .my-row {
    margin-bottom: 20px;
  }
  .my-btn {
    margin-bottom: 20px;
  }
}
</style>
