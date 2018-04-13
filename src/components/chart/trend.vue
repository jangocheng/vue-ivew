<template>
  <div>
      <div id="mChart" :style="{width: '100%', height: '120px'}"></div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    },
    time: {
      type: Number
    }
  },
  data() {
    return {
      xAxisData: [],
      myChart: {},
      dataList: []
    };
  },
  methods: {
    drawLine() {
      let colors = ["#0263ff"];
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("mChart"));
      // 绘制图表
      this.myChart.setOption({
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%",
          top: "20%"
        },
        xAxis: {
          show: false,
          type: "category",
          data: [],
          splitLine: {
            show: true
          },
          boundaryGap: false
        },
        yAxis: {
          show: false,
          type: "value"
        },
        series: [
          {
            data: [],
            type: "line",
            smooth: 0.5,
            showSymbol: false
          }
        ]
      });
    },
    get_Date(datestr) {
      var temp = datestr.split("-");
      if (temp[1] === "01") {
        temp[0] = parseInt(temp[0], 10) - 1;
        temp[1] = "12";
      } else {
        temp[1] = parseInt(temp[1], 10) - 1;
      } //new Date()的月份入参实际都是当前值-1
      var date = new Date(temp[0], temp[1], temp[2]);
      return date;
    },
    /** ***获取两个日期间的所有日期 ***默认start<end **/
    getDiffDate(start, end) {
      var startTime = this.get_Date(start);
      var endTime = this.get_Date(end);
      var dateArr = [];
      while (endTime.getTime() - startTime.getTime() > 0) {
        var year = startTime.getFullYear();
        var month =
          startTime.getMonth().toString().length === 1
            ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1)
            : startTime.getMonth() + 1;
        var day =
          startTime.getDate().toString().length === 1
            ? "0" + startTime.getDate()
            : startTime.getDate();
        dateArr.push(year + "-" + month + "-" + day);
        startTime.setDate(startTime.getDate() + 1);
      }
      this.xAxisData = dateArr;
      this.render();
    },
    get_now_last_Time() {
      //获取当前日期
      var myDate = new Date();
      var nowY = myDate.getFullYear();
      var nowM = myDate.getMonth() + 1;
      var nowD = myDate.getDate();
      var enddate =
        nowY +
        "-" +
        (nowM < 10 ? "0" + nowM : nowM) +
        "-" +
        (nowD < 10 ? "0" + nowD : nowD); //当前日期
      //   获取之前日期
      var lw = new Date(myDate - 1000 * 60 * 60 * 24 * this.$props.time); //最后一个数字30可改，30天的意思
      var lastY = lw.getFullYear();
      var lastM = lw.getMonth() + 1;
      var lastD = lw.getDate();
      var startdate =
        lastY +
        "-" +
        (lastM < 10 ? "0" + lastM : lastM) +
        "-" +
        (lastD < 10 ? "0" + lastD : lastD); //三十天之前日期
      this.getDiffDate(startdate, enddate);
    },
    // 年月日转为时间戳
    transformTime(time) {
      var date = new Date(time).getTime();
      return date;
    },
    render() {
      let arr = [];
      this.xAxisData.map(k => {
        let statu, state;
        let data = this.$props.data;
        for (let i = 0; i < data.length; i++) {
          if (
            i == 0 &&
            this.transformTime(k) < this.transformTime(data[0].day_time)
          ) {
            statu = false;
          } else if (data[i + 1]) {
            if (
              this.transformTime(k) >= this.transformTime(data[i].day_time) &&
              this.transformTime(k) < this.transformTime(data[i + 1].day_time)
            ) {
              statu = true;
              state = data[i].balance;
            }
          } else if (!data[i + 1]) {
            if (this.transformTime(k) >= this.transformTime(data[i].day_time)) {
              statu = true;
              state = data[i].balance;
            }
          }
        }
        if (statu == false) {
          arr.push("");
        } else {
          arr.push(state);
        }
      });
      this.dataList = arr;
    }
  },
  mounted() {
    this.drawLine();
    this.get_now_last_Time();
    this.myChart.setOption({
      xAxis: {
        data: this.xAxisData
      },
      series: [
        {
          data: this.dataList
        }
      ]
    });
  }
};
</script>
