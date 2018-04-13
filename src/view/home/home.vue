<style lang="less">
@import "./home.less";
</style>
<template>
  <div class="home">
    <Banner :data="bannerlist"/>
    <div class="content">
      <div class="trade-big-cafe">
        <div class="title">
          <h2>交易大咖</h2>
          <a>诊断报告</a>
        </div>
        <swiper :options="swiperOption" ref="mySwiper" class="list">
          <swiper-slide class="slide" v-for="(item,index) in topSignal" :key="index">
            <li>
              <img :src='require("../../images/home/"+(index+1)+".png")' alt="" class="sort">
              <img :src="item.user_avatar" alt="" class="user">
              <h5><a @click="$router.push({path:'/maxpro/signal',query:{user_id:item.user_id}})">{{item.user_nickname}}</a></h5>
              <button :class="item.care_class" @click="setCollectInfo(item)">{{item.care_info}}</button>
              <h4 :style="{color:item.avg_win_rate>=0?'':'#fd3938'}">{{item.avg_win_rate|currencys}}</h4>
              <h6>收益</h6>
              <div class="info">
                <p>
                  <a>{{item.follow_number}}</a>
                  <a>跟随(人)</a>
                </p>
                <p>
                  <a :style="{color:item.profit>=0?'':'#fd3938'}">{{item.profit|currencys}}</a>
                  <a>盈亏(美金)</a>
                </p>
                <p>
                  <a>{{item.profit_rate?item.profit_rate:0}}</a>
                  <a>盈亏点</a>
                </p>
              </div>
              <button class="follow" v-if="item.config_id<=0||!item.config_id" @click="follow(item)">跟随</button>
              <button class="follow nofollow" v-else @click="nofollow(item)">取消跟随</button>
            </li>
          </swiper-slide>
        </swiper>
      </div>
      <div class="trade">
        <div class="left">
          <div class="title">
            <h2>交易动态</h2>
            <a>更多</a>
          </div>
          <swiper :options="swiperOption_v" ref="mySwiper" class="list">
            <swiper-slide class="slide" v-for="(item,index) in userTradeList" :key="index">
              <li @click="$router.push({path:'/maxpro/signal',query:{user_id:item.signal_id}})">
                <div class="user">
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
                <div class="price" :style="{color:item.profit>0?'':'#fd3938'}">{{item.profit|currencys}}</div>
                <div class="time">
                  <span>{{item.close_time?item.close_time:item.open_time}}</span>
                </div>
              </li>
            </swiper-slide>
          </swiper>
        </div>
        <div class="right">
          <div class="title">
            <h2>明星交易员</h2>
            <a>更多</a>
          </div>
          <ul class="list">
            <li v-for="(item,index) in starSignal" :key="index">
              <div>
                <img :src="item.user_avatar.indexOf('http')>=0?item.user_avatar:$api.url.baseURI+item.user_avatar" alt="">
                <span  @click="$router.push({path:'/maxpro/signal',query:{user_id:item.user_id}})">{{item.user_nickname}}</span>
                <span></span>
                <span></span>
              </div>
              <div>
                <p>
                  <span>{{item.profit|currencys}}</span>
                  <span>收益</span>
                </p>
                <p>
                  <span>{{item.follow_number}}</span>
                  <span>跟随</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="article">
        <div class="left">
          <div class="title">
            <h2>精品微博</h2>
            <a>更多</a>
          </div>
          <ul class="list">
            <li v-for="(item,index) in blogList" :key="index">
              <img :src="item.image.indexOf('http')>=0?item.image:$api.url.baseURI+item.image" alt="">
              <div>
                <h2>{{item.title}}</h2>
                <p>{{item.introduction}}</p>
                <p>
                  <img :src="item.avatar.indexOf('http')>=0?item.avatar:$api.url.baseURI+item.avatar" alt="">
                  <span>{{item.nickname}}</span>
                  <span>{{item.create_time|formatDate}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="title">
            <h2>在线理财</h2>
            <a>更多</a>
          </div>
          <ul class="list">
            <li>
              <h4>保守型理财</h4>
              <div>
                <p>30
                  <span>天</span>
                </p>
                <p>
                  <span>年化
                    <i>6.8%</i>
                  </span>
                  <span>无门槛</span>
                </p>
              </div>
            </li>
            <li>
              <h4>中等风险型理财</h4>
              <div>
                <p>100
                  <span>天</span>
                </p>
                <p>
                  <span>年化
                    <i>6.8%</i>
                  </span>
                  <span>1000元</span>
                </p>
              </div>
            </li>
            <li>
              <h4>股票型理财</h4>
              <div>
                <p>10000
                  <span>元</span>
                </p>
                <p>
                  <span>年化
                    <i>10.8%</i>
                  </span>
                  <!-- <span>无门槛</span> -->
                </p>
              </div>
            </li>
            <li>
              <h4>保守型理财</h4>
              <div>
                <p>
                  <span>无门槛</span>
                </p>
                <p>
                  <span>年化
                    <i>6.8%</i>
                  </span>
                  <!-- <span>无门槛</span> -->
                </p>
              </div>
            </li>
            <li>
              <h4>基金型理财</h4>
              <div>
                <p>
                  <span>无门槛</span>
                </p>
                <p>
                  <span>年化
                    <i>6.8%</i>
                  </span>
                  <!-- <span>无门槛</span> -->
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="company">
        <h2>
          <a>合作公司</a>
          <a>公司荣誉</a>
        </h2>
        <ul class="list">
          <li v-for="(item,index) in cooperationLogoList" :key="index">
            <img :src="$api.url.baseURI + item.logo" alt="">
          </li>
        </ul>
      </div>
      <Modal v-model="email.statu" :mask-closable="false" title="设置密码" :styles="{width:'480px',height:'250px',top:'300px',marginLeft:'-242px'}">
        <p>
          <span>新密码：</span>
          <span>
            <Input type="password" v-model="email.password" placeholder="请输入邮箱登录密码" style="width: 235px"></Input>
          </span>
        </p>
        <p>
          <span>确认密码：</span>
          <span>
            <Input type="password" v-model="email.repassword" placeholder="请确认邮箱登录密码" style="width: 235px"></Input>
          </span>
        </p>
        <p>
          <span></span>
          <span>
            <Button type="primary" @click="registerEmailPWD">提交</Button>
          </span>
        </p>
        <div slot="footer">
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import Banner from "../../components/banner";
import { mapGetters } from "vuex";
export default {
  components: {
    Banner
  },
  computed: {
    ...mapGetters([
      "cooperationLogoList",
      "blogList",
      "bannerlist",
      "starSignal",
      "topSignal",
      "companyList",
      "symbolList",
      "userTradeList"
    ])
  },
  data() {
    return {
      // 邮箱
      email: {
        email: "",
        statu: false,
        password: "",
        repassword: "",
        key: ""
      },
      swiperOption: {
        notNextTick: true,
        autoplay: true,
        loop: true,
        slidesPerView: 4
      },
      swiperOption_v: {
        direction: "vertical",
        autoplay: true,
        slidesPerView: 4
      }
    };
  },
  methods: {
    follow(item) {
      if (!sessionStorage.getItem("access_user")) {
        this.$Message.error("请您先登录！");
      } else {
        this.$store.dispatch("followSet", true);
        this.$store.dispatch("getSingleId", item.id);
      }
    },
    nofollow(item) {
      this.$store.dispatch("deleteDocumentaryData", { id: item.config_id });
      this.$store.dispatch("getHomeIndex");
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
    // 邮箱登录设置密码
    registerEmailPWD() {
      console.log(this.email);
      let self = this;
      self.$http
        .post(self.$api.url.registerEmailPWD, {
          email: self.email.email,
          key: self.email.key,
          password: self.email.password,
          re_password: self.email.repassword
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("密码设置成功");
            self.email.statu = false;
            self.$route.query = {};
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 关注
    setCollectInfo(item) {
      if (!sessionStorage.getItem("access_user")) {
        this.$Message.error("请您先登录！");
      } else {
        this.$store.dispatch("setCollectInfo", { id: item.id, type: "user" });
        if (item.care_info === "取消关注") {
          item.care_info = "关注";
          item.care_class = "care";
        } else {
          item.care_info = "取消关注";
          item.care_class = "nocare";
        }
      }
    }
  },
  created() {
    this.$store.dispatch("getHomeIndex");
    this.$store.dispatch("getAllSymbolList");
    this.$store.dispatch("getTradesUserList");
    if (this.$route.query.emailStatu == "true") {
      this.email.statu = true;
    }
    if (this.$route.query) {
      this.email.email = this.$route.query.email;
      this.email.key = this.$route.query.key;
    }
  }
};
</script>
