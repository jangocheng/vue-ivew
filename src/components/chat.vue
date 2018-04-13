<template>
  <div class="chat">
    <a @mouseover="vip_toggle"></a>
    <a @mouseover="chat_toggle"></a>
    <a @mouseover="phone_toggle"></a>
    <a @mouseover="top_toggle"></a>
    <transition>
      <div class="vip" v-if="chat.vip" @mouseout="vip_toggle"><span>招募高手</span><span></span></div>
    </transition>
    <transition>
      <div class="_chat" v-if="chat.chat" @mouseout="chat_toggle"><span>在线客服</span><span></span></div>
    </transition>
    <transition>
      <div class="phone" v-if="chat.phone" @mouseout="phone_toggle"><img src="../images/login/code.png" alt=""><span></span></div>
    </transition>
    <transition>
      <div class="top" v-if="chat.top" @mouseout="top_toggle"><span>回到顶部</span><span></span></div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chat: {
        vip: false,
        chat: false,
        phone: false,
        top: false
      }
    };
  },
  methods: {
    vip_toggle() {
      this.chat.vip = !this.chat.vip;
      this.chat.chat = false;
      this.chat.phone = false;
      this.chat.top = false;
    },
    chat_toggle() {
      this.chat.chat = !this.chat.chat;
      this.chat.vip = false;
      this.chat.phone = false;
      this.chat.top = false;
    },
    phone_toggle() {
      this.chat.phone = !this.chat.phone;
      this.chat.vip = false;
      this.chat.chat = false;
      this.chat.top = false;
    },
    top_toggle() {
      this.chat.top = !this.chat.top;
      this.chat.vip = false;
      this.chat.chat = false;
      this.chat.phone = false;
    }
  }
};
</script>
