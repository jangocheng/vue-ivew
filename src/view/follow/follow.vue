<style lang="less">
@import "./follow.less";
</style>
<template>
  <div class="follow">
    <div class="follow-header">
      <h4>
        <i></i>
        <span>上一次更新时间：2018/02/06 12:12</span>
      </h4>
    </div>
    <div class="follow-content">
      <div class="header">
        <li v-for="(item,index) in $store.state.follow.follow_level" :key="index">
          <a :style="tradeLevelIndex==index?tradeLevelActive:''" @click="tradeLevel(item.value,index)">{{item.label}}</a>
        </li>
      </div>
      <div class="content">
        <div class="content-header">
          <div class="left">
            <p>
              <a v-for="(item,index) in $store.state.follow.trade_time" :key="index" :style="tradeTimeIndex==index?tradeTimeActive:''"
                @click="tradeTimeToggle(item.value,index)">{{item.label}}</a>
            </p>
          </div>
          <div class="right">
            <Select v-model="tradeTime" style="width:200px;float:right;margin-left:20px" placeholder="交易周期">
              <Option v-for="item in follow.tradeTimeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="follow.platform" style="width:200px;float:right" placeholder="平台商">
              <Option v-for="item in follow.platformList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="content-title">
          <div class="thead">
            <a>
              <span>基本信息</span>
            </a>
            <a>
              <span>准确率</span>
            </a>
            <a v-for="(item,index) in infoTitle" :key="index">
              <span>{{item.title}}</span>
              <i v-if="item.up" :style="item.up_style" @click="infoToggle_up(item)"></i>
              <i v-if="item.down" :style="item.down_style" @click="infoToggle_down(item)"></i>
            </a>
            <a class="condition" @click="condition=true">
              <span>上榜条件</span>
            </a>
          </div>
          <div class="info" v-if="condition">
            <h4>
              <span>进入榜单的基准条件:①净值利润因子≥1.2  </span>
              <span> ②收益率＞0 </span>
              <span>③余额≥2000美金 </span>
            </h4>
            <a @click="condition=false"></a>
          </div>
        </div>
        <ul class=" content-list">
          <li v-for="(item,index) in  tradeFollowList" :key="index">
            <div class="user" @click="$router.push({path:'/maxpro/signal',query:{user_id:item.user_id}})">
              <img :src="item.user_avatar" alt="">
              <h4>
                <p>
                  <span>{{item.user_nickname}}</span>
                  <span></span>
                </p>
                <p>
                  <span></span>
                </p>
              </h4>
            </div>
            <a>{{item|exactFilter}}</a>
            <a>{{item.profit_rate}}</a>
            <a>{{item.win_num_point-item.loss_num_point}}点</a>
            <a>{{item.trade_term}}小时</a>
            <a>{{item.position_total_time/ (item.win_num + item.loss_num)|positionTimeFilter}}</a>
            <a>{{item.follow_number}}</a>
            <a>{{item.trade_total_volume}}</a>
            <a>
              <Trend :data="item.daily_summary?item.daily_summary:[]" :time="follow.tradeTime" />
            </a>
            <div class="operate">
              <button @click="followSet(item)" v-if="item.config_id<=0||!item.config_id">跟随</button>
              <button @click="followEdit(item)" class="edit" v-else>编辑跟随</button>
              <button class="care" v-if="item.collect_id<=0||!item.collect_id" @click="setCollectInfo(item)">关注</button>
              <button class="care nocare" v-else @click="setCollectInfo(item)">取消关注</button>
            </div>
          </li>
        </ul>
        <div class="pagenation">
          <Page :total="total" @on-change="pagechange"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Trend from "../../components/chart/trend";
