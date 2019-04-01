<template>
  <div class='params-container'>
    <!-- 面包屑 -->
    <my-bread sec="商品管理" three="分类参数"></my-bread>
    <!--alert -->
    <el-alert class='my-alert' title="注意:只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
    <!-- 级联选择器 -->
    <el-row class='my-row'>
      <el-col :span="24">
        <span>请选择商品分类:&nbsp;&nbsp;</span>
        <!-- 级联选择器 -->
        <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions2"></el-cascader>
      </el-col>
    </el-row>
    <!-- tab栏 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="动态参数" name="first">
        <el-button class='my-btn' type="primary" size="mini">添加动态参数</el-button>
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
        <el-button class='my-btn' type="primary" size="mini" disabled>添加静态参数</el-button>
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
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      selectedOptions2: [],
      // tabs用到的数据
      activeName: "first",
      // table的数据
      dynamicList:[{},{}],
      staticList:[{},{}],
    };
  }
};
</script>

<style lang='scss'>
.params-container{
  .my-alert{
    margin: 20px 0;
  }
  .my-row{
    margin-bottom: 20px;
  }
  .my-btn{
    margin-bottom: 20px;
  }
}
</style>
