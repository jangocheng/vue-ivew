<template>
  <div class="menu">
    <div class="menu-header">
      <div class="menu-header-left">
        <img src="../images/home/PRO.png" alt="">
      </div>
      <div class="menu-header-center">
        <ul>
          <li v-for="(item,index) in TabList" :key="index" :style="typeIndex==index?typeActive:''" @click="toggle(item,index)">{{item.label}}</li>
        </ul>
      </div>
      <div class="menu-header-right">
        <div class="search">
          <Input v-model="value" icon="search" placeholder="搜索关键字" style="width:160px" />
        </div>
        <div class="login" v-if="!user.statu">
          <a @click="$store.dispatch('loginModel',true)">登录</a>
        </div>
        <div class="register" v-if="!user.statu">
          <a @click="$store.dispatch('registerModel',true)">注册</a>
        </div>
        <div class="user" v-if="user.statu">
          <div class="badge" @click="$router.push('/maxpro/blog/my/mail')">
            <Badge :count="count">
              <Icon type="ios-bell-outline" size="32"></Icon>
            </Badge>
          </div>
          <div class="info">
            <img :src="$api.url.baseURI+user.info.avatar" alt="">
            <span @click="infoDetail=true">{{user.info.nickname}}</span>
            <i @click="infoDetail=true"></i>
            <Poptip v-model="infoDetail" placement="bottom" style="position: absolute;right:0px;margin-right:60px; top: 32px;">
              <div class="poptip" slot="content">
                <a @click="$router.push('/maxpro/center'),infoDetail=false">个人中心</a>
                <a @click="$router.push('/maxpro/blog/my/index'),infoDetail=false">我的博客</a>
                <a @click="$router.push('/maxpro/user'),infoDetail=false">设置</a>
                <a @click="logout">退出</a>
              </div>
            </Poptip>
          </div>
        </div>
      </div>
    </div>
     <Modal
        v-model="statu.reset"
        :styles="{width:'400px',minHeight:'250px',top:'200px',marginLeft:'-200px'}"
        :mask-closable="false" title="重置密码">
        <div class="type" v-if="statu.method">
          <p>方式一：<a @click="statu.mobile=true,statu.method=false,getCaptcha()">通过手机号重置</a></p>
          <p>方式二：<a @click="statu.email=true,statu.method=false,getCaptcha()">通过邮箱验证重置</a></p>
        </div>
        <div class="type modal" v-if="statu.mobile">
          <p class="phone" >
            <i></i>
            <input type="text" placeholder="请输入您的手机号" v-model="info.mobile">
          </p>
          <p class="yzcode">
            <i></i>
            <input type="text" placeholder="请输入验证码" v-model="info.verification_img">
            <canvas id="canvas" width="100" height="30"  @click="changeImg"></canvas>
          </p>
          <p class="phonecode">
            <i></i>
            <input type="text" placeholder="请输入手机验证码" v-model="info.verification_code">
            <a @click="sendForgetMobileCode">{{info.text}}</a>
          </p>
          <p class="password">
            <i></i>
            <input type="password" placeholder="请输入新密码" v-model="info.password">
          </p>
          <p class="password">
            <i></i>
            <input type="password" placeholder="请再次输入新密码" v-model="info.repassword">
          </p>
          <Button type="primary" @click="findResetPassword(1)">重置密码</Button>
          <Button @click="statu.mobile=false,statu.method=true">返回上一页</Button>
        </div>
        <div class="type modal" v-if="statu.email">
          <p class="email">
            <i></i>
            <input type="text" placeholder="请输入您的邮箱" v-model="info.email">
          </p>
          <p class="yzcode">
            <i></i>
            <input type="text" placeholder="请输入验证码" v-model="info.verification_img">
            <canvas id="canvas" width="100" height="30"  @click="changeImg"></canvas>
          </p>
          <Button type="primary" @click="sendForgetEmail">发送邮件</Button>
          <Button @click="statu.email=false,statu.method=true">返回上一页</Button>
        </div>
        <div class="type modal" v-if="statu.getpsw">
          <p class="password">
            <i></i>
            <input type="password" placeholder="请输入新密码" v-model="info.password">
          </p>
          <p class="password">
            <i></i>
            <input type="password" placeholder="请再次输入新密码" v-model="info.repassword">
          </p>
          <Button type="primary" @click="findResetPassword(2)">重置密码</Button>
        </div>
        <div slot="footer">
        </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  watch: {
    $route(to, from) {
      this.TabList.map((v, k) => {
        if (to.fullPath == v.path) {
          this.typeIndex = k;
        }
      });
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      count: 0,
      statu: {
        reset: false,
        method: true,
        mobile: false,
        email: false,
        getpsw: false
      },
      info: {
        text: "获取验证码",
        mobile: "",
        email: "",
        key: "",
        verification_code: "",
        verification_img: "",
        password: "",
        repassword: ""
      },
      value: "",
      TabList: [
        {
          label: "首页",
          path: "/"
        },
        {
          label: "交易跟随",
          path: "/maxpro/follow"
        },
        {
          label: "交易动态",
          path: "/maxpro/dynamic"
        },
        {
          label: "在线理财",
          path: "/maxpro/manage"
        },
        {
          label: "策略定制",
          path: "/"
        }
      ],
      infoDetail: false,
      typeIndex: 0,
      typeActive: {
        background: "linear-gradient(#0263ff, #44b2fe)",
        color: "#ffffff"
      }
    };
  },
  watch: {
    $route(to, from) {
      if (to.query.getpsw == "true") {
        this.statu.reset = true;
        this.statu.getpsw = true;
        this.statu.method = false;
        this.info.email = to.query.email;
        this.info.key = to.query.key;
      }
    }
  },
  methods: {
    toggle(item, index) {
      this.typeIndex = index;
      this.$router.push(item.path);
    },
    reset(value) {
      if (value) {
        this.statu.login = false;
        this.statu.reset = value;
      }
    },
    logout() {
      let self = this;
      self.$http
        .post(self.$api.url.logout, {})
        .then(res => {
          if (res.data.code == 0) {
            sessionStorage.removeItem("access_user");
            sessionStorage.removeItem("user_info");
            self.user.statu = false;
            self.user.info = {};
            self.$Message.success("当前账号已成功退出");
            self.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeImg() {
      this.getCaptcha();
    },
    getWebMailUnreadTotal() {
      let self = this;
      self.$http
        .post(self.$api.url.getWebMailUnreadTotal, {})
        .then(res => {
          if (res.data.code == 0) {
            self.count = res.data.data;
          }
        })
        .catch(err => {});
    },
    // 获取手机验证码
    sendForgetMobileCode() {
      let self = this;
      self.$http
        .post(self.$api.url.sendForgetMobileCode, {
          mobile: self.info.mobile,
          verification_img: self.info.verification_img
        })
        .then(res => {
          if (res) {
            self.info.text = "验证码已发送！";
          }
        })
        .catch(err => {
          console.log(er);
        });
    },
    //发送邮件
    sendForgetEmail() {
      let self = this;
      self.$http
        .post(self.$api.url.sendForgetEmail, {
          email: self.info.email,
          verification_img: self.info.verification_img
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("邮件发送成功！请注意查收");
            self.statu.reset = false;
          }
        })
        .catch(err => {});
    },
    // 找回密码
    findResetPassword(type) {
      let self = this;
      let obj = {};
      if (type == 1) {
        obj = {
          type: type,
          mobile: self.info.mobile,
          code: self.info.verification_code,
          new_password: self.info.password,
          repassword: self.info.repassword
        };
      } else if (type == 2) {
        obj = {
          type: type,
          email: self.info.email,
          key: self.info.key,
          new_password: self.info.password,
          repassword: self.info.repassword
        };
      }
      self.$http
        .post(self.$api.url.findResetPassword, obj)
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("重置密码成功");
            self.statu.reset = false;
            if (type == 2) {
              self.$router.push("/");
            }
          }
        })
        .catch(err => {});
    },
    // 获取图片验证码
    getCaptcha() {
      let self = this;
      self.$http
        .post(self.$api.url.getCaptchaCode, {})
        .then(res => {
          if (res.data.code == 0) {
            self.canvasTxT = res.data.data.toString().split("");
            self.drawPic();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**生成一个随机色**/
    randomColor(min, max) {
      var r = this.randomNum(min, max);
      var g = this.randomNum(min, max);
      var b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    /**生成一个随机数**/
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    /**绘制验证码图片**/
    drawPic() {
      var canvas = document.getElementById("canvas");
      var width = canvas.width;
      var height = canvas.height;
      var ctx = canvas.getContext("2d");
      ctx.textBaseline = "bottom";
      /**绘制背景色**/
      ctx.fillStyle = this.randomColor(180, 240); //颜色若太深可能导致看不清
      ctx.fillRect(0, 0, width, height);
      /**绘制文字**/
      for (var i = 0; i < this.canvasTxT.length; i++) {
        var txt = this.canvasTxT[i];
        ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
        ctx.font = this.randomNum(30, 35) + "px SimHei"; //随机生成字体大小
        var x = 20 + i * 20;
        var y = 30;
        var deg = this.randomNum(0, 45);
        //修改坐标原点和旋转角度
        ctx.translate(x, y);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(txt, 0, 0);
        //恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
      }
      /**绘制干扰线**/
      for (var i = 0; i < this.canvasTxT.length; i++) {
        ctx.strokeStyle = this.randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
        ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
        ctx.stroke();
      }
      /**绘制干扰点**/
      for (var i = 0; i < 100; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          this.randomNum(0, width),
          this.randomNum(0, height),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  },
  mounted() {
    if (!sessionStorage.getItem("access_user")) {
    } else {
      this.getWebMailUnreadTotal();
      setInterval(() => {
        this.getWebMailUnreadTotal();
      }, 30000);
    }
    if (sessionStorage.getItem("user_info")) {
      this.user.info = JSON.parse(
        unescape(sessionStorage.getItem("user_info"))
      );
      this.user.statu = true;
    }
  }
};
</script>
<style lang="less" scoped>
.menu {
  width: 100%;
  background: #fff;
  height: 60px;
  box-shadow: 0px 3px 5px 0px rgba(232, 232, 232, 0.38);
  &-header {
    width: 1200px;
    margin: auto;
    height: 60px;
    &-left {
      width: 185px;
      height: 60px;
      position: relative;
      float: left;
      margin-right: 64px;
      img {
        position: absolute;
        top: 12px;
        right: 0;
      }
    }
    &-center {
      float: left;
      ul {
        li {
          float: left;
          line-height: 60px;
          padding: 0 30px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
        }
      }
    }
    &-right {
      width: 360px;
      height: 60px;
      float: right;
      .search {
        float: left;
        overflow: hidden;
        padding: 16px 0;
        input {
          width: 120px;
          border-radius: 20px;
        }
      }
      .search:focus {
        border-radius: 20px;
        border-color: #c9c9c9;
        -webkit-box-shadow: 0 0 0 1px #e2e2e2;
        box-shadow: 0 0 0 1px #e2e2e2;
      }
      .register {
        float: right;
        width: 65px;
        overflow: hidden;
        a {
          display: block;
          width: 55px;
          height: 60px;
          line-height: 60px;
          text-align: right;
          background: url("../images/home/register.png") no-repeat left center;
        }
      }
      .login {
        float: right;
        width: 65px;
        overflow: hidden;
        margin-left: 10px;
        a {
          display: block;
          width: 55px;
          height: 60px;
          line-height: 60px;
          text-align: right;
          background: url("../images/home/login.png") no-repeat left center;
        }
      }
      .user {
        height: 40px;
        float: right;
        position: relative;
        .badge {
          float: left;
          cursor: pointer;
          // width: 60px;
          padding: 15px 0;
          text-align: center;
        }
        .info {
          float: left;
          img {
            display: block;
            float: left;
            width: 24px;
            height: 24px;
            border-radius: 100%;
            margin-left: 14px;
            margin-top: 18px;
          }
          span {
            font-size: 14px;
            color: #333333;
            float: left;
            margin-left: 8px;
            margin-top: 22px;
            cursor: pointer;
          }
          i {
            display: block;
            float: right;
            width: 10px;
            height: 5px;
            margin: 28px 0;
            margin-left: 16px;
            background: url("../images/iconfont/down_black.png") no-repeat;
          }
          .poptip {
            float: left;
            a {
              width: 120px;
              display: block;
              text-align: center;
              line-height: 32px;
            }
          }
        }
      }
    }
  }
}
</style>
