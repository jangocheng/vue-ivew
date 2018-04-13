<style lang="less" scoped>
@import "./login.less";
</style>
<template>
  <div class="bg">
    <div class="login">
      <div class="header">
        <img src="../images/login/qrcode.png" alt="" @click="code_toggle">
      </div>
      <div class="content" v-if="model.code?false:true">
        <div class="title">
          <i></i>
          <p v-for="(item,index) in title"  :key="index" @click="title_toggle(index)" >
            <a :style="index==titleIndex?titleActive:''">
              <span>{{item}}</span>
            </a>
          </p>
        </div>
        <div class="model">
          <p class="phone" v-if="model.mobile">
            <i></i>
            <input type="text" placeholder="请输入您的手机号" v-model="info.mobile">
          </p>
          <p class="email" v-if="model.email">
            <i></i>
            <input type="text" placeholder="请输入您的邮箱" v-model="info.email">
          </p>
          <p class="yzcode" v-if="model.m_code">
            <i></i>
            <input type="text" placeholder="请输入验证码" v-model="info.verification_img">
            <canvas id="canvas" width="100" height="30"  @click="changeImg"></canvas>
          </p>
          <p v-if="model.mobile&&model.m_pwd" class="pwd">
            <i></i>
            <input type="password" placeholder="请输入您的手机密码" v-model="info.mobilePwd">
          </p>
          <p class="phonecode" v-if="model.m_code">
            <i></i>
            <input type="text" placeholder="请输入手机动态密码" v-model="info.mobileCode">
            <a @click="sendMobileLoginCode" v-if="info.statu">获取动态验证码</a>
            <a style="color:#999" v-else>{{info.time}}s后重新获取</a>
          </p>
          <p v-if="model.email&&model.e_pwd" class="pwd">
            <i></i>
            <input type="password" placeholder="请输入您的邮箱密码" v-model="info.emailPwd">
          </p>
          <div class="operate">
            <input type="checkbox" v-model="remember">
            <span>记住账号</span>
            <a @click="$emit('loginStatu', false),$emit('registerStatu', true)">注册</a>
            <i>|</i>
            <a @click="$emit('reset',true)">忘记密码</a>
            <a @click="dynamicCode" v-if="model.mobile">{{info.dynamic}}</a>
          </div>
          <div class="btn">
            <a @click="login">登录</a>
            <a @click="$store.dispatch('loginModel',false)">关闭</a>
          </div>
        </div>
      </div>
      <div class="code" v-if="model.code">
        <h3>微信二维码登录</h3>
        <h6>为保障账户安全，请使用微信扫码验证身份</h6>
        <img src="../images/login/code.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        mobile: true,
        email: false,
        code: false,
        m_pwd: true,
        e_pwd: true,
        m_code: false,
        e_code: false
      },
      titleIndex: 0,
      titleActive: {
        color: "#0263ff",
        borderBottom: "2px solid #0263ff"
      },
      title: ["手机号登录", "邮箱登录"],
      info: {
        mobile: "",
        email: "",
        mobilePwd: "",
        emailPwd: "",
        mobileCode: "",
        dynamic: "动态密码",
        verification_img: "",
        statu: true,
        time: 60
      },
      remember: ""
    };
  },
  watch: {
    "info.statu": function(value) {
      if (value === false) {
        let time = setInterval(()=>{
          if(this.info.time===0){
            clearInterval(time)
            this.info.statu = true
          }
          this.info.time--
        },1000)
      }
    }
  },
  methods: {
    dynamicCode() {
      if (this.titleIndex === 0) {
        this.model.m_pwd = !this.model.m_pwd;
        this.model.m_code = !this.model.m_code;
        this.info.dynamic =
          this.info.dynamic === "动态密码" ? "账号密码" : "动态密码";
        if (this.model.m_code === true) {
          this.getCaptcha();
          this.model.dynamic_btn = true;
          this.model.mobile_btn = false;
        } else {
          this.model.dynamic_btn = false;
          this.model.mobile_btn = true;
        }
      } else if (this.titleIndex === 1) {
      }
    },
    code_toggle() {
      this.model.code = !this.model.code;
    },
    title_toggle(index) {
      this.titleIndex = index;
      this.model.dynamic_btn = false;
      this.info.dynamic = "动态密码";
      if (index == 0) {
        this.model.mobile = true;
        this.model.mobile_btn = true;
        this.model.email = false;
        this.model.email_btn = false;
        this.model.m_pwd = true;
      } else if (index == 1) {
        this.model.mobile = false;
        this.model.mobile_btn = false;
        this.model.email_btn = true;
        this.model.email = true;
        this.model.m_code = false;
        this.model.e_pwd = true;
      }
    },
    login() {
      if (this.titleIndex === 0) {
        if (this.model.m_code === true) {
          this.$store.dispatch("loginCode", {
            mobile: this.info.mobile,
            code: this.info.mobileCode,
            remember: this.remember
          });
        } else {
          this.$store.dispatch("loginMobile", {
            mobile: this.info.mobile,
            password: this.info.mobilePwd,
            remember: this.remember
          });
        }
      } else if (this.titleIndex === 1) {
        this.$store.dispatch("loginEmail", {
          email: this.info.email,
          password: this.info.emailPwd,
          remember: this.remember
        });
      }
      this.$store.dispatch('getHomeIndex')
    },
    // 发送动态验证码
    sendMobileLoginCode() {
      let self = this;
      self.$http
        .post(self.$api.url.sendMobileLoginCode, {
          mobile: self.info.mobile,
          verification_img: self.info.verification_img
        })
        .then(res => {
          if (res.data.code == 0) {
            self.info.statu = false
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeImg() {
      this.getCaptcha();
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
    if (localStorage.getItem("mobile")) {
      this.info.mobile = localStorage.getItem("mobile");
    }
    if (localStorage.getItem("email")) {
      this.info.email = localStorage.getItem("email");
    }
  }
};
</script>