import { timeStamp } from "../../js/filter.js";
import { mapGetters } from "vuex";
export default {
  components: {
    Trend
  },
  computed: {
    ...mapGetters(["tradeFollowList"])
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
    positionTimeFilter(value) {
      if (value) {
        return timeStamp(value);
      }
      return "";
    }
  },
  data() {
    return {
      // 交易周期
      follow: {
        tradeType: 1,
        tradeTime: 30,
        tradeTimeList: [],
        // 平台商
        platform: "",
        platformList: [],
        // 方向
        positive: true,
        reverse: false
      },
      tradeTime: "", // 交易周期
      symbolList: [],
      // 上榜条件
      condition: true,
      infoTitle: [
        {
          title: "盈利率",
          value: "profit_rate",
          up: true,
          down: true,
          up_style: "",
          down_style: ""
        },
        {
          title: "盈亏点数",
          value: "num_point",
          up: true,
          down: true,
          up_style: "",
          down_style: ""
        },
        {
          title: "交易周期",
          value: "trade_term",
          up: true,
          down: true,
          up_style: "",
          down_style: ""
        },
        {
          title: "平均持仓时间",
          value: "position_time",
          up: true,
          down: true,
          up_style: "",
          down_style: ""
        },
        {
          title: "跟随人数",
          value: "follow_signal",
          up: true,
          down: true,
          up_style: "",
          down_style: ""
        },
        {
          title: "交易笔数",
          value: "nums",
          up: true,
          down: true,
          up_style: "",
          down_style: ""
        },
        {
          title: "走势图",
          up_style: "",
          down_style: ""
        }
      ],
      // 交易等级样式
      tradeLevelActive: {
        borderBottom: " 2px solid #0263ff",
        color: "#0263ff"
      },
      tradeLevelIndex: 0,
      tradeTimeActive: {
        backgroundColor: "#0263ff",
        borderRadius: "4px",
        border: "solid 1px #0263ff",
        color: "#ffffff"
      },
      tradeTimeIndex: 0,
      infoActive_up: {
        backgroundImage:
          "url(" + require("../../images/iconfont/up_blue.png") + ")"
      },
      infoActive_down: {
        backgroundImage:
          "url(" + require("../../images/iconfont/down_blue.png") + ")"
      },
      // 表格
      total: 0
    };
  },
  methods: {
    // 交易等级
    tradeLevel(value, index) {
      this.tradeLevelIndex = index;
      this.follow.tradeType = value;
      this.$store.dispatch("getSignalAllList", {
        need_total: 1,
        near_transaction: this.follow.tradeTime, //交易周期
        signal_type: this.follow.tradeType, //信号源类型
        order_field: "", //排序类型
        order_type: "" //排序方向
      });
    },
    // 交易周期
    tradeTimeToggle(value, index) {
      this.tradeTimeIndex = index;
      this.follow.tradeTime = value;
      this.$store.dispatch("getSignalAllList", {
        need_total: 1,
        near_transaction: this.follow.tradeTime, //交易周期
        signal_type: this.follow.tradeType, //信号源类型
        order_field: "", //排序类型
        order_type: "" //排序方向
      });
    },
    pagechange: function(currentPage) {
      console.log(currentPage);
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
    },
    // 排序up
    infoToggle_up(item) {
      item.down_style = "";
      if (item.up_style) {
        item.up_style = "";
      } else {
        item.up_style = this.infoActive_up;
      }
      this.$store.dispatch("getSignalAllList", {
        need_total: 1,
        near_transaction: this.follow.tradeTime, //交易周期
        signal_type: this.follow.tradeType, //信号源类型
        order_field: item.value, //排序类型
        order_type: "asc" //排序方向
      });
    },
    // 排序down
    infoToggle_down(item) {
      item.up_style = "";
      if (item.down_style) {
        item.down_style = "";
      } else {
        item.down_style = this.infoActive_down;
      }
      this.$store.dispatch("getSignalAllList", {
        need_total: 1,
        near_transaction: this.follow.tradeTime, //交易周期
        signal_type: this.follow.tradeType, //信号源类型
        order_field: item.value, //排序类型
        order_type: "desc" //排序方向
      });
    },
    followSet(item) {
      this.$store.dispatch("followSet", true);
      this.$store.dispatch("getSingleId", item.id);
    },
    followEdit(item) {
      this.$store.dispatch("followEdit", true);
      this.$store.dispatch("getDocumentaryInfo", { id: item.config_id });
      this.$store.dispatch("getSignalSymbol", { signal_id: item.id });
    },
    // 关注
    setCollectInfo(item) {
      let self = this;
      self.$http
        .post(self.$api.url.setCollectInfo, {
          id: item.id,
          type: "user"
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data == 1) {
              self.$Message.success("关注成功！");
              item.collect_id = 10;
            } else if (res.data.data == 2) {
              self.$Message.warning("取消关注！");
              item.collect_id = 0;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$store.dispatch("getSignalAllList", {
      need_total: 1,
      near_transaction: this.follow.tradeTime, //交易周期
      signal_type: this.follow.tradeType, //信号源类型
      order_field: "", //排序类型
      order_type: "" //排序方向
    });
  }
};
</script>
