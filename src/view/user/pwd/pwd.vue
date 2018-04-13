<style lang="less" scoped>
@import "./pwd.less";
</style>
<template>
  <div class="pwd">
      <h2>修改密码</h2>
      <div class="content">
          <p>
              <span>原密码：</span>
              <span>
                   <Input v-model="reset.password" type="password" placeholder="请输入" style="width: 235px"></Input>
              </span>
          </p>
          <p>
              <span>新密码：</span>
               <span>
                   <Input v-model="reset.new_password" type="password" placeholder="请输入" style="width: 235px"></Input>
              </span>
              <span>请使用6-16位字母（区分大小写）、数字、特殊字符，建议组合使用</span>
          </p>
          <p>
              <span></span>
          </p>
          <p>
              <span>确认新密码：</span>
             <span>
                   <Input v-model="reset.repassword" type="password" placeholder="请输入" style="width: 235px"></Input>
              </span>
          </p>
          <p>
              <span></span>
              <button @click="resetPassword">保存</button>
              <button>返回</button>
          </p>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reset: {
        password: "",
        repassword: "",
        new_password: ""
      }
    };
  },
  methods: {
    resetPassword() {
      let self = this;
      self.$http
        .post(self.$api.url.resetPassword, {
          password: self.reset.password,
          repassword: self.reset.repassword,
          new_password: self.reset.new_password
        })
        .then(res => {
          if(res.data.code==0){
            self.$Message.succcess("修改密码成功！请重新登录")
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

