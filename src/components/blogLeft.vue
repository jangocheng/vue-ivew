<template>
    <div class="blog-left-template">
        <div class="info" v-if="model.info">
            <img :src="userInfo.avatar.indexOf('http')>=0?userInfo.avatar:$api.url.baseURI+userInfo.avatar" alt="">
            <h4>{{userInfo.nickname}}</h4>
            <Button type="primary" v-if="userInfo.collect_id<=0||!userInfo.collect_id" @click="setCollectInfo(userInfo)">关注TA</Button>
            <Button type="warning" v-else @click="setCollectInfo(userInfo)">已关注</Button>
            <Button @click="ait">@TA</Button>
        </div>
        <div class="sina" v-if="model.sina">
            <h4 v-if="type=='my'?true:false" @click="$router.push('/maxpro/blog/my')">微博</h4>
            <h4 v-else @click="$router.push({path:'/maxpro/blog/other',query:{id:userInfo.id}})">微博</h4>
            <p>
                <a>
                    <span>{{userInfo.attention_num}}</span>
                    <span>关注</span>
                </a>
                <a>
                    <span>{{userInfo.fans_num}}</span>
                    <span>粉丝数</span>
                </a>
                <a>
                    <span>{{userInfo.blog_num}}</span>
                    <span>文章</span>
                </a>
            </p>
        </div>
        <div class="share" v-if="model.share">
            <h4>分享到</h4>
            <a>
                <span>微信</span>
            </a>
            <a>
                <span>QQ好友</span>
            </a>
            <a>
                <span>QQ空间</span>
            </a>
            <a>
                <span>微博</span>
            </a>
        </div>
        <div class="virtual" v-if="model.virtual" v-for="(item,index) in signalList" :key="index">
            <h4 @click="$emit('on-change',item.id),$emit('statu',true)">
                <i>
                    <b>#{{index+1}}</b>
                </i>
                <img :src="item.avatar" alt="">
                <span>{{item.login_id}}</span>
                <span v-if="item.signal_type==3?false:true">{{item.signal_type==3?'':'信号源'}}</span>
            </h4>
            <p>
                <a>
                    <span>{{item.profit|currencys}}</span>
                    <span>获利</span>
                </a>
                <a>
                    <span>{{item.profit_rate|percent}}</span>
                    <span>收益率</span>
                </a>
                <a>
                    <span>2小时</span>
                    <span>交易时间</span>
                </a>
            </p>
        </div>
        <div class="symbol" v-if="model.symbol">
            <h4>关注品种</h4>
            <a v-for="(item,index) in symbol" :key="index">{{item.name}}</a>
        </div>
        <div class="basicInfo" v-if="model.basicInfo">
            <h4>基本信息</h4>
            <p :style="{background:userInfo.sex==2?require('../images/iconfont/sex_w.png'):require('../images/iconfont/sex_m.png')}">
                <span>{{userInfo.sex|sexFilter}}</span>
            </p>
            <p>
                <span>{{userInfo.province}} {{userInfo.city}}</span>
            </p>
            <p>
                <span>{{userInfo.signature?userInfo.signature:'这个人很懒，什么也没有留下'}}</span>
            </p>
            <p>
                <span>生日：{{userInfo.birthday}}</span>
            </p>
        </div>
        <div class="explain" v-if="model.explain">
            <h4>重要免责声明</h4>
            <p>期货保证金交易(含外汇交易、差价合约 等)存在较高风险，并不适合所有投资者。 本网站公布的所有交易数据，都是从不同 经纪商处直接读取的原始交易记录，仅供 参考，并不构成任何投资的建议或意见。 过往的交易记录并不能预示其未来的表
                现，没有任何陈述表明任何通过本网站进 行跟随交易的真实交易账户将会或可能会 获得与本网站所展示的交易账户相似的盈 利或亏损，本公司或其股东、雇员概不对 任何因基于本公司网站所载的内容而采取 任何行动的投资者承担任何法律责任。
            </p>
        </div>
        <Modal v-model="send" :mask-closable="false" title="发送信息" :styles="{width:'480px',minHeight:'250px',top:'300px',marginLeft:'-242px'}">
            <div class="send">
                <div>
                    <img :src="userInfo.avatar.indexOf('http')!=-1?userInfo.avatar:$api.url.baseURI+userInfo.avatar" alt="">
                    <span>{{userInfo.nickname}}</span>
                </div>
                <Input v-model="content" type="textarea" :autosize="{minRows: 4}" placeholder="请输入内容..." />
                <Button type="primary" @click="sendWebMail(userInfo.id)">发送</Button>
            </div>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
import { sexFilter, currencys, percent } from "../js/filter.js";
export default {
  props: {
    model: {
      info: false,
      sina: false,
      firm: false,
      virtual: false,
      symbol: false,
      basicInfo: false,
      explain: false,
      share: false
    },
    signalList: {
      type: Array
    },
    userInfo: {
      type: Object
    },
    symbol: {
      type: Array
    },
    type: {
      type: String
    }
  },
  filters: {
    sexFilter(value) {
      return sexFilter(value);
    },
    currencys(value) {
      return currencys(value);
    },
    percent(value) {
      return percent(value);
    }
  },
  data() {
    return {
      symbolData: [
        "黄金",
        "美国原油",
        "美国原油",
        "欧元/美元黄金",
        "美国原油",
        "美国原油",
        "黄金",
        "白银"
      ],
      send: false,
      content: ""
    };
  },
  methods: {
    ait() {
      if (!sessionStorage.getItem("access_user")) {
        this.$Message.error("请您先登录！");
      } else {
        this.send = true;
      }
    },
    //   发送站内信
    sendWebMail(id) {
      let self = this;
      self.$http
        .post(self.$api.url.sendWebMail, {
          type: 3,
          receive_user: id,
          content: self.content
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("发送成功！");
            self.send = false;
            self.content = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 关注收藏
    setCollectInfo(info) {
      let self = this;
      self.$http
        .post(self.$api.url.setCollectInfo, {
          id: info.id,
          type: "user"
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data == 1) {
              self.$Message.success("关注成功！");
              info.collect_id = 10;
            } else if (res.data.data == 2) {
              self.$Message.warning("取消关注！");
              info.collect_id = 0;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>