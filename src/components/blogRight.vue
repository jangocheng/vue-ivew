<template>
    <div class="blog-right-template">
        <div class="symbol" v-if="model.symbol">
            <div class="title">最受欢迎品种</div>
            <ul class="list">
                <li v-for="(item,index) in  symbolData" :key="index">
                    <div class="left">
                        <p>{{item.symbol}}</p>
                        <p>{{item.name}}</p>
                    </div>
                    <div class="right">
                        <!-- <p>1335.00</p> -->
                        <!-- <p>1000人关注</p> -->
                    </div>
                </li>
            </ul>
        </div>
        <div class="trade-person" v-if="model.trade_person">
            <div class="title">推荐交易员
                <i></i>
            </div>
            <ul class="list">
                <li v-for="(item,index) in signalData" :key="index">
                    <img :src="item.avatar" alt="">
                    <h4><a @click="$router.push({path:'/maxpro/signal',query:{user_id:item.user_id}})">{{item.user_nickname}}</a></h4>
                    <p>
                        <span>{{item.currency_type}}</span>
                        <span> 买 </span>
                        <span v-if="item.buy_num">{{item.buy_num}}标准手</span>
                        <span v-if="item.profit">${{item.profit}}</span>
                        <span v-else></span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="notice" v-if="model.notice">
            <div class="title">公告</div>
            <ul class="list">
                <li v-for="(item,index) in  blog" :key="index">
                    <p>{{item.introduction}}
                    </p>
                    <h6>{{item.create_time|formatDate}}</h6>
                </li>
            </ul>
        </div>
        <div class="now_sina" v-if="model.now_sina">
            <div class="title">最新微博</div>
            <ul class="list">
                <li v-for="(item,index) in blog" :key="index">
                    <div class="timeline">
                        <i></i>
                        <span>{{item.create_time|formatDate}}</span>
                    </div>
                    <section>
                        <div class="left">
                            <h4>
                                <img :src="item.avatar" alt="">{{item.nickname}}</h4>
                            <p>{{item.introduction}}
                            </p>
                        </div>
                        <img src="../images/home/one.png" alt="">
                    </section>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { formatDate } from "../js/filter.js";
export default {
  props: {
    model: {
      symbol: false,
      trade_person: false,
      notice: false,
      now_sina: false
    },
    symbolData: {
      type: Array
    },
    signalData: {
      type: Array
    },
    blog: {
      type: Array
    }
  },
  filters: {
    formatDate(value) {
      let date = formatDate(value);
      return date.split(" ")[0]
    }
  },
  data() {
    return {
      data: [1, 2, 3, 4]
    };
  }
};
</script>