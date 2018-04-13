<style lang="less" scoped>
@import "./praise.less";
</style>
<template>
  <div class="praise">
      <div class="title">
            <h2>
                <a v-for="(item,index) in title" :key="index" :style="index==titleIndex?titleActive:''" @click="titleIndex=index">{{item}}</a>
            </h2>
        </div>
        <ul class="list" v-if="titleIndex==0?true:false">
            <li v-for="(item,index) in praise.user" :key="index">
                <header>
                    <img :src="item.avatar.indexOf('http')!=-1?item.avatar:$api.url.baseURI+item.avatar" alt="">
                    <h4>{{item.nickname}}</h4>
                    <p><span>{{item.nickname}}</span><span><i :class="item.class"></i><i>我</i>：{{item.comment_content}}</span></p>
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
            <li v-for="(item,index) in praise.my" :key="index">
                <header >
                    <p><span>我</span><span><i :class="item.class"></i><i>{{item.nickname}}</i>：{{item.comment_content}}</span></p>
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
                    <a @click="setPraise(item.id,item.comment_id)">取消赞</a>
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
      title: ["点赞我的", "我点赞的"],
      praise: {
        user: [],
        my: []
      }
    };
  },
  methods: {
    getUserPraise() {
      let self = this;
      self.$http
        .post(self.$api.url.getUserPraise, {
          need_total: 1
        })
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.list.map(v => {
              self.praise.user.push(
                Object.assign(
                  {
                    class: "zan_b"
                  },
                  v
                )
              );
            });
          }
        })
        .catch(err => {});
    },
    getMyPraise() {
      let self = this;
      self.praise.my = [];
      self.$http
        .post(self.$api.url.getMyPraise, {
          need_total: 1
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.code == 0) {
              res.data.data.list.map(v => {
                self.praise.my.push(
                  Object.assign(
                    {
                      class: "zan_b"
                    },
                    v
                  )
                );
              });
            }
          }
        })
        .catch(err => {});
    },
    // 取消点赞
    setPraise(blog_id, comment_id) {
      let self = this;
      self.$http
        .post(self.$api.url.setPraise, {
          user_id: 29,
          blog_id: blog_id,
          comment_id: comment_id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("删除成功！");
            self.getMyPraise();
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getUserPraise();
    this.getMyPraise();
    if (sessionStorage.getItem("user_info")) {
      this.userInfo = JSON.parse(unescape(sessionStorage.getItem("user_info")));
    }
  }
};
</script>
