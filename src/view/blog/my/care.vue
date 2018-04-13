<style lang="less" scoped>
@import "./care.less";
</style>
<template>
  <div class="care">
    <div class="title">
      <h2>
        <a>特别关注</a>
      </h2>
    </div>
    <ul class="list">
      <li v-for="(item,index) in data" :key="index">
        <img :src="item.avatar.indexOf('http')!=-1?item.avatar:$api.url.baseURI+item.avatar" alt="">
        <section>
          <h4>
            <a @click="$router.push({path:'/maxpro/blog/other',query:{id:item.id}})">{{item.nickname}}</a>
          </h4>
          <h5>
            <span>关注
              <i>（{{item.attention_num}}）</i>
            </span>Ta的粉丝
            <span>
              <i>（{{item.fans_num}}）</i>
            </span>
          </h5>
          <p>个人简介：{{item.signature}}</p>
          <h6>关注时间：{{item.collect_time|formatDate}}</h6>
          <Button size="large" type="primary" @click="send=true,userInfo=item">@TA</Button>
          <Button size="large" type="warning" @click="setCollectInfo(item.id)">取消关注</Button>
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
        <Button type="primary" @click="sendWebMail(userInfo.id)">发送</Button>
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
            self.content = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMyList() {
      let self = this;
      self.$http
        .post(self.$api.url.getMyList, {
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
          type: "user"
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data == 2) {
              self.$Message.success("取消关注成功！");
              self.getMyList();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getMyList();
  }
};
</script>