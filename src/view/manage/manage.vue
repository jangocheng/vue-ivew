<style lang="less">
@import "./manage.less";
</style>
<template>
  <div class="manage">
    <div class="manage-header">
      <h4>
        <i></i>
        <span>上一次更新时间：2018/02/06 12:12</span>
      </h4>
    </div>
    <div class="manage-content">
      <div class="header">
        <a>在线理财</a>
      </div>
      <div class="title">
        <li v-for="(item,index) in typeTitle" :key="index" :style="typeIndex==index?typeActive:''" @click="typeIndex=index">{{item}}</li>
      </div>
      <div class="condition">
        <p>
          <span>最大收益</span>
          <a v-for="(item,index) in profitType" :key="index" :style="profitIndex==index?profitActive:''" @click="profitIndex=index">{{item}}</a>
        </p>
        <p>
          <span>最大风险</span>
          <a v-for="(item,index) in riskType" :key="index" :style="riskIndex==index?riskActive:''" @click="riskIndex=index">{{item}}</a>
        </p>
        <p>
          <span>锁定时间</span>
          <a v-for="(item,index) in timeType" :key="index" :style="timeIndex==index?timeActive:''" @click="timeIndex=index">{{item}}</a>
        </p>
        <p>
          <span>最低参与资金</span>
          <a v-for="(item,index) in capitalType" :key="index" :style="capitalIndex==index?capitalActive:''" @click="capitalIndex=index">{{item}}</a>
        </p>
        <p>
          <span>产品名称</span>
          <span>
            <input type="text" placeholder="请输入关键字">
            <i></i>
          </span>
        </p>
      </div>
      <div class="content">
        <Table  :columns="columns" :data="data" size="large"/>
         <div class="pagenation">
            <Page :total="100" @on-change="pagechange"></Page>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typeTitle: ["发布中", "已结束"],
      typeIndex: 0,
      typeActive: {
        color: "#fff",
        background: "linear-gradient(90deg, #4fbefe 0%, #0263ff 100%)"
      },
      profitType: ["全部", "<3%", "<5%", "<10%"],
      profitIndex: -1,
      profitActive: {
        background:
          "linear-gradient(90deg, rgb(79, 190, 254) 0%, rgb(2, 99, 255) 100%)",
        borderRadius: "4px",
        color: "#fff"
      },
      riskType: ["全部", "<1%", "<5%", "<10%"],
      riskIndex: -1,
      riskActive: {
        background:
          "linear-gradient(90deg, rgb(79, 190, 254) 0%, rgb(2, 99, 255) 100%)",
        borderRadius: "4px",
        color: "#fff"
      },
      timeType: [
        "全部",
        "15天内",
        "15-30天",
        "30-90天",
        "90-180天",
        "180天-1年"
      ],
      timeIndex: -1,
      timeActive: {
        background:
          "linear-gradient(90deg, rgb(79, 190, 254) 0%, rgb(2, 99, 255) 100%)",
        borderRadius: "4px",
        color: "#fff"
      },
      capitalType: [
        "全部",
        "0-5千",
        "5千-1万",
        "1万-5万",
        "5万-10万",
        "10万以上"
      ],
      capitalIndex: -1,
      capitalActive: {
        background:
          "linear-gradient(90deg, rgb(79, 190, 254) 0%, rgb(2, 99, 255) 100%)",
        borderRadius: "4px",
        color: "#fff"
      },
      total: 150,
      current: 1,
      columns: [
        {
          title: "所属平台",
          key: "platform",
          sortable: true,
          align: "center"
        },
        {
          title: "产品名称",
          key: "product",
          sortable: true,
          align: "center"
        },
        {
          title: "预计年化收益率",
          key: "year_profit",
          sortable: true,
          align: "center"
        },
        {
          title: "锁定时间",
          key: "time",
          sortable: true,
          align: "center"
        },
        {
          title: "最低参与金额",
          key: "min_money",
          sortable: true,
          align: "center"
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            return [
              h("button", {
                style: {
                  display: "inline-block",
                  width: " 88px",
                  height: "32px",
                  lineHeight: "32px",
                  color: "#333333",
                  borderRadius: "4px",
                  border: "solid 1px #d3d5d9",
                },
                domProps: {
                  innerHTML: "查看"
                }
              })
            ];
          }
        }
      ],
      data: [
        {
          platform: "1174789",
          product: "固定数量1标准手",
          year_profit: "2018-1-31 20:11:11",
          time: 21000,
          min_money: 100
        },
        {
          platform: "1174789",
          product: "固定数量1标准手",
          year_profit: "2018-1-31 20:11:11",
          time: 21000,
          min_money: 100
        },
        {
          platform: "1174789",
          product: "固定数量1标准手",
          year_profit: "2018-1-31 20:11:11",
          time: 21000,
          min_money: 100
        },
        {
          platform: "1174789",
          product: "固定数量1标准手",
          year_profit: "2018-1-31 20:11:11",
          time: 21000,
          min_money: 100
        },
        {
          platform: "1174789",
          product: "固定数量1标准手",
          year_profit: "2018-1-31 20:11:11",
          time: 21000,
          min_money: 100
        },
        {
          platform: "1174789",
          product: "固定数量1标准手",
          year_profit: "2018-1-31 20:11:11",
          time: 21000,
          min_money: 100
        },
        {
          platform: "1174789",
          product: "固定数量1标准手",
          year_profit: "2018-1-31 20:11:11",
          time: 21000,
          min_money: 100
        },
        {
          platform: "1174789",
          product: "固定数量1标准手",
          year_profit: "2018-1-31 20:11:11",
          time: 21000,
          min_money: 100
        },
        {
          platform: "1174789",
          product: "固定数量1标准手",
          year_profit: "2018-1-31 20:11:11",
          time: 21000,
          min_money: 100
        },
        {
          platform: "1174789",
          product: "固定数量1标准手",
          year_profit: "2018-1-31 20:11:11",
          time: 21000,
          min_money: 100
        }
      ]
    };
  },
  methods: {
    pagechange(currentPage) {
      console.log(currentPage);
    },
    operate(value) {
      console.log(value);
    },
    sortChange(value) {
      console.log(value);
    }
  }
};
</script>
