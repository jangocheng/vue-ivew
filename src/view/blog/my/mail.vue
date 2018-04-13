<style lang="less" scoped>
@import "./mail.less";
</style>
<template>
    <div class="mail">
        <div class="title">
            <h2>
                <a>@我的</a>
            </h2>
        </div>
        <ul class="list">
            <li v-for="(item,index) in data" :key="index">
                <header>
                    <img :src="item.user_avatar.indexOf('http')!=-1?item.user_avatar:$api.url.baseURI+item.user_avatar" alt="">
                    <h4>{{item.user_nickname}}</h4>
                    <p>
                        <span>{{item.user_nickname}}</span>
                        <span>
                            <i></i>
                            <i>我</i>：{{item.content}}</span>
                    </p>
                </header>
                <footer>
                    <span>{{item.create_time|formatDate}}</span>
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
      data: []
    };
  },
  methods: {
    getWebMailMyList() {
      let self = this;
      self.$http
        .post(self.$api.url.getWebMailMyList, {
          need_total: 1
        })
        .then(res => {
          if (res.data.code == 0) {
            self.data = res.data.data.list;
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getWebMailMyList();
  }
};
</script>