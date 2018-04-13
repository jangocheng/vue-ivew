<style lang="less" scoped>
@import "./detail.less";
</style>
<template>
  <div class="detail">
    <div class="detail-left">
      <BlogLeft :model="model_L" :userInfo="user_info" />
    </div>
    <div class="detail-center">
      <div class="title">
        <h2>{{info.title}}</h2>
        <h6>发布时间：{{info.create_time|formatDate}}</h6>
      </div>
      <div class="content">
        <section>
          <p>{{info.introduction}}</p>
          <p>{{info.content}}</p>
        </section>
        <footer>
          <div class="left">
            <span></span>
            <!-- <img src="../../../images/home/one.png" alt="" v-for="(item,index) in data" :key="index"> -->
          </div>
          <div class="right">
            <span class="zan" @click="setPraise(info)"  >{{info.praise_total}}</span>
            <span class="comment" @click="comment_statu=!comment_statu,content=''">{{info.comment_total}}</span>
            <span class="share">分享</span>
          </div>
        </footer>
      </div>
      <div class="comment_" v-if="comment_statu">
        <Input type="textarea" v-model="content" :autosize="{minRows: 4}" placeholder="回复@" />
        <footer>
          <div class="left">
            <i></i>
            <i></i>
          </div>
          <div class="right">
            <Button @click="setCommentInfo(info)" type="primary">评论</Button>
          </div>
        </footer>
      </div>
      <div>
        <Comment :id="info.id" :type="type"/>
      </div>
    </div>
    <div class="detail-right">
      <BlogRight :model="model_R" :symbolData="hot_symbol" :blog="hot_blog" />
    </div>
  </div>
</template>
<script>
import BlogLeft from "../../../components/blogLeft";
import BlogRight from "../../../components/blogRight";
import Comment from "../../../components/comment";
import { formatDate } from "../../../js/filter.js";
export default {
  components: {
    BlogLeft,
    BlogRight,
    Comment
  },
  data() {
    return {
      model_L: {
        info: true,
        sina: true,
        basicInfo: true,
        share: true
      },
      model_R: {
        symbol: true,
        now_sina: true
      },
      user_info: {}, // 用户信息
      hot_symbol: [], // 热门品种
      info: {}, // 博文信息
      hot_blog: [], // 热门博客
      myId: "",
      comment_statu: false,
      type: "comment",
      // 评论列表
      page: 1,
      page_nums: 10,
      comment: {
        total: "",
        list: []
      },
      //评论内容
      content: ""
    };
  },
  filters: {
    formatDate(value) {
      return formatDate(value);
    }
  },
  methods: {
    // 获取当前博文信息
    getBlogInfo(id) {
      let self = this;
      self.$http
        .post(self.$api.url.getBlogInfo, {
          id: id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.hot_symbol = res.data.data.hot_symbol;
            self.hot_blog = res.data.data.hot_blog;
            self.info = res.data.data.info;
            self.user_info = res.data.data.user_info;
          }
        })
        .catch(err => {});
    },
    // 点赞
    setPraise(info) {
      let self = this;
      self.$http
        .post(self.$api.url.setPraise, {
          user_id: self.myId,
          blog_id: info.id
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data.data == 1) {
              item.praise_total += 1;
              item.class = "zan_b";
            } else if (res.data.data.data == 2) {
              item.praise_total -= 1;
              item.class = "zan";
            }
          }
        })
        .catch(err => {});
    },
    // 发布评论
    setCommentInfo(info) {
      let self = this;
      self.$http
        .post(self.$api.url.setCommentInfo, {
          blog_id: info.id,
          user_id: self.myId,
          content: self.content
        })
        .then(res => {
          if (res.data.code == 0) {
            self.type = "detail";
            self.$Message.success("评论成功");
            self.comment_statu = false;
            item.comment_statu = false;
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getBlogInfo(this.$route.query.id);
    }
    if (sessionStorage.getItem("access_user")) {
      this.myId = sessionStorage.getItem("access_user");
    }
  }
};
</script>