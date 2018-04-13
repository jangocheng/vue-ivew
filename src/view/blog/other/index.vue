<style lang="less" scoped>
@import "./index.less";
</style>
<template>
  <div class="index">
    <div class="index-left">
      <BlogLeft :model="model_L" :userInfo="user_info"/>
    </div>
    <div class="index-center">
      <div class="title">
        <h2>
          <a>Ta的文章</a>
          <p>
            <span>TA的关注
              <i>（{{user_info.attention_num}}）</i>
            </span>
            <span>TA的粉丝
              <i>（{{user_info.fans_num}}）</i>
            </span>
          </p>
        </h2>
      </div>
      <BlogArticle :id="user_id"/>
    </div>
    <div class="index-right">
      <BlogRight :model="model_R" :symbolData="hot_symbol" :signalData="recommend_signal" :blog="blog"/>
    </div>
  </div>
</template>
<script>
import BlogLeft from "../../../components/blogLeft";
import BlogRight from "../../../components/blogRight";
import BlogArticle from "../../../components/blogArticle";
export default {
  components: {
    BlogLeft,
    BlogRight,
    BlogArticle
  },
  data() {
    return {
      model_L: {
        info: true,
        sina: true,
        basicInfo: true
      },
      model_R: {
        symbol: true,
        trade_person: true,
        notice: true
      },
      data1: [1, 2, 3, 4, 5],
      user_info: {},
      hot_symbol: [],
      recommend_signal: [],
      blog: [],
      user_id:""
    };
  },
  methods: {
    getBlog() {
      let self = this;
      self.$http
        .post(self.$api.url.getBlog, {
          user_id:self.user_id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.user_info = res.data.data.user_info;
            self.hot_symbol = res.data.data.hot_symbol;
            self.recommend_signal = res.data.data.recommend_signal;
            self.blog = res.data.data.blog;
          }
        })
        .catch(err => {});
    },
  },
  mounted() {
    if (this.$route.query) {
      this.user_id = this.$route.query.id
      this.getBlog();
    }
  }
};
</script>