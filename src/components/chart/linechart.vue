<template>
  <div>
      <div id="myChart" :style="{width: '100%', height: '520px'}"></div>
  </div>
</template>
<script>
export default {
  name: "line",
  props: {
    dataF: {
      type: Array
    },
    dataB: {
      type: Array
    },
    xAxisData: {
      type: Array
    }
  },
  data() {
    return {
      myChart: {}
    };
  },
  mounted() {
    this.drawLine();
    this.myChart.setOption({
      xAxis: {
        data: this.$props.xAxisData
      },
      series: [
        {
          data: this.$props.dataB
        },
        {
          data: this.$props.dataF
        }
      ]
    });
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.myChart.setOption({
        color: ["#0263ff", "#ff5672", "#ffc8a1"],
        tooltip: {
          trigger: "item"
        },
        legend: {
          data: ["净值", "总收益"],
          bottom: 0
        },
        grid: {
          top: 50,
          bottom: 50
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLine: {
            lineStyle: {
              color: "#e8e8e8"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "${value}"
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#333333"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: { lineStyle: { type: "dashed" } }
        },
        series: [
          {
            name: "净值",
            type: "line",
            data: [],
            smooth: true
          },
          {
            name: "总收益",
            type: "line",
            data: [],
            smooth: true
          }
        ]
      });
    }
  }
};
</script>
