<style lang="less">
@import "./dynamic.less";
</style>
<template>
  <div class="dynamic">
    <div class="dynamic-header">
      <h4>
        <i></i>
        <span>上一次更新时间：2018/02/06 12:12</span>
      </h4>
    </div>
    <div class="dynamic-content">
      <div class="header">
        <div class="left">
          <a>交易动态</a>
        </div>
        <div class="right">
          <div class="screen" @click="toggleScreen">
            <i></i>
            <span>筛选</span>
          </div>
          <div class="search">
            <input type="text" name="" id="" placeholder="品种名称/代码" @focus="focus">
            <i></i>
          </div>
          <div class="model">
            <div class="left" v-if="screen_left">
              <p>
                <span>方向：</span>
                <a v-for="(item,index) in directType" :key="index" :style="directIndex==index?aActive:''" @click="directIndex=index">{{item}}</a>
              </p>
              <p>
                <span>操作：</span>
                <a v-for="(item,index) in operateType" :key="index" :style="operateIndex==index?aActive:''" @click="operateIndex=index">{{item}}</a>
              </p>
              <p>
                <span>结果：</span>
                <a v-for="(item,index) in resultType" :key="index" :style="resultIndex==index?aActive:''" @click="resultIndex=index">{{item}}</a>
              </p>
              <button>确定</button>
            </div>
            <div class="right" v-if="screen_right">
              <div class="title">
                <li v-for="(item,index) in screenTitle" :key="index" @click="toggleScreenTitle(index)">
                  <a>{{item}}</a>
                </li>
              </div>
              <div class="content">
                <transition enter-active-class="animated fadeInRight">
                  <div class="foreign" v-if="screenModel.foreign">
                    <a v-for="(item,index) in data" :key="index">美元/日元</a>
                  </div>
                </transition>
                <transition enter-active-class="animated fadeInRight">
                  <div class="metal" v-if="screenModel.metal">
                    <a v-for="(item,index) in data" :key="index">黄金</a>
                  </div>
                </transition>
                <transition enter-active-class="animated fadeInRight">
                  <div class="futures" v-if="screenModel.futures">
                    <a v-for="(item,index) in data" :key="index">RUNE</a>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <ul class="list">
          <li v-for="(item,index) in userTradeList" :key="index">
            <div class="user">
              <img :src="item.user_avatar" alt="" @click="$router.push({path:'/maxpro/signal',query:{user_id:item.signal_id}})">
              <h4>
                <p>
                  <span @click="$router.push({path:'/maxpro/signal',query:{user_id:item.signal_id}})">{{item.user_nickname}}</span>
                  <span></span>
                </p>
                <p>
                  <span></span>
                </p>
              </h4>
            </div>
            <div class="follow_type">
              <p v-if="item.single_id>0">跟随
                <span>{{item.single_nickname}}</span>
              </p>
              <p v-else>自主下单</p>
            </div>
            <div class="symbol">
              <p>
                <span>{{item.symbol}}</span>
                <span>{{symbolFilter(item.symbol)}}</span>
                <span :class="item.profit>0?'up':'down'"></span>
              </p>
              <p>
                <span>{{item.cmd|cmdFilter}}</span>
                <span>{{item.volume/100}}手</span>
                <span>{{item.open_price}}-{{item.close_price}}</span>
              </p>
            </div>
            <div class="store_type">
              <span>{{item.close_time?'平仓':'开仓'}}</span>
            </div>
            <div class="price" :style="{color:item.profit>0?'':'#fd3938'}">${{item.close_time?item.profit:0}}</div>
            <div class="time">
              <span>{{item.close_time?item.close_time:item.open_time}}</span>
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
import { cmdFilter } from "../../js/filter.js";
export default {
  filters: {
    cmdFilter(value) {
      return cmdFilter(value);
    }
  },
  data() {
    return {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      total: 0,
      page: 1,
      current: 1,
      userTradeList: [],
      symbolList: [],
      screenTitle: ["外汇", "贵金属", "期货"],
      screen_left: false,
      screen_right: false,
      screenModel: {
        foreign: true,
        metal: false,
        futures: false
      },
      directType: ["全部", "做多", "做空"],
      directIndex: -1,
      operateType: ["全部", "平仓", "建仓"],
      operateIndex: -1,
      resultType: ["全部", "盈利", "亏损"],
      resultIndex: -1,
      aActive: {
        background:
          "linear-gradient(90deg, rgb(79, 190, 254) 0%, rgb(2, 99, 255) 100%)",
        borderRadius: "4px",
        color: "#fff",
        border: "none"
      }
    };
  },
  methods: {
    focus(value) {
      this.screen_right = !this.screen_right;
    },
    pagechange(page) {
      this.getTradesUserList(page);
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
    },
    toggleScreen() {
      this.screen_left = !this.screen_left;
    },
    toggleScreenTitle(index) {
      if (index == 0) {
        this.screenModel.foreign = true;
        this.screenModel.metal = false;
        this.screenModel.futures = false;
      } else if (index == 1) {
        this.screenModel.foreign = false;
        this.screenModel.metal = true;
        this.screenModel.futures = false;
      } else if (index == 2) {
        this.screenModel.foreign = false;
        this.screenModel.metal = false;
        this.screenModel.futures = true;
      }
    },
    symbolFilter(value) {
      let name;
      this.symbolList.map(v => {
        if (v.symbol == value) {
          name = v.name;
        }
      });
      return name;
    },
    getTradesUserList(page) {
      let self = this;
      self.$http
        .post(self.$api.url.getTradesUserList, {
          need_total: 1,
          page: page
        })
        .then(res => {
          if (res.data.code == 0) {
            self.userTradeList = res.data.data.list;
            self.total = res.data.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllSymbolList() {
      let self = this;
      self.$http
        .post(self.$api.url.getAllSymbolList, {})
        .then(res => {
          if (res.data.code == 0) {
            self.symbolList = res.data.data;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getAllSymbolList();
    this.getTradesUserList();
  }
};
</script>