<template>
  <div class="users-container">
    <!-- 面包屑 -->
    <my-bread sec="数据统计" three="数据报表"></my-bread>
    <!-- echarts的容器 -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
// 导入
import echarts from "echarts";

export default {
  name: "roles",
  data() {
    return {
      // Echarts 插件默认数据格式 用来指定图表的配置项和数据
      option: {
        title: {
          text: "用户数据来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  // 在Vue创建之后
  created() {},
  // 挂载完成之后 在这里才可以访问到template中的 dom元素
  async mounted() {
    // console.log(document.querySelector("#main"))
    var myChart = echarts.init(document.getElementById("main"));

    let res = await this.$axios.get("reports/type/1");
    // 数据合并
    for (const key in res.data.data) {
      this.option[key] = res.data.data[key];
    }

    // this.option.xAxis[0].type = 'category';
    // x轴留白设置 默认为true
    this.option.xAxis[0].boundaryGap = false;

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option);
  }
};
</script>

<style lang='scss'>
.users-container {
  background-color: #e9eef3;
}
</style>
