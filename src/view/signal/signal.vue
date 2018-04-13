<style lang="less">
@import "./signal.less";
</style>
<template>
  <div class="signal">
    <div class="signal-template">
      <div class="signal-template-left">
        <BlogLeft :model="model" :signalList="signal_list" :userInfo="user_info" :symbol="symbol" @on-change="signalID" @statu="statu"
        />
      </div>
      <div class="signal-template-right">
        <div class="header">
          <div class="title">
            <img :src="show_signal.avatar" alt="">
            <span>{{show_signal.login_id}}</span>
            <a @click="follow(show_signal.id)">跟随</a>
          </div>
          <ul class="list">
            <li>
              <p>{{show_signal.profit_rate|percent}}</p>
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
              <p>{{show_signal.follow_profit|currencys}}</p>
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
                  <span>{{show_signal.balance|currencys}}</span>
                </p>
                <p>
                  <span>账户净值</span>
                  <span>{{show_signal.equity|currencys}}</span>
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
              <Bar style="width:70%;float:left" :dataF="bar.data_f" :dataB="bar.data_b" :xAxisData="xAxisData" />
              <Pie style="width:30%;float:left" :win="pie.win" :loss="pie.loss" />
            </div>
            <div style="width:100%;overflow:hidden;" v-if="signal.profit">
              <LineChart style="width:100%;float:left" :dataF="line.data_f" :dataB="line.data_b" :xAxisData="xAxisData" />
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
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
      <div class="signal-eject" v-if="model.set">
        <div class="signal-eject-set">
          <h2>跟随设置
            <i @click="model.set=false"></i>
          </h2>
          <div class="account">
            <Select v-model="mt" style="width:200px;float:left" placeholder="请选择你的账号">
              <Option v-for="item in MTList" :value="item.id" :key="item.id">{{ item.username }}</Option>
            </Select>
            <p>跟随可能存在点差、交易品种及开/休市时间的差异 查看跟随风险提示 >></p>
          </div>
          <div class="direct">
            <li>跟随方向：</li>
            <li>
              <span>正向跟随</span>
              <Switch v-model="setInfo.direct" :true-value="0" :false-value="1"></Switch>
              <span>反向跟随</span>
            </li>
            <p>正向跟随时信号源下多单时跟随下多单，信号源下空单时跟随下空单；反向跟随即相反</p>
          </div>
          <div class="order">
            <RadioGroup v-model="setInfo.follow_type">
              <li>
                <h2>固定数量下单</h2>
                <p>
                  <Radio :label="0">
                    <Input placeholder="不小于0.01" v-model="setInfo.fiexd_money" :disabled="setInfo.follow_type!==0?true:false" style="width: 135px"></Input>
                    <span>标准手</span>
                  </Radio>
                  <p>例如：您设置固定数量0.01手，不论交易员下单多少手，您手数为0.01手。最低跟随手数为0.01手。</p>
              </li>
              <li>
                <h2>按比例下单</h2>
                <Radio :label="1">
                  <Input placeholder="不小于0.01" v-model="setInfo.follow_number" :disabled="setInfo.follow_type!==1?true:false" style="width: 135px"></Input>
                  <span>倍</span>
                </Radio>
                <p>例如：您设置为0.5倍比例跟随，交易员下单1手，您的手数为0.5手。</p>
              </li>
            </RadioGroup>
          </div>
          <button @click="setDocumentaryInfo">完成并设置风控</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import BlogLeft from "../../components/blogLeft";
import Bar from "../../components/chart/bar";
import Pie from "../../components/chart/pie";
import LineChart from "../../components/chart/linechart";
import { timeStamp, formatDate, percent, currencys } from "../../js/filter.js";
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
    percent(value) {
      return percent(value);
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
        set: false,
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
          title: "交易员",
          key: "loginid",
          sortable: true,
          align: "center",
          width: 100
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
      // 跟单信息
      MTList: [],
      mt: "",
      setInfo: {
        single_id: "",
        direct: 0,
        follow_type: 0,
        follow_number: "",
        fiexd_money: ""
      },
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
    follow(id) {
      if (!sessionStorage.getItem("access_user")) {
        this.$Message.error("请您先登录！");
      } else {
        this.model.set = true;
        this.setInfo.single_id = id;
        this.getMTList();
      }
    },
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
            self.getSignalDayList(self.show_signal.signal_id);
            self.getSingleDocumentaryList(self.show_signal.signal_id);
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
    getSingleDocumentaryList(id) {
      let self = this;
      self.$http
        .post(self.$api.url.getSingleDocumentaryList, {
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
    },
    //跟随
    setDocumentaryInfo() {
      let self = this;
      self.$http
        .post(self.$api.url.setDocumentaryInfo, {
          single_id: self.setInfo.single_id,
          signal_id: self.mt,
          direct: self.setInfo.direct,
          follow_type: self.setInfo.follow_type,
          follow_number: self.setInfo.follow_number,
          fiexd_money: self.setInfo.fiexd_money
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("跟随成功");
            self.model.set = false;
            self.setInfo.single_id = "";
            self.setInfo.follow_type = "";
            self.setInfo.follow_number = "";
            self.setInfo.fiexd_money = "";
            self.getIndex();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消跟随
    deleteDocumentaryData(id) {
      let self = this;
      self.$http
        .post(self.$api.url.deleteDocumentaryData, {
          id: id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("取消跟随成功");
            self.getIndex();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取MT列表
    getMTList() {
      let self = this;
      self.MTList = [];
      self.$http
        .post(self.$api.url.getMTList, {})
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.map(v => {
              if (v.list) {
                self.MTList.push(...v.list);
              }
            });
          }
        })
        .catch(err => {});
    }
  },
  created() {
    if (this.$route.query.user_id) {
      this.user_id = this.$route.query.user_id;
      this.getSignalIndex(this.user_id);
    }
  }
};
</script>