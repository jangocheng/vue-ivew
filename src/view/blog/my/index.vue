<style lang="less" scoped>
@import "./index.less";
</style>
<template>
    <div class="index">
        <div class="pub">
            <div class="title">
                <Input type="text" v-model="title" placeholder="请输入标题"/>
            </div>
            <Input type="textarea" v-model="introduction" :autosize="{minRows: 4}" placeholder="$品种名称$ 有什么品种资讯与大家分享？@" />
            <a @click="pub.symbol=!pub.symbol">品种</a>
            <a>表情</a>
            <a>图片</a>
            <a>用户</a>
            <a @click="$emit('sina',{edit:true})">长微博</a>
            <Button type="primary" @click="setBlogInfo">发布微博</Button>
            <Poptip v-model="pub.symbol" placement="bottom" style="position: absolute;left:50px; top: 110px;">
              <div class="poptip" slot="content">
                <a>外汇</a>
                <a>贵金属</a>
                <a>原油</a>
              </div>
            </Poptip>
        </div>
        <BlogArticle :data="article"/>
    </div>
</template>
<script>
import BlogArticle from "../../../components/blogArticle";
export default {
  components: {
    BlogArticle
  },
  data() {
    return {
      pub: {
        symbol: false,
        edit: false,
        view: false
      },
      user_id: "",
      type: "all",
      title: "",
      introduction: "",
      article:[]
    };
  },
  methods: {
    setBlogInfo() {
      let self = this;
      self.$http
        .post(self.$api.url.setBlogInfo, {
          user_id: self.user_id,
          type: 1,
          title: self.title,
          introduction: self.introduction
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("发布成功！");
          }
        })
        .catch(err => {});
    },
    getBlogList(id) {
      let self = this;
      self.total = 0;
      self.$http
        .post(self.$api.url.getBlogList, {
          user_id: id,
          need_total: 1,
          page_nums: 10
        })
        .then(res => {
          if (res.data.code == 0) {
            self.total = res.data.data.total;
            res.data.data.list.map(v => {
              if (v.praise_id > 0) {
                self.article.push(
                  Object.assign(
                    {
                      class: "zan_b",
                      comment_statu: false
                    },
                    v
                  )
                );
              } else {
                self.article.push(
                  Object.assign(
                    {
                      class: "zan",
                      comment_statu: false
                    },
                    v
                  )
                );
              }
            });
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    if (sessionStorage.getItem("access_user")) {
      this.user_id = sessionStorage.getItem("access_user");
    }
    this.getBlogList();
  }
};
</script>