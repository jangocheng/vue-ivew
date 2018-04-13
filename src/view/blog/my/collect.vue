<style lang="less" scoped>
@import "./collect.less";
</style>
<template>
  <div class="collect">
    <div class="title">
      <h2>
        <a>我的收藏</a>
      </h2>
    </div>
    <ul class="list">
      <li v-for="(item,index) in data" :key="index">
        <img :src="item.avatar.indexOf('http')!=-1?item.avatar:$api.url.baseURI+item.avatar" alt="">
        <section>
          <h4><a @click="$router.push({path:'/maxpro/blog/other',query:{id:item.user_id}})">{{item.nickname}}</a></h4>
          <h5>
            <span>收藏
              <i>（{{item.collect_total}}）</i>
            </span>点赞
            <span>
              <i>（{{item.praise_total}}）</i>
            </span>
          </h5>
          <p>{{item.title}}</p>
          <p>{{item.introduction}}</p>
          <h6>关注时间：{{item.create_time|formatDate}}</h6>
          <Button size="large" type="primary" @click="send=true,userInfo=item">@TA</Button>
          <Button type="warning" size="large" @click="setCollectInfo(item.id)">取消收藏</Button>
        </section>
      </li>
      <li v-if="!data[data.length]">
        <h3>没有更多了</h3>
      </li>
    </ul>
    <Modal v-model="send" :mask-closable="false" title="发送信息" :styles="{width:'480px',minHeight:'250px',top:'300px',marginLeft:'-242px'}">
      <div class="send">
        <div>
          <img :src="userInfo.avatar.indexOf('http')!=-1?userInfo.avatar:$api.url.baseURI+userInfo.avatar" alt="">
          <span>{{userInfo.nickname}}</span>
        </div>
        <Input v-model="content" type="textarea" :autosize="{minRows: 4}" placeholder="请输入内容..." />
        <Button type="primary" @click="sendWebMail(userInfo.user_id)">发送</Button>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
import { formatDate } from "../../../js/filter.js";
export default {
  data() {
    return {
      data: [],
      send: false,
      content: "",
      userInfo: {
        avatar: ""
      }
    };
  },
  filters: {
    formatDate(value) {
      return formatDate(value);
    }
  },
  methods: {
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
            self.content = ""
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUserCollect() {
      let self = this;
      self.$http
        .post(self.$api.url.getUserCollect, {
          need_total: 1
        })
        .then(res => {
          if (res.data.code == 0) {
            self.data = res.data.data.list;
          }
        })
        .catch(err => {});
    },
    setCollectInfo(id) {
      let self = this;
      self.$http
        .post(self.$api.url.setCollectInfo, {
          id: id,
          type: "blog"
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data == 2) {
              self.$Message.success("取消收藏成功！");
              self.getUserCollect();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getUserCollect();
  }
};
</script>