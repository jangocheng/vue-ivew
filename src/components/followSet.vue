<style lang="less" scoped>
@import "./folllowSet.less";
</style>
<template>
  <div class="bg">
    <div class="followSet">
      <h2>跟随设置
        <i @click="$store.dispatch('followSet',false)"></i>
      </h2>
      <div class="account">
        <Select v-model="mt" style="width:200px;float:left" placeholder="请选择你的账号">
          <Option v-for="item in MTList" :value="item.id" :key="item.id">{{ item.username }}</Option>
        </Select>
        <p>跟随可能存在点差、交易品种及开/休市时间的差异 查看跟随风险提示 >></p>
      </div>
      <div class="direct">
        <li>跟随方向：</li>
        <li>
          <span>正向跟随</span>
          <Switch v-model="setInfo.direct" :true-value="0" :false-value="1"></Switch>
          <span>反向跟随</span>
        </li>
        <p>正向跟随时信号源下多单时跟随下多单，信号源下空单时跟随下空单；反向跟随即相反</p>
      </div>
      <div class="order">
        <RadioGroup v-model="setInfo.follow_type">
          <li>
            <h2>固定数量下单</h2>
            <p>
              <Radio :label="0">
                <Input placeholder="不小于0.01" v-model="setInfo.fiexd_money" :disabled="setInfo.follow_type!==0?true:false" style="width: 135px"></Input>
                <span>标准手</span>
              </Radio>
              <p>例如：您设置固定数量0.01手，不论交易员下单多少手，您手数为0.01手。最低跟随手数为0.01手。</p>
          </li>
          <li>
            <h2>按比例下单</h2>
            <Radio :label="1">
              <Input placeholder="不小于0.01" v-model="setInfo.follow_number" :disabled="setInfo.follow_type!==1?true:false" style="width: 135px"></Input>
              <span>倍</span>
            </Radio>
            <p>例如：您设置为0.5倍比例跟随，交易员下单1手，您的手数为0.5手。</p>
          </li>
        </RadioGroup>
      </div>
      <button @click="setDocumentaryInfo">完成并设置风控</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // 所有账号
      mt: "",
      setInfo: {
        direct: 0,
        follow_type: 0,
        follow_number: "",
        fiexd_money: ""
      },
      follow: {
        tradeType: 1,
        tradeTime: 30
      }
    };
  },
  computed: {
    ...mapGetters(["MTList", "singleId"])
  },
  methods: {
    //跟随
    setDocumentaryInfo() {
      this.$store.dispatch("setDocumentaryInfo", {
        single_id: this.singleId,
        signal_id: this.mt,
        direct: this.setInfo.direct,
        follow_type: this.setInfo.follow_type,
        follow_number: this.setInfo.follow_number,
        fiexd_money: this.setInfo.fiexd_money
      });
      this.$store.dispatch("followSet", false);
      this.mt = "";
      this.setInfo.follow_type = "";
      this.setInfo.follow_number = "";
      this.setInfo.fiexd_money = "";
      if (this.$route.fullPath === "/") {
        this.$store.dispatch("getHomeIndex");
      } else if (this.$route.fullPath === "/maxpro/follow") {
        this.$store.dispatch("getSignalAllList", {
          need_total: 1,
          near_transaction: this.follow.tradeTime, //交易周期
          signal_type: this.follow.tradeType, //信号源类型
          order_field: "", //排序类型
          order_type: "" //排序方向
        });
      }
    }
  },
  mounted() {
    this.$store.dispatch("getMTList");
  }
};
</script>
