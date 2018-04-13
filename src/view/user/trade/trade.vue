<style lang="less" scoped>
@import "./trade.less";
</style>
<template>
  <div class="trade">
    <transition enter-active-class="animated fadeInRight">
      <div class="manage" v-if="trade.manage">
        <h2>账号管理</h2>
        <button @click="modal.bind=true">绑定MT4账号</button>
        <ul class="list">
          <li v-for="(item,index) in MTList" :key="index">
            <h4>
              <span>{{item.company_name}}</span>
              <a @click="unfold(item)" :style="item.style"></a>
            </h4>
            <transition enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
              <section v-if="item.list">
                <div v-for="(k,index) in item.list" :key="index">
                  <i>
                    <b>#1</b>
                    <b>实盘</b>
                  </i>
                  <img src="../../../images/home/one.png" alt="">
                  <h5>{{k.username}}</h5>
                  <p>平台服务器：
                    <span>{{k.platform_name}}</span>
                  </p>
                  <p>绑定时间：{{k.create_time|formatDate}}</p>
                  <a @click="modal.unbind=true,mtInfo.id=k.id">解绑</a>
                </div>
              </section>
            </transition>
          </li>
        </ul>
      </div>
    </transition>
    <transition enter-active-class="animated fadeInRight">
      <div class="store" v-if="trade.store">
        <h2>开平仓小数位取值</h2>
        <ul class="list">
          <li>
            <h4>开仓手数小数位 大于 经纪商限制时
              <span>（开仓手数小于经纪商限制时，当设置取小时 不开仓）</span>
              <a>取小</a>
              <a>取大</a>
            </h4>
            <p>如：交易员下了1.55手，跟随比例是0.1倍，按比例算出来的跟单手数是：1.55*0.1=0.155手，由于经纪商限制了最小手数是0.01手，当
              <span>取大值</span> 时实际跟单手数是
              <span>0.16</span> 手</p>
          </li>
          <li>
            <h4>跟随部分平仓， 手数小数位 大于 经纪商限制时
              <a>取小</a>
              <a>取大</a>
            </h4>
            <p>如：交易员下了1.55手，跟随者对应的订单手数是0.1手，当交易员部分平掉0.5手时，按比例算出来的跟随平仓手数是：（0.5/1.55）*0.1=0.03225手，由于经纪商限制了最小手数是0.01手，当
              <span>取大值</span> 时实际跟随平仓手数是
              <span>0.16</span>手</p>
          </li>
        </ul>
      </div>
    </transition>
    <Modal v-model="modal.bind" :closable="false" :mask-closable="false" :styles="{width:'480px',height:'451px',top:'200px',marginLeft:'-242px'}">
      <p slot="header">
        请输您的MT4账号信息
        <i @click="modal.bind=false"></i>
      </p>
      <p>
        <span>交易商平台：</span>
        <span>
          <Select clearable style="width:235px" @on-change="selectPlatform">
            <Option v-for="item in platformList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </span>
      </p>
      <p>
        <span>平台服务器：</span>
        <span>
          <Select v-model="mtInfo.platform_id" clearable style="width:235px">
            <Option v-for="item in serverList" :value="item.id" :key="item.id">{{ item.server_name }}</Option>
          </Select>
        </span>
      </p>
      <p>
        <span>平台账号：</span>
        <span>
          <Input v-model="mtInfo.login_id" placeholder="请选择平台账号" style="width: 235px"></Input>
        </span>
      </p>
      <p>
        <span>只读密码：</span>
        <span>
          <Input type="password" v-model="mtInfo.password" placeholder="请选择平台账号只读密码" style="width: 235px"></Input>
        </span>
      </p>
      <p>
        <span>账号命名：</span>
        <span>
          <Input v-model="mtInfo.username" placeholder="请给您的这个账号起一个名字" style="width: 235px"></Input>
        </span>
      </p>
      <!-- <p>
            <span>是否公开 ：</span>
            <Switch v-model="switch1" @on-change="change"></Switch>（默认公开，更改为隐私后仅为自己可见）
          </p> -->
      <p>
        <span></span>
        <span>
          <Button type="primary" @click="setMTInfo">提交</Button>
        </span>
      </p>
      <div slot="footer">
      </div>
    </Modal>
    <Modal v-model="modal.unbind" :closable="false" :mask-closable="false" :styles="{width:'330px',height:'196px',top:'300px',marginLeft:'-165px'}">
      <div class="unbind">
        <p>您确定要解绑吗？</p>
        <p>解绑后您设置的跟随信息将失效。</p>
        <button @click="modal.unbind=false">取消</button>
        <button @click="deleteMTData">确定</button>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
import { formatDate } from "../../../js/filter.js";
export default {
  props: {
    trade: {
      manage: Boolean,
      store: Boolean
    }
  },
  filters: {
    formatDate(value) {
      return formatDate(value);
    }
  },
  data() {
    return {
      platformList: [],
      serverList: [],
      mtInfo: {
        platform_id: "",
        login_id: "",
        password: "",
        username: "",
        id: ""
      },
      MTList: [],
      modal: {
        unbind: false,
        bind: false
      },
      unfold_style: {
        background:
          "url(" + require("../../../images/info/9.png") + ") no-repeat"
      },
      fold_style: {
        background:
          "url(" + require("../../../images/info/10.png") + ") no-repeat"
      }
    };
  },
  methods: {
    unfold(item) {
      if (item.style == item.fold_style) {
        item.style = item.unfold_style;
      } else {
        item.style = item.fold_style;
      }
    },
    selectPlatform(value) {
      this.getCompanyPlatformList(value);
    },
    // 获取交易商平台
    getCompanyList() {
      let self = this;
      self.$http
        .post(self.$api.url.getCompanyList, {})
        .then(res => {
          if (res.data.code == 0) {
            self.platformList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取平台服务器
    getCompanyPlatformList(id) {
      console.log(id);
      let self = this;
      self.$http
        .post(self.$api.url.getCompanyPlatformList, {
          server_id: id
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            self.serverList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取MT列表
    getMTList() {
      let self = this;
      self.$http
        .post(self.$api.url.getMTList, {})
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.map(v => {
              self.MTList.push({
                style: self.fold_style,
                unfold_style: self.unfold_style,
                fold_style: self.fold_style,
                ...v
              });
            });
            console.log(self.MTList);
          }
        })
        .catch(err => {});
    },
    // MT帐号添加
    setMTInfo() {
      let self = this;
      self.$http
        .post(self.$api.url.setMTInfo, {
          platform_id: self.mtInfo.platform_id,
          login_id: self.mtInfo.login_id,
          password: self.mtInfo.password,
          username: self.mtInfo.username
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("添加成功");
            self.modal.bind = false;
            self.getMTList();
          }
        })
        .catch(err => {});
    },
    // MT账号删除
    deleteMTData() {
      let self = this;
      self.$http
        .post(self.$api.url.deleteMTData, {
          id: self.mtInfo.id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("解绑成功");
            self.modal.unbind = false;
            self.getMTList();
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getCompanyList();
    this.getMTList();
  }
};
</script>