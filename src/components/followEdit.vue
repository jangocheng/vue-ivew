<style lang="less" scoped>
@import "./followEdit.less";
</style>
<template>
  <div class="bg">
    <div class="followEdit">
      <h2>跟随-操作高手
        <span>（以下手数展示为“标准手”）</span>
        <i @click="$store.dispatch('followEdit',false)"></i>
      </h2>
      <div class="basic">
        <h4>基本设置</h4>
        <div class="direct">
          <li>跟随方向：</li>
          <li>
            <span>正向跟随</span>
            <Switch v-model="documentaryInfo.direct" :true-value="0" :false-value="1"></Switch>
            <span>反向跟随</span>
          </li>
          <p>正向跟随时信号源下多单时跟随下多单，信号源下空单时跟随下空单；反向跟随即相反</p>
        </div>
        <div class="mode">
          <li>跟随方式：</li>
          <li>
            <RadioGroup v-model="documentaryInfo.follow_type">
              <Radio :label="0">
                <span>固定数量下单</span>
                <Input placeholder="不小于0.01" v-model="documentaryInfo.fiexd_money" :disabled="documentaryInfo.follow_type!==0?true:false" style="width: 135px"></Input>
                <span>标准手</span>
              </Radio>
              <Radio :label="1">
                <span>固定比例下单</span>
                <Input placeholder="不小于0.01" v-model="documentaryInfo.follow_number" :disabled="documentaryInfo.follow_type!==1?true:false" style="width: 135px"></Input>
                <span>倍</span>
              </Radio>
            </RadioGroup>
          </li>
        </div>
        <div class="loss">
          <li>最大亏损金额：</li>
          <li>
            <Input placeholder="不限" style="width: 135px" v-model="documentaryInfo.sl"></Input>
            <span>美金</span>
            <i>跟随此交易员的交易亏损达到此数值后，将所跟随的交易平仓</i>
          </li>
        </div>
      </div>
      <div class="symbol">
        <h4>单个品种的高级设置
          <span>勾选对应品种即表示不跟随</span>
        </h4>
        <p>
          <Input type="text" placeholder="品种名称/代码" style="width: 235px" icon="search" on-click></Input>
        </p>
        <div class="list">
          <CheckboxGroup v-model="documentaryInfo.symbol">
            <Checkbox :label="item.symbol" v-for="(item,index) in signalSymbolList" :key="index">
              <span>{{item.platform_symbol}}</span>
              <span>{{item.platform_name}}</span>
            </Checkbox>
          </CheckboxGroup>
        </div>
        <Button type="primary" @click="updateDocumentaryInfo">保存设置</Button>
        <Button type="error" @click="deleteDocumentaryData">取消跟随</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      mt: "",
      follow: {
        tradeType: 1,
        tradeTime: 30
      }
    };
  },
  computed: {
    ...mapGetters(["MTList", "documentaryInfo", "signalSymbolList"])
  },
  methods: {
    //跟随
    setDocumentaryInfo() {
      let self = this;
      self.$http
        .post(self.$api.url.setDocumentaryInfo, {
          single_id: self.signalInfo.id,
          signal_id: self.mt,
          direct: self.setInfo.direct,
          follow_type: self.setInfo.follow_type,
          follow_number: self.setInfo.follow_number,
          fiexd_money: self.setInfo.fiexd_money
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("跟随成功");
            self.$store.dispatch("getSignalAllList", {
              need_total: 1,
              near_transaction: this.follow.tradeTime, //交易周期
              signal_type: this.follow.tradeType, //信号源类型
              order_field: "", //排序类型
              order_type: "" //排序方向
            });
            self.setInfo.follow_type = "";
            self.setInfo.follow_number = "";
            self.setInfo.fiexd_money = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑跟随
    updateDocumentaryInfo() {
      let self = this;
      self.$http
        .post(self.$api.url.updateDocumentaryInfo, {
          id: self.signalInfo.config_id,
          direct: self.documentaryInfo.direct,
          follow_type: self.documentaryInfo.follow_type,
          follow_number: self.documentaryInfo.follow_number,
          fiexd_money: self.documentaryInfo.fiexd_money,
          symbol: self.documentaryInfo.symbol
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("保存成功");
            self.getSignalAllList(this.follow.tradeType, this.follow.tradeTime);
            self.documentaryInfo.follow_type = "";
            self.documentaryInfo.sl = "";
            self.documentaryInfo.follow_number = "";
            self.documentaryInfo.fiexd_money = "";
            self.documentaryInfo.symbol = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消跟随
    deleteDocumentaryData() {
      let self = this;
      self.$http
        .post(self.$api.url.deleteDocumentaryData, {
          id: self.documentaryInfo.id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("取消成功");
            self.$store.dispatch("followEdit", false);
            self.$store.dispatch("getSignalAllList", {
              need_total: 1,
              near_transaction: this.follow.tradeTime, //交易周期
              signal_type: this.follow.tradeType, //信号源类型
              order_field: "", //排序类型
              order_type: "" //排序方向
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取跟随信息
    getDocumentaryInfo() {
      let self = this;
      self.$http
        .post(self.$api.url.getDocumentaryInfo, {
          id: self.signalInfo.config_id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.documentaryInfo.direct = res.data.data.direct;
            self.documentaryInfo.follow_type = res.data.data.follow_type;
            self.documentaryInfo.fiexd_money = res.data.data.fiexd_money;
            self.documentaryInfo.follow_number = res.data.data.follow_number;
            self.documentaryInfo.sl = res.data.data.sl;
            if (res.data.data.symbol == "all") {
              self.symbolList.map(v => {
                self.documentaryInfo.symbol.push(v.symbol);
              });
            } else {
              self.documentaryInfo.symbol.push(
                ...res.data.data.symbol.split(",")
              );
            }
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.$store.dispatch("getMTList");
  }
};
</script>
