<template>
  <div class="blog-comment-template">
    <ul class="comment-list">
      <li v-for="(item,index) in  data" :key="index">
        <header>
          <p>
            <img :src="item.avatar.indexOf('http')!=-1?item.avatar:$api.url.baseURI+item.avatar" alt="">
            <span>
              <i>{{item.nickname}}：</i>{{item.content}}</span>
          </p>
        </header>
        <footer>
          <div class="left">
            <span>{{item.create_time|formatDate}}</span>
          </div>
          <div class="right">
            <a @click="item.comment_statu=!item.comment_statu">回复</a>
            <span @click="setPraise(item)" :class="item.class">{{item.praise_total}}</span>
          </div>
        </footer>
        <div class="comment" v-if="item.comment_statu">
          <Input type="textarea" v-model="content" :autosize="{minRows: 4}" placeholder="回复@每日盈金"></Input>
          <footer>
            <div class="left">
              <i></i>
              <i></i>
            </div>
            <div class="right">
              <button @click="setCommentInfo(item)">评论</button>
            </div>
          </footer>
        </div>
        <div class="reply" v-if="item.list" v-for="(k,index) in  item.list" :key="index">
          <header>
            <p>
              <img :src="k.avatar.indexOf('http')!=-1?k.avatar:$api.url.baseURI+k.avatar" alt="">
              <span>
                <i>{{k.nickname}}：</i>{{k.content}}</span>
            </p>
          </header>
          <footer>
            <div class="left">
              <span>{{k.create_time|formatDate}}</span>
            </div>
          </footer>
        </div>
      </li>
    </ul>
    <div v-if="total>=8?true:false" class="more" @click="getCommentList_()">
      查看更多评论>>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../js/filter.js";
export default {
  props: {
    comment: {
      type: Array
    },
    total: {
      type: Number
    },
    id: "",
    type: ""
  },
  data() {
    return {
      data: [],
      myId: "",
      blog_id: this.$props.id,
      content: "",
      page: 1,
      page_nums: 10
    };
  },
  filters: {
    formatDate(value) {
      return formatDate(value);
    }
  },
  methods: {
    setPraise(item) {
      console.log(item);
      let self = this;
      self.$http
        .post(self.$api.url.setPraise, {
          user_id: self.myId,
          blog_id: item.blog_id,
          comment_id: item.id
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
    setCommentInfo(item) {
      let self = this;
      self.$http
        .post(self.$api.url.setCommentInfo, {
          blog_id: item.blog_id,
          user_id: self.myId,
          parent_id: item.id,
          content: self.content
        })
        .then(res => {
          if (res.data.code == 0) {
            if (this.$props.type == "comment") {
              self.getCommentList();
            }
            self.$Message.success("发表评论成功");
            item.comment_statu = false;
            self.content = "";
            self.$emit("on-change");
          }
        })
        .catch(err => {});
    },
    getCommentList_() {
      this.page++;
      this.getCommentList();
    },
    getCommentList() {
      let self = this;
      self.data = [];
      self.$http
        .post(self.$api.url.getCommentList, {
          page: self.page,
          page_nums: self.page_nums,
          blog_id: self.blog_id,
          need_total: 1
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            res.data.data.list.map(v => {
              if (v.praise_id > 0) {
                self.data.push(
                  Object.assign(
                    {
                      class: "zan_b",
                      comment_statu: false
                    },
                    v
                  )
                );
              } else {
                self.data.push(
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
  watch: {
    id(value) {
      this.blog_id = value;
      this.getCommentList();
    },
    type(value) {
      if (value == "detail") {
        this.getCommentList();
      }
    }
  },
  mounted() {
    if (this.$props.comment) {
      this.$props.comment.map(v => {
        if (v.praise_id > 0) {
          this.data.push(
            Object.assign(
              {
                class: "zan_b",
                comment_statu: false
              },
              v
            )
          );
        } else {
          this.data.push(
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
    if (sessionStorage.getItem("access_user")) {
      this.myId = sessionStorage.getItem("access_user");
    }
  }
};
</script>