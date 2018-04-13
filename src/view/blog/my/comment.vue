<style lang="less" scoped>
@import "./comment.less";
</style>
<template>
    <div class="comment">
        <div class="title">
            <h2>
                <a v-for="(item,index) in title" :key="index" :style="index==titleIndex?titleActive:''" @click="titleIndex=index">{{item}}</a>
            </h2>
        </div>
        <ul class="list" v-if="titleIndex==0?true:false">
            <li v-for="(item,index) in comment.user" :key="index">
                <header>
                    <img :src="item.avatar.indexOf('http')!=-1?item.avatar:$api.url.baseURI+item.avatar" alt="">
                    <h4>{{item.nickname}}</h4>
                    <p>回复<span><i>我</i>：{{item.comment_content}}</span></p>
                </header>
                <section>
                    <div class="left">
                        <img :src="userInfo.avatar.indexOf('http')!=-1?userInfo.avatar:$api.url.baseURI+userInfo.avatar" alt="">
                    </div>
                    <div class="right">
                        <p>
                            <span>{{userInfo.nickname}}</span>：{{item.title}}
                        </p>
                        <p>{{item.introduction}}</p>
                        <h6 @click="$router.push({path:'/maxpro/blog/my/detail',query:{id:item.id}})">查看详情>></h6>
                        <!-- <img src="../../../images/home/one.png" alt="">
                        <img src="../../../images/home/one.png" alt=""> -->
                    </div>
                </section>
                <footer>
                    <span>{{item.create_time|formatDate}}</span>
                    <!-- <a>删除</a> -->
                </footer>
            </li>
        </ul>
        <ul class="list" v-else>
            <li v-for="(item,index) in comment.my" :key="index">
                <header >
                    <p>回复<span><i>{{item.nickname}}</i>：{{item.comment_content}}</span></p>
                </header>
                <section>
                    <div class="left">
                        <img :src="item.avatar.indexOf('http')!=-1?item.avatar:$api.url.baseURI+item.avatar" alt="">
                    </div>
                    <div class="right">
                        <p>
                            <span>{{item.nickname}}</span>：{{item.introduction}}
                        </p>
                        <h6 @click="$router.push({path:'/maxpro/blog/other/detail',query:{id:item.id}})">查看详情>></h6>
                        <!-- <img src="../../../images/home/one.png" alt="">
                        <img src="../../../images/home/one.png" alt=""> -->
                    </div>
                </section>
                <footer>
                    <span>{{item.create_time|formatDate}}</span>
                    <a @click="deleteCommentData(item.comment_id)">删除</a>
                </footer>
            </li>
        </ul>
    </div>
</template>
<script>
import { formatDate } from "../../../js/filter.js";
export default {
  filters: {
    formatDate(value) {
      return formatDate(value);
    }
  },
  data() {
    return {
      titleIndex: 0,
      titleActive: {
        fontWeight: "bold",
        color: "#0263ff",
        borderBottom: "3px solid #0263ff"
      },
      title: ["评论我的", "我评论的"],
      userInfo: {},
      comment: {
        user: [],
        my: []
      }
    };
  },
  methods: {
    getUserComment() {
      let self = this;
      self.$http
        .post(self.$api.url.getUserComment, {
          page: self.page,
          page_nums: self.page_nums
        })
        .then(res => {
          if (res.data.code == 0) {
            self.comment.user = res.data.data.list;
          }
        })
        .catch(err => {});
    },
    getMyComment() {
      let self = this;
      self.$http
        .post(self.$api.url.getMyComment, {
          page: self.page,
          page_nums: self.page_nums
        })
        .then(res => {
          if (res.data.code == 0) {
            self.comment.my = res.data.data.list;
          }
        })
        .catch(err => {});
    },
    // 删除评论
    deleteCommentData(id) {
      let self = this;
      self.$http
        .post(self.$api.url.deleteCommentData, {
          id: id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("删除成功！");
            self.getMyComment();
          }
        })
        .catch(err => {});
    },
  },
  mounted() {
    this.getUserComment();
    this.getMyComment();
    if (sessionStorage.getItem("user_info")) {
      this.userInfo = JSON.parse(unescape(sessionStorage.getItem("user_info")));
    }
  }
};
</script>