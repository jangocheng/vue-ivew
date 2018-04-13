<template>
  <div id="maxpro">
    <MenuHeader />
    <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
      <keep-alive>
        <FollowSet v-if="$store.state.followSet.model"/>
      </keep-alive>
    </transition>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
      <keep-alive>
        <FollowEdit  v-if="$store.state.followEdit.model"/>
      </keep-alive>
    </transition>
     <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
      <keep-alive>
        <Login v-if="$store.state.login.model"/>
      </keep-alive>
    </transition>
     <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
       <keep-alive>
        <Register v-if="$store.state.register.model"/>
      </keep-alive>
    </transition>
    <Chat/>
    <Footer/>
  </div>
</template>
<script>
  import MenuHeader from "./components/menuHeader";
  import Chat from "./components/chat";
  import Footer from "./components/footer";
  import FollowSet from "./components/followSet";
  import FollowEdit from './components/followEdit'
  import Login from './components/login'
  import Register from './components/register'
  export default {
    name: "Maxpro",
    components: {
      Chat,
      MenuHeader,
      Footer,
      FollowSet,
      FollowEdit,
      Login,
      Register
    }
  };
</script>
<style lang="less">
  @import "./styles/reset.less";
  @import "./styles/common.less";
  html,
  body {
    font-size: 12px;
    width: 100%;
    height: 100%;
    background: #f9f9f9;
    position: relative;
  }

  #maxpro {
    background: #f9f9f9;
  }

  .ivu-spin-fullscreen {
    background: rgba(0, 0, 0, 0.1);
  }

  .ivu-modal {
    background-color: #ffffff;
    box-shadow: 0px 3px 5px 0px rgba(232, 232, 232, 0.62);
    border-radius: 6px;
    position: absolute;
    left: 50%;
  }

  .ivu-modal-header {
    p {
      font-size: 16px;
    }
    i {
      position: absolute;
      cursor: pointer;
      width: 18px;
      height: 18px;
      background: url("images/iconfont/cancle_black.png") no-repeat;
      right: 10px;
      top: 10px;
    }
  }

  .ivu-modal-body {
    padding: 0;
    p {
      overflow: hidden;
      margin: 20px 0;
      font-size: 14px;
      >span:nth-of-type(1) {
        display: block;
        float: left;
        width: 130px;
        text-align: right;
        height: 32px;
        line-height: 32px;
        color: #999999;
      }
    }
    .type {
      padding: 0 40px;
      p {
        a {
          color: #2d8cf0;
        }
      }
    }
    .modal {
      overflow: hidden;
      padding-bottom: 20px;
      button {
        float: right;
        margin-left: 20px;
      }
      p {
        width: 100%;
        border-radius: 8px;
        border: solid 1px #c9c9c9;
        margin-bottom: 28px;
        padding: 10px;
        box-sizing: border-box;
        i {
          width: 12px;
          height: 16px;
          display: block;
          float: left;
          margin-right: 12px;
          margin-top: 2px;
        }
        input {
          float: left;
        }
      }
      .yzcode {
        padding: 0 10px;
        i {
          width: 16px;
          margin-top: 18px;
          height: 13px;
          background: url("images/login/yzcode.png") no-repeat;
        }
        input {
          margin-top: 14px;
          width: 140px;
          border-right: 1px solid #999999;
        }
        canvas {
          float: right;
          margin: 9px;
        }
      }
      .phone {
        i {
          background: url("images/login/phone.png") no-repeat;
        }
      }
      .phonecode {
        i {
          width: 14px;
          height: 16px;
          background: url("images/login/pass.png") no-repeat;
        }
      }
      .password {
        i {
          background: url("images/login/pwd.png") no-repeat;
        }
      }
      .email {
        i {
          width: 14px;
          margin-top: 5px;
          height: 13px;
          background: url("images/login/email.png") no-repeat;
        }
      }
    }
    .unbind {
      p {
        float: none;
        font-size: 16px;
        text-align: center;
        line-height: 24px;
        margin: 20px 0;
        color: #333333;
      }
      button {
        width: 88px;
        height: 32px;
        border-radius: 4px;
        border: solid 1px rgba(145, 149, 160, 0.4);
        text-align: center;
        line-height: 32px;
        background: #ffffff;
        margin-top: 20px;
        margin-left: 70px;
      }
      button:nth-of-type(2) {
        margin-left: 10px;
        background-color: #0263ff;
        color: #ffffff;
      }
    }
    .send {
      padding: 20px;
      overflow: hidden;
      div {
        overflow: hidden;
        margin-bottom: 20px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          float: left;
        }
        span {
          display: block;
          float: left;
          font-size: 14px;
          margin-left: 10px;
          line-height: 40px;
        }
      }
      button {
        float: right;
      }
    }
  }

  .ivu-modal-footer {
    padding: 0;
    border: none;
  }
</style>
