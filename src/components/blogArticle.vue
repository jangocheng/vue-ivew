<template>
    <div class="blog-article-template">
        <ul class="list">
            <li v-for="(item,index) in  article" :key="index">
                <div class="li-header">
                    <img :src="item.avatar.indexOf('http')!=-1?item.avatar:$api.url.baseURI+item.avatar" alt="">
                    <h4 v-if="myId==item.user_id?false:true"><a @click="$router.push({path:'/maxpro/blog/other',query:{id:item.user_id}})">{{item.nickname}}</a></h4>
                    <h4 v-else><a>{{item.nickname}}</a></h4>
                    <div v-if="myId==item.user_id?false:true">
                       <Button type="primary"  v-if="item.collect_user<=0||!item.collect_user" @click="setCollectInfo(item,item.user_id,'user')">关注</Button>
                       <Button type="warning" v-else @click="setCollectInfo(item,item.user_id,'user')">已关注</Button>
                    </div>
                    <a @click="setCollectInfo(item,item.id,'blog')" v-if="item.collect_id<=0||!item.collect_id" class="nocollect">收藏</a>
                    <a class="collect" v-else @click="setCollectInfo(item,item.id,'blog')">已收藏</a>
                    <a v-if="item.top===1?true:false" class="top">置顶</a>
                </div>
                <div class="li-section">
                    <h4>{{item.title}}</h4>
                    <p>{{item.introduction}}
                    </p>
                    <p>{{item.content}}</p>
                    <button v-if="myId==item.user_id?true:false" @click="$router.push({path:'/maxpro/blog/my/detail',query:{id:item.id}})">查看详情>></button>
                    <button v-else @click="$router.push({path:'/maxpro/blog/other/detail',query:{id:item.id}})">查看详情>></button>
                </div>
                <div class="li-footer">
                    <div class="left">
                        <span>{{item.create_time|formatDate}}</span>
                    </div>
                    <div class="right">
                        <span @click="setPraise(item)" :class="item.class">{{item.praise_total}}</span>
                        <span @click="item.comment_statu=!item.comment_statu">{{item.comment_total}}</span>
                        <span @click="share_way=!share_way">分享</span>
                    </div>
                    <div class="share" v-if="share_way">
                        <a></a>
                        <a></a>
                        <a></a>
                        <a></a>
                        <a></a>
                        <a></a>
                    </div>
                </div>
                <div class="comment" v-if="item.comment_statu">
                    <Input type="textarea" v-model="content" :autosize="{minRows: 4}" placeholder="回复@" />
                    <footer>
                        <div class="left">
                            <i></i>
                            <i></i>
                        </div>
                        <div class="right">
                            <Button @click="setCommentInfo(item)" type="primary">评论</Button>
                        </div>
                    </footer>
                </div>
                <div>
                    <Comment :comment="item.comment" :total="item.comment_total" @on-change="getComment"/>
                </div>
            </li>
            <li v-if="!article[article.length]">
                <h3>没有更多了</h3>
            </li>
            <div v-if="total>=10?true:false" class="more">加载更多></div>
        </ul>
    </div>
</template>
<script>
import { formatDate } from "../js/filter.js";
import Comment from "./comment";
export default {
  props: {
    id: "",
    data: {
      type: Array
    },
 
  },
  components: {
    Comment
  },
  filters: {
    formatDate(value) {
      return formatDate(value);
    }
  },
  data() {
    return {
      total: 0,
      share_way: false,
      content: "",
      myId: "",
      user_id: "",
      page: 1,
      page_nums: 10,
      article: this.$props.data
    };
  },
  methods: {
    // 点赞
    setPraise(item) {
      let self = this;
      self.$http
        .post(self.$api.url.setPraise, {
          user_id: self.myId,
          blog_id: item.id
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
    // 评论
    setCommentInfo(item) {
      let self = this;
      self.$http
        .post(self.$api.url.setCommentInfo, {
          blog_id: item.id,
          user_id: self.myId,
          content: self.content
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("发表评论成功");
            item.comment_statu = false;
            self.getBlogList(self.id);
          }
        })
        .catch(err => {});
    },
    // 收藏
    setCollectInfo(item, id, type) {
      let self = this;
      self.$http
        .post(self.$api.url.setCollectInfo, {
          id: id,
          type: type
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data == 1) {
              if (type == "user") {
                self.$Message.success("关注成功");
                item.collect_user = 10;
              } else if (type == "blog") {
                self.$Message.success("收藏成功");
                item.collect_id = 10;
              }
            } else if (res.data.data == 2) {
              if (type == "user") {
                self.$Message.warning("取消关注");
                item.collect_user = 0;
              } else if (type == "blog") {
                self.$Message.warning("取消收藏！");
                item.collect_id = 0;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取列表
    getBlogList(id) {
      let self = this;
      self.article = [];
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
            self.total = res.data.data.total;
          }
        })
        .catch(err => {});
    },
    getComment() {
      this.getBlogList(this.user_id);
    }
  },
  watch: {
    id(value) {
      this.user_id = value;
      this.getBlogList(value);
    },
  },
  mounted() {
    if (sessionStorage.getItem("access_user")) {
      this.myId = sessionStorage.getItem("access_user");
    }
  }
};
</script>