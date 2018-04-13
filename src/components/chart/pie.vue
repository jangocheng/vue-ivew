<template>
  <div>
      <div id="mChart" :style="{width: '100%', height: '420px'}"></div>
  </div>
</template>
<script>
export default {
  name: "bar",
  props: {
    loss: {
      type: Number
    },
    win: {
      type: Number
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
      series: [
        {
          data: [
            {
              value: this.$props.loss,
              name: "亏损笔数"
            },
            {
              value: this.$props.win,
              name: "获利笔数"
            }
          ]
        }
      ]
    });
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("mChart"));
      // 绘制图表
      this.myChart.setOption({
        color: ["#0263ff", "#ff5672", "#ffc8a1"],
        tooltip: {},
        legend: {
          orient: "vertical",
          x: "left",
          data: ["亏损笔数", "获利笔数"],
          bottom: 0,
          left: 80,
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: "#999999"
          }
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      });
    }
  }
};
</script>
