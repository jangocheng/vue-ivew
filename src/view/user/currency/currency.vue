<style lang="less" scoped>
@import "./currency.less";
</style>
<template>
  <div class="currency">
    <transition enter-active-class="animated fadeInRight">
      <div class="bill" v-if="currency.bill">
        <div class="manage" v-if="bill.manage">
          <h2>社区币管理</h2>
          <div class="title">
            <span>社区币余额：</span>
            <span>
              <i>{{userInfo.balance}}</i>
              <i>1社区币=1美元</i>
            </span>
            <span>其中冻结：{{userInfo.freezing_amount}}</span>
            <Button type="primary" @click="bill.recharge=true,bill.manage=false">充值</Button>
            <Button @click="bill.withdraw=true,bill.manage=false">提现</Button>
          </div>
          <div class="content">
            <div class="select">
              <Select v-model="model1" style="width:200px;float:right">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <Table :columns="balanceColumns" :data="balanceData" size="large" />
            <div class="pagenation">
              <Page :total="total" @on-change="pagechange"></Page>
            </div>
          </div>
        </div>
        <div class="recharge" v-if="bill.recharge">
          <h2>社区币充值</h2>
          <p>
            <span>充值金额：</span>
            <input type="text" placeholder="请输入充值金额">
          </p>
          <p>
            <span>支付方式：</span>
          </p>
          <div>
            <img src="../../../images/info/13.png" alt="">
            <img src="../../../images/info/14.png" alt="">
            <img src="../../../images/info/15.png" alt="">
            <p>
              <span>应付金额：
                <i>99</i>元 </span>
            </p>
            <button>去支付</button>
          </div>
        </div>
        <div class="withdraw" v-if="bill.withdraw">
          <h2>社区币充值</h2>
          <p>
            <span>提现银行卡：</span>
            <selectDown/>
            <span>请在银行卡中添加</span>
          </p>
          <p>
            <span>提现金额：</span>
            <input type="text" placeholder="请输入提现金额">
            <span>当前有1000社区币，其中冻结200，可提现800</span>
          </p>
          <p>
            <span></span>
            <span>提交后，工作人员会在2~5个工作日内审核，审核成功后，会向你对应的银行卡打款，请注意查收</span>
          </p>
          <p>
            <span></span>
            <button>提交</button>
          </p>
        </div>
      </div>
    </transition>
    <transition enter-active-class="animated fadeInRight">
      <div class="bank" v-if="currency.bank">
        <div class="manage" v-if="modal.manage">
          <h2>银行卡管理</h2>
          <div class="content">
            <Button type="primary" @click="modal.add=true,modal.manage=false">添加</Button>
            <h5>
              <span>只有已认证的用户才可以添加银行卡信息</span>
            </h5>
            <Table :columns="bankColumns" :data="bankData" />
          </div>
        </div>
        <div class="add" v-if="modal.add">
          <h2>银行卡管理</h2>
          <div class="content">
            <p>
              <span>开户行名称：</span>
              <span><Input type="text" v-model="bank.bank_name" placeholder="请输入" style="width: 235px" /></span>
            </p>
            <p>
              <span>银行卡号：</span>
                <span><Input type="text" v-model="bank.card_number" placeholder="请输入" style="width: 235px" /></span>
            </p>
            <p>
              <span></span>
              <span>只有已认证的用户才可以添加银行卡信息</span>
            </p>
            <p>
              <span></span>
              <button @click="setBankInfo">保存</button>
              <button @click="modal.add=false,modal.manage=true">返回</button>
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    currency: {
      bill: Boolean,
      bank: Boolean
    }
  },
  data() {
    return {
      userInfo: {},
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model1: "",
      bill: {
        manage: true,
        recharge: false,
        withdraw: false
      },
      modal: {
        manage: true,
        add: false
      },
      bank: {
        bank_name: "",
        card_number: ""
      },
      total: 0,
      current: 1,
      balanceColumns: [
        {
          title: "类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            if (params.row.type == 1) {
              return "变动";
            } else if (params.row.type == 2) {
              return "冻结";
            }
          }
        },
        {
          title: "变动类型",
          key: "amount_type",
          align: "center",
          render: (h, params) => {
            if (params.row.amount_type == 1) {
              return "增加";
            } else if (params.row.amount_type == 2) {
              return "减少";
            }
          }
        },
        {
          title: "变动原因",
          key: "source_type",
          align: "center",
          render: (h, params) => {
            if (params.row.source_type == 1) {
              return "充值";
            } else if (params.row.source_type == 2) {
              return "跟随佣金";
            } else if (params.row.source_type == 3) {
              return "被跟随收入";
            }
          }
        },
        {
          title: "变动说明",
          key: "remark",
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time",
          align: "center"
        }
      ],
      balanceData: [],
      bankColumns: [
        {
          title: "开户银行",
          key: "bank_name",
          align: "center"
        },
        {
          title: "银行卡号",
          key: "card_number",
          align: "center"
        },
        {
          title: "绑定时间",
          key: "create_time",
          align: "center"
        }
      ],
      bankData: []
    };
  },
  methods: {
    pagechange(currentPage) {
      console.log(currentPage);
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
    },
    getBalanceList() {
      let self = this;
      self.$http
        .post(self.$api.url.getBalanceList, {
          order_type: "",
          need_total: 1
        })
        .then(res => {
          if (res.data.code == 0) {
            self.balanceData = res.data.data.list;
            self.total = res.data.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBankList() {
      let self = this;
      self.$http
        .post(self.$api.url.getBankList, {})
        .then(res => {
          if (res.data.code == 0) {
            self.bankData = res.data.data
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 添加银行卡
    setBankInfo() {
      let self = this;
      self.$http
        .post(self.$api.url.setBankInfo, {
          bank_name: self.bank.bank_name,
          card_number: self.bank.card_number
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("添加成功");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getBalanceList();
    this.getBankList();
    if (sessionStorage.getItem("user_info")) {
      this.userInfo = JSON.parse(unescape(sessionStorage.getItem("user_info")));
      console.log(this.userInfo);
    }
  }
};
</script>