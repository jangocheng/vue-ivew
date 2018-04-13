<style lang="less" scoped>
@import "./user.less";
</style>
<template>
  <div class="user">
    <div class="user-template">
      <div class="user-template-left">
        <li v-for="(item,index) in data" :key="index">
          <h2 :style="titleIndex==index?item.style:''" @click="titleIndex=index,item.show=!item.show,$router.push(item.path)">{{item.title}}</h2>
          <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
            <div v-if="item.list&&item.show">
              <a v-for="(k,index) in item.list" :key="index" :style="aIndex==k.key?aActive:''" @click="change(k),$router.push(item.path)">{{k.title}}</a>
            </div>
          </transition>
        </li>
      </div>
      <div class="user-template-right">
        <transition enter-active-class="animated fadeInRight">
          <router-view :info="info" :trade="trade" :currency="currency" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          title: "信息设置",
          list: [
            {
              title: "头像设置",
              style: {},
              key: 1,
              name: "avatar"
            },
            {
              title: "基本资料",
              style: {},
              key: 2,
              name: "basic"
            },
            {
              title: "认证信息",
              style: {},
              key: 3,
              name: "sure"
            },
            {
              title: "账号绑定",
              style: {},
              key: 4,
              name: "account"
            }
          ],
          style: {
            background:
              "url(" +
              require("../../images/info/1.png") +
              ") no-repeat 20px center",
            color: "#0263ff"
          },
          show: true,
          path: "/maxpro/user/info"
        },
        {
          title: "交易设置",
          list: [
            {
              title: "账号管理",
              style: {},
              key: 5,
              name: "manage"
            },
            {
              title: "开平仓小数位取值",
              style: {},
              key: 6,
              name: "store"
            }
          ],
          style: {
            background:
              "url(" +
              require("../../images/info/4.png") +
              ") no-repeat 20px center",
            color: "#0263ff"
          },
          show: false,
          path: "/maxpro/user/trade"
        },
        {
          title: "社区币",
          list: [
            {
              title: "账单",
              style: {},
              key: 7,
              name: "bill"
            },
            {
              title: "银行卡",
              style: {},
              key: 8,
              name: "bank"
            }
          ],
          style: {
            background:
              "url(" +
              require("../../images/info/6.png") +
              ") no-repeat 20px center",
            color: "#0263ff"
          },
          show: false,
          path: "/maxpro/user/currency"
        },
        {
          title: "修改密码",
          list: [
            {
              title: "修改密码",
              style: {},
              key: 9
            }
          ],
          style: {
            background:
              "url(" +
              require("../../images/info/8.png") +
              ") no-repeat 20px center",
            color: "#0263ff"
          },
          show: false,
          path: "/maxpro/user/pwd"
        }
      ],
      titleIndex: 0,
      aActive: {
        borderLeft: "3px solid #0263ff",
        backgroundColor: "rgba(236, 236, 236, 0.3)"
      },
      aIndex: 2,
      info: {
        basic: true,
        avatar: false,
        sure: false,
        account: false
      },
      trade: {
        manage: false,
        store: false
      },
      currency: {
        bill: false,
        bank: false
      },
      pwd: false,
      maxpro: ["a", "ba", "ac"]
    };
  },
  methods: {
    change(k) {
      this.aIndex = k.key;
      this.info.basic = false;
      this.info.avatar = false;
      this.info.sure = false;
      this.info.account = false;
      this.info[k.name] = true;
      this.trade.manage = false;
      this.trade.store = false;
      this.trade[k.name] = true;
      this.currency.bill = false;
      this.currency.bank = false;
      this.currency[k.name] = true;
      this.pwd = false;
    },
  }
};
</script>