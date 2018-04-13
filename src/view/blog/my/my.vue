<style lang="less" scoped>
@import "./my.less";
</style>
<template>
    <div class="index">
        <div class="index-template">
            <div class="index-template-left">
                <div class="info">
                    <img :src="$api.url.baseURI+userInfo.avatar" alt="">
                    <h4>{{userInfo.nickname}}</h4>
                </div>
                <div class="sina">
                    <p>
                        <a>
                            <span>{{userInfo.attention_num}}</span>
                            <span>关注</span>
                        </a>
                        <a>
                            <span>{{userInfo.fans_num}}</span>
                            <span>粉丝数</span>
                        </a>
                        <a @click="$router.push('/maxpro/blog/my/article')">
                            <span>{{userInfo.blog_num}}</span>
                            <span>文章</span>
                        </a>
                    </p>
                </div>
                <ul class="list">
                    <li @click="$router.push('/maxpro/blog/my')"><a>全部动态</a></li>
                    <li @click="$router.push('/maxpro/blog/my/hot')"><a>热门微博</a></li>
                    <li><a>交易动态</a></li>
                    <li><a>品种资讯</a></li>
                    <li @click="$router.push('/maxpro/blog/my/care')"><a>特别关注</a></li>
                    <li @click="$router.push('/maxpro/blog/my/comment')"><a>评论</a></li>
                    <li @click="$router.push('/maxpro/blog/my/mail')"><a>提到我的</a></li>
                    <li @click="$router.push('/maxpro/blog/my/praise')"><a>收到的赞</a></li>
                    <li @click="$router.push('/maxpro/blog/my/collect')"><a>我的收藏</a></li>
                </ul>
            </div>
            <div class="index-template-center">
                <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <router-view @sina="PUB" />
                </transition>
            </div>
            <div class="index-template-right">
                <BlogRight :model="model_R" :symbolData="hot_symbol" :signalData="recommend_signal" :blog="blog"/>
            </div>
        </div>
        <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
            <div class="index-eject" v-if="pub.edit">
                <div class="pub-long-sina-edit">
                    <h2>发布长微博</h2>
                    <input type="text" placeholder="请输入标题" v-model="title">
                    <input type="text" placeholder="请输入导语（必填项）" v-model="introduction">
                    <textarea placeholder="请输入内容（最少100字）文本编辑器" v-model="content"></textarea>
                    <button @click="setBlogInfo">发布</button>
                    <button @click="pub.view = true,pub.edit=false">预览</button>
                </div>
            </div>
        </transition>
        <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
            <div class="index-eject" v-if="pub.view">
                <div class="pub-long-sina-view">
                    <header>长微博预览
                        <a @click="setBlogInfo">发布</a>
                        <a @click="pub.edit = true,pub.view = false">编辑预览</a>
                    </header>
                    <section>
                        <h2>{{title}}</h2>
                        <p>{{introduction}}
                        </p>
                        <p>
                            {{content}}
                        </p>
                    </section>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import BlogRight from "../../../components/blogRight";
import BlogArticle from "../../../components/blogArticle";
export default {
  components: {
    BlogRight,
    BlogArticle
  },
  data() {
    return {
      model_R: {
        symbol: true,
        trade_person: true,
        notice: true
      },
      pub: {
        edit: false,
        view: false
      },
      user_id: "",
      userInfo: {},
      hot_symbol: [],
      recommend_signal: [],
      blog: [],
      title: "",
      introduction: "",
      content: ""
    };
  },
  methods: {
    PUB(value) {
      this.pub.edit = value.edit;
      this.pub.view = value.view;
    },
    getBlog(id) {
      let self = this;
      self.$http
        .post(self.$api.url.getBlog, {
          user_id: id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.userInfo = res.data.data.user_info;
            self.hot_symbol = res.data.data.hot_symbol;
            self.recommend_signal = res.data.data.recommend_signal;
            self.blog = res.data.data.blog;
          }
        })
        .catch(err => {});
    },
    setBlogInfo() {
      let self = this;
      self.$http
        .post(self.$api.url.setBlogInfo, {
          user_id: self.user_id,
          type: 2,
          title: self.title,
          introduction: self.introduction,
          content: self.content
        })
        .then(res => {
          if (res.data.code == 0) {
            self.pub.edit = false;
            self.pub.view = false;
            self.$Message.success("发布成功！");
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    if (sessionStorage.getItem("access_user")) {
      this.user_id = sessionStorage.getItem("access_user");
      this.getBlog(this.user_id);
    }
  }
};
</script>