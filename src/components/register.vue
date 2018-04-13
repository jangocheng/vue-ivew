<style lang="less" scoped>
@import "./register.less";
</style>
<template>
  <div class="bg">
    <div class="register">
      <div class="header"></div>
      <div class="content">
        <div class="title">
          <i></i>
          <p v-for="(item,index) in title" :key="index" @click="title_toggle(index)">
            <a :style="index==titleIndex?titleActive:''">
              <span>{{item}}</span>
            </a>
          </p>
        </div>
        <div class="model" v-if="model.phone">
          <p class="phone">
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
            <a @click="getVerificationCode" v-if="info.statu">获取手机验证码</a>
            <a style="color:#999" v-else>{{info.time}}s后重新获取</a>
          </p>
          <p class="password">
            <i></i>
            <input type="password" placeholder="请输入登录密码" v-model="info.password">
          </p>
          <div class="info">
            <a>已经有账号？</a>
          </div>
          <div class="operate">
            <a @click="register">注册</a>
            <a @click="$store.dispatch('registerModel',false)">关闭</a>
          </div>
        </div>
        <div class="model" v-if="model.email">
          <p class="email">
            <i></i>
            <input type="text" placeholder="请输入您的邮箱" v-model="info.email">
          </p>
          <p class="yzcode">
            <i></i>
            <input type="text" placeholder="请输入验证码" v-model="info.verification_img">
            <canvas id="canvas" width="100" height="30"  @click="changeImg"></canvas>
          </p>
          <div class="info">
            <a>已经有账号？</a>
          </div>
          <div class="operate" @click="sendEmail">
            <a class="send">发送邮件</a>
          </div>
        </div>
        <div class="social" :class="model.email?'no_social':''">
          <h6>您还可使用社交账号登录</h6>
          <p>
            <a></a>
            <a></a>
            <a></a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      titleIndex: 0,
      titleActive: {
        color: "#0263ff",
        borderBottom: "2px solid #0263ff"
      },
      title: ["手机号注册", "邮箱注册"],
      model: {
        phone: true,
        email: false
      },
      info: {
        statu: true,
        mobile: "",
        verification_code: "",
        password: "",
        verification_img: "",
        email: "",
        time: 60
      },
      canvasTxT: []
    };
  },
  watch: {
    "info.statu": function(value) {
      if (value === false) {
        let time = setInterval(() => {
          if (this.info.time === 0) {
            clearInterval(time);
            this.info.statu = true;
          }
          this.info.time--;
        }, 1000);
      }
    }
  },
  methods: {
    title_toggle(index) {
      this.titleIndex = index;
      if (index == 0) {
        this.model.phone = true;
        this.model.email = false;
      } else if (index == 1) {
        this.model.phone = false;
        this.model.email = true;
      }
    },
    register() {
      this.$store.dispatch("register", {
        mobile: this.info.mobile,
        verification_code: this.info.verification_code,
        verification_img: this.info.verification_img,
        password: this.info.password
      });
      this.info.mobile = "";
      this.info.verification_code = "";
      this.info.verification_img = "";
      this.info.password = "";
    },
    sendEmail() {
      this.$store.dispatch("sendRegisterEmail", {
        email: this.info.email,
        name: this.info.name,
        verification_img: this.info.verification_img
      });
      this.info.email = "";
      this.info.name = "";
      this.info.verification_img = "";
    },
    changeImg() {
      this.getCaptcha();
    },
    // 获取手机验证码
    getVerificationCode() {
      let self = this;
      self.$http
        .post(self.$api.url.getVerificationCode, {
          mobile: self.info.mobile,
          verification_img: self.info.verification_img,
          user_id: ""
        })
        .then(res => {
          if (res) {
            self.info.statu = false;
          }
        })
        .catch(err => {
          console.log(er);
        });
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
    this.getCaptcha();
  }
};
</script>


