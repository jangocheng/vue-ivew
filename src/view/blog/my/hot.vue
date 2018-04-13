<style lang="less" scoped>
@import "./hot.less";
</style>
<template>
    <div class="hot">
        <div class="title">
             <h2>
                <a>热门微博</a>
            </h2>
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
      article: []
    };
  },
  methods: {
    getBlogList(id) {
      let self = this;
      self.total = 0;
      self.$http
        .post(self.$api.url.getBlogList, {
          user_id: id,
          need_total: 1,
          page_nums: 10,
          order_field: "praise_total"
        })
        .then(res => {
          if (res.data.code == 0) {
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
    this.getBlogList();
  }
};
</script>