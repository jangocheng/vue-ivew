<style lang="less" scoped>
@import "./article.less";
</style>
<template>
    <div class="article">
        <div class="title">
            <h2>
                <a>我的文章</a>
            </h2>
        </div>
        <BlogArticle :id="user_id"/>
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
      user_id: ""
    };
  },
  mounted() {
    if (sessionStorage.getItem("access_user")) {
      this.user_id = sessionStorage.getItem("access_user");
    }
  }
};
</script>