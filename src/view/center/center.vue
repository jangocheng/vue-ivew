<style lang="less">
@import "./center.less";
</style>
<template>
    <div class="center">
        <div class="center-left">
            <BlogLeft :model="model" :type="'my'" :signalList="signal_list" :userInfo="user_info" :symbol="symbol" @on-change="signalID" @statu="statu"/>
        </div>
        <div class="center-right">
            <div class="header">
                <div class="title">
                    <img :src="show_signal.avatar" alt="">
                    <span>{{show_signal.login_id}}</span>
                    <a>跟随</a>
                </div>
                <ul class="list">
                    <li>
                        <p>{{show_signal.profit_rate*100+'%'}}</p>
                        <p>收益率</p>
                    </li>
                    <li>
                        <p>{{show_signal|exactFilter}}</p>
                        <p>准确率</p>
                    </li>
                    <li>
                        <p>{{show_signal.follow_number}}</p>
                        <p>跟随人数</p>
                    </li>
                    <li>
                        <p>{{show_signal.follow_profit}}</p>
                        <p>跟随获利</p>
                    </li>
                </ul>
            </div>
            <div class="content">
                <div class="trade-ability">
                    <div class="title">
                        <h4>交易能力</h4>
                        <p>
                            <a :style="signal.profit==true?signal.style:''" @click="signal.info=false,signal.num=false,signal.profit=true,XData=xAxisData">总收益/净值</a>
                            <a :style="signal.num==true?signal.style:''" @click="signal.info=false,signal.num=true,signal.profit=false,dataF=bar.data_f,dataB=bar.data_b,win=pie.win,loss=pie.loss,XData=xAxisData">手数/笔数</a>
                            <a :style="signal.info==true?signal.style:''" @click="signal.info=true,signal.num=false,signal.profit=false,dataF=line.data_f,dataB=line.data_b">交易概览</a>
                        </p>
                    </div>
                    <ul class="list" v-if="signal.info">
                        <h4>
                            <span>浮动盈亏：</span>
                            <span>{{(show_signal.equity-show_signal.balance)|currencys}}</span>
                        </h4>
                        <li>
                            <p>
                                <span>账号余额</span>
                                <span>{{show_signal.balance}}</span>
                            </p>
                            <p>
                                <span>账户净值</span>
                                <span>{{show_signal.equity}}</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span>盈利交易</span>
                                <span>{{show_signal.win_num}}次</span>
                            </p>
                            <p>
                                <span>亏损交易</span>
                                <span>{{show_signal.loss_num}}次</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span>成功做多交易</span>
                                <span>{{show_signal.buy_num}}次</span>
                            </p>
                            <p>
                                <span>成功做空交易</span>
                                <span>{{show_signal.sell_num}}次</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span>平均盈利</span>
                                <span>{{show_signal.win_profit}}</span>
                            </p>
                            <p>
                                <span>平均亏损</span>
                                <span>{{show_signal.loss_profit}}</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span>最大盈利点数</span>
                                <span>{{show_signal.best_ticket_profit}}点</span>
                            </p>
                            <p>
                                <span>最大亏损点数</span>
                                <span>{{show_signal.loss_ticket_profit}}点</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span>平均盈利点数</span>
                                <span>{{show_signal.win_num_point}}点</span>
                            </p>
                            <p>
                                <span>平均亏损点数</span>
                                <span>{{show_signal.loss_num_point}}点</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span>总体盈亏点数</span>
                                <span>点</span>
                            </p>
                            <p>
                                <span>持仓时间</span>
                                <span>
                                    <b></b>{{show_signal.position_total_time|timeStamp}}</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span>总交易量</span>
                                <span>{{show_signal.trade_total_volume}}</span>
                            </p>
                            <p>
                                <span>数据统计时间</span>
                                <span>{{show_signal.data_update_time|formatDate}}</span>
                            </p>
                        </li>
                    </ul>
                    <div style="width:100%;overflow:hidden" v-if="signal.num">
                        <Bar style="width:70%;float:left" :dataF="bar.data_f" :dataB="bar.data_b" :xAxisData="xAxisData"/>
                        <Pie style="width:30%;float:left" :win="pie.win" :loss="pie.loss" />
                    </div>
                    <div style="width:100%;overflow:hidden;" v-if="signal.profit">
                        <LineChart style="width:100%;float:left" :dataF="line.data_f" :dataB="line.data_b" :xAxisData="xAxisData"/>
                    </div>
                </div>
                <div class="list-info">
                    <div class="title">
                        <em>上一次更新时间：2018/02/06 12:12</em>
                        <h4>
                            <span>订单信息</span>
                            <i></i>
                            <span>正在跟随</span>
                        </h4>
                        <p>
                            <a>正在跟随</a>
                            <a>历史跟随</a>
                        </p>
                    </div>
                    <Table :columns="columns" :data="data" size="large" />
                    <div class="pagenation">
                        <Page :total="total" @on-change="pagechange"></Page>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BlogLeft from "../../components/blogLeft";
import Bar from "../../components/chart/bar";
import Pie from "../../components/chart/pie";
import LineChart from "../../components/chart/linechart";
import { timeStamp, formatDate, currencys } from "../../js/filter.js";
export default {
  components: {
    BlogLeft,
    Bar,
    Pie,
    LineChart
  },
  filters: {
    exactFilter(value) {
      if (value.win_num + value.loss_num == 0) {
        return 0;
      } else {
        return (
          (value.win_num / (value.win_num + value.loss_num) * 100).toFixed(2) +
          "%"
        );
      }
    },
    timeStamp(value) {
      return timeStamp(value);
    },
    formatDate(value) {
      return formatDate(value);
    },
    currencys(value) {
      return currencys(value);
    }
  },
  data() {
    return {
      model: {
        info: true,
        sina: true,
        firm: true,
        virtual: true,
        symbol: true,
        basicInfo: true,
        explain: true
      },
      signal: {
        info: true,
        num: false,
        profit: false,
        style: {
          borderRadius: "14px",
          color: "#ffffff",
          padding: "0 10px",
          background: "linear-gradient(90deg, #4fbefe 0%, #0263ff 100%)"
        }
      },
      total: 0,
      current: 1,
      columns: [
        {
          title: "信号源",
          key: "single_loginid",
          sortable: true,
          align: "center",
          width: 140
        },
        {
          title: "跟随策略",
          key: "direct",
          sortable: true,
          align: "center",
          render: (h, params) => {
            if (params.row.direct == 0) {
              return "正向跟随";
            } else if (params.row.direct == 1) {
              return "反向跟随";
            }
          }
        },
        {
          title: "跟随类型",
          key: "follow_type",
          sortable: true,
          align: "center",
          render: (h, params) => {
            if (params.row.follow_type == 0) {
              return "固定金额" + params.row.fiexd_money;
            } else if (params.row.follow_type == 1) {
              return "百分比例" + params.row.follow_number;
            }
          }
        },
        {
          title: "止损",
          key: "sl",
          sortable: true,
          align: "center"
        },
        {
          title: "止盈",
          key: "tp",
          sortable: true,
          align: "center"
        },
        {
          title: "跟单品种",
          key: "symbol",
          align: "center"
        }
      ],
      data: [],
      //信号源信息
      user_id: "",
      documentary: "",
      show_signal: {},
      signal_list: [],
      user_info: {},
      symbol: [],
      xAxisData: [],
      line: {
        data_f: [],
        data_b: []
      },
      pie: {
        win: 0,
        loss: 0
      },
      bar: {
        data_f: [],
        data_b: []
      }
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
    },
    getSignalIndex(user_id, signal_id, type) {
      let self = this;
      self.$http
        .post(self.$api.url.getSignalIndex, {
          user_id: user_id,
          signal_id: signal_id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.documentary = res.data.data.documentary;
            self.show_signal = res.data.data.show_signal;
            self.user_info = res.data.data.user_info;
            self.symbol = res.data.data.symbol;
            if (type == "toggle") {
            } else {
              res.data.data.signal_list.map(v => {
                if (v.list) {
                  self.signal_list.push(...v.list);
                }
              });
            }
            self.getSignalDayList(self.show_signal.id);
            self.getDocumentaryList(self.show_signal.id);
          }
        })
        .catch(err => {});
    },
    getSignalDayList(id) {
      let self = this;
      self.line.data_f = [];
      self.line.data_b = [];
      self.pie.win = 0;
      self.pie.loss = 0;
      self.bar.data_f = [];
      self.bar.data_b = [];
      self.$http
        .post(self.$api.url.getSignalDayList, {
          signal_id: id
        })
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.list.map(v => {
              self.line.data_f.push(v.profit);
              self.line.data_b.push(v.equity);
              self.pie.win = self.pie.win + parseFloat(v.win_num);
              self.pie.loss = self.pie.loss + parseFloat(v.loss_num);
              self.bar.data_f.push(v.buy_num);
              self.bar.data_b.push(v.sell_num);
              self.xAxisData.push(formatDate(v.create_time));
            });
          }
        })
        .catch(err => {});
    },
    getDocumentaryList(id) {
      let self = this;
      self.$http
        .post(self.$api.url.getDocumentaryList, {
          signal_id: id,
          need_total: 1
        })
        .then(res => {
          if (res.data.code == 0) {
            self.data = res.data.data.list;
            self.total = res.data.data.total;
          }
        })
        .catch(err => {});
    },
    signalID(value) {
      this.getSignalIndex(this.user_id, value, "toggle");
    },
    statu(value) {
      this.signal.info = value;
      this.signal.num = !value;
      this.signal.profit = !value;
    }
  },
  created() {
    if (sessionStorage.getItem("access_user")) {
      this.user_id = sessionStorage.getItem("access_user");
      this.getSignalIndex(this.user_id);
    }
  }
};
</script>