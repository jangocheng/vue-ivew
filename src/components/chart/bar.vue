<template>
  <div>
      <div id="myChart" :style="{width: '100%', height: '420px'}"></div>
  </div>
</template>
<script>
export default {
  name: "bar",
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
  watch: {
    $props(value) {
      console.log(value);
    }
  },
  mounted() {
    this.drawLine();
    this.myChart.setOption({
      xAxis: {
        data: this.$props.xAxisData
      },
      series: [
        {},
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
        color: ["#0263ff", "#4ab1ff", "#ff5672", "#ffc8a1"],
        tooltip: {
          trigger: "item"
        },
        xAxis: {
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
        legend: {
          data: ["买入", "卖出"],
          bottom: 0,
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: "#999999"
          }
        },
        series: [
          {
            type: "bar"
          },
          {
            name: "买入",
            type: "bar",
            data: [],
            barWidth: 20,
            barGap: 0,
            barCategoryGap: 0,
            itemStyle: {
              barBorderRadius: [10, 10, 0, 0]
            }
          },
          {
            name: "卖出",
            type: "bar",
            barWidth: 20,
            data: [],
            itemStyle: {
              barBorderRadius: [10, 10, 0, 0]
            }
          }
        ]
      });
    }
  }
};
</script>
