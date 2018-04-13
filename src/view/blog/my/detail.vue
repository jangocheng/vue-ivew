<style lang="less" scoped>
@import "./detail.less";
</style>
<template>
    <div class="detail">
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
            <span class="zan">{{info.praise_total}}</span>
            <span class="comment">{{info.comment_total}}</span>
            <span class="share">分享</span>
          </div>
        </footer>
      </div>
        <Comment :total="total" :id="info.id" />
    </div>
    </div>
</template>
<script>
import Comment from "../../../components/comment";
import { formatDate } from "../../../js/filter.js";
export default {
  components: {
    Comment
  },
  data() {
    return {
      user_info: {},
      hot_symbol: [],
      info: {},
      hot_blog: [],
      total: 0,
      commentList: []
    };
  },
  filters: {
    formatDate(value) {
      return formatDate(value);
    }
  },
  methods: {
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
    }
  },
  mounted() {
    if (this.$route.query) {
      this.getBlogInfo(this.$route.query.id);
    }
  }
};
</script>