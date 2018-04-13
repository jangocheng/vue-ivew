<style lang="less" scoped>
@import "./info.less";
</style>
<template>
    <div class="info">
        <transition enter-active-class="animated fadeInRight">
            <div class="basic" v-if="info.basic">
                <h2>基本资料</h2>
                <div class="basic-info" v-if="model.basic.info">
                    <Button @click="model.basic.info=false,model.basic.edit=true" type="primary">修改</Button>
                    <p>
                        <span>用户昵称：</span>
                        <span>{{userInfo.nickname}}</span>
                    </p>
                    <p>
                        <span>帐户余额：</span>
                        <span>{{userInfo.balance}}社区币</span>
                    </p>
                    <p>
                        <span>所在地区：</span>
                        <span>{{userInfo.province+userInfo.city}}</span>
                    </p>
                    <p>
                        <span>性别：</span>
                        <span>{{userInfo.sex}}</span>
                    </p>
                    <p>
                        <span>生日：</span>
                        <span>{{userInfo.birthday}}</span>
                    </p>
                    <p>
                        <span>个性签名：</span>
                        <span>{{userInfo.signature}}</span>
                    </p>
                </div>
                <div class="basic-edit" v-if="model.basic.edit">
                    <p>
                        <span>用户昵称：</span>
                        <span>
                            <Input v-model="userInfo.nickname" placeholder="请输入昵称" style="width: 235px"></Input>
                        </span>
                    </p>
                    <p>
                        <span>所在地区：</span>
                        <span>
                            <Input v-model="userInfo.province" placeholder="请输入" style="width: 235px"></Input>
                            <!-- <Select v-model="model8" clearable style="width:235px">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> -->
                        </span>
                        <span>
                            <Input v-model="userInfo.city" placeholder="请输入" style="width: 235px"></Input>
                            <!-- <Select v-model="model8" clearable style="width:235px">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> -->
                        </span>
                    </p>
                    <p class="sex">
                        <span>性别：</span>
                        <span>男</span>
                        <i-switch style="margin-top:4px;" @on-change="sexChange"></i-switch>
                        <span>女</span>
                    </p>
                    <p class="birth">
                        <span>生日：</span>
                        <span>
                            <DatePicker :placeholder="userInfo.birthday"  @on-change="dateChange"/>
                        </span>
                    </p>
                    <p class="autograph">
                        <span>个性签名：</span>
                        <textarea v-model="userInfo.signature"></textarea>
                    </p>
                    <p>
                        <span></span>
                        <span>
                            <Button type="primary" @click="updateUserInfo">保存</Button>
                            <Button @click="model.basic.info=true,model.basic.edit=false">返回</Button>
                        </span>
                    </p>
                </div>
            </div>
        </transition>
        <transition enter-active-class="animated fadeInRight">
            <div class="avatar" v-if="info.avatar">
                <h2>头像设置</h2>
                <div class="avatar-left">
                    <div class="upload">
                        <img src="../../../images/info/11.png" alt="">
                        <input type="file" ref='avatar' @change="upload('avatar')" accept="image/jpeg,image/png,image/gif">
                        <h5>添加图片</h5>
                        <h5>请选择一张图片上传为头像，</h5>
                        <h5>文件最大2MB</h5>
                    </div>
                    <Button  type="primary" @click="updateUserAvatar">确定</Button>
                    <Button>取消</Button>
                </div>
                <div class="avatar-right">
                    <h4>头像预览</h4>
                    <p>
                        <img :src="$api.url.baseURI+userInfo.avatar" alt="">
                        <span>100*100</span>
                    </p>
                    <p>
                        <img :src="$api.url.baseURI+userInfo.avatar" alt="">
                        <span>50*50</span>
                    </p>
                    <p>
                        <img :src="$api.url.baseURI+userInfo.avatar" alt="">
                        <span>30*30</span>
                    </p>
                </div>
            </div>
        </transition>
        <transition enter-active-class="animated fadeInRight">
            <div class="sure" v-if="info.sure">
                <h2>认证信息</h2>
                <div class="sure-info" v-if="model.sure.info">
                    <p>
                        <span>用户昵称：</span>
                        <span>{{userInfo.nickname}}</span>
                    </p>
                    <p>
                        <span>证件类型：</span>
                        <span>{{userInfo.idcard_type|idcardType}}</span>
                    </p>
                    <p>
                        <span>证件号码：</span>
                        <span>{{userInfo.idcard}}</span>
                    </p>
                    <p>
                        <span>证件正面照：</span>
                        <span>
                            <img :src="$api.url.baseURI+userInfo.idcard_face" alt="">
                        </span>
                    </p>
                    <p>
                        <span>证件反面照：</span>
                        <span>
                            <img :src="$api.url.baseURI+userInfo.idcard_back" alt="">
                        </span>
                    </p>
                    <p>
                        <span></span>
                        <span>
                            <Button  type="warning" v-if="model.sure.auth">审核中</Button>
                            <Button v-if="!model.sure.auth" type="success">已认证</Button>
                        </span>
                    </p>
                </div>
                <div class="sure-edit" v-if="model.sure.edit">
                    <p>
                        <span>真实姓名：</span>
                        <span>
                            <Input v-model="authInfo.true_name" placeholder="请输入真实姓名" style="width: 235px"></Input>
                        </span>
                    </p>
                    <p>
                        <span>证件类型：</span>
                        <span>
                              <Select v-model="authInfo.idcard_type" clearable style="width:235px">
                                <Option v-for="item in idcard_typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </span>
                    </p>
                    <p>
                        <span>证件号码：</span>
                        <span>
                             <Input v-model="authInfo.idcard" placeholder="请输入证件号码" style="width: 235px"></Input>
                        </span>
                    </p>
                    <p>
                        <span>证件正面照：</span>
                        <span>
                            <img :src="authInfo.idcard_face?$api.url.baseURI+authInfo.idcard_face:require('../../../images/iconfont/add-bank.png')" alt="">
                            <input type="file" ref='face' @change="upload('face')" accept="image/jpeg,image/png,image/gif">
                        </span>
                        <span class="info">请提交证件正面照片</span>
                    </p>
                    <p>
                        <span>证件反面照：</span>
                        <span>
                            <img :src="authInfo.idcard_back?$api.url.baseURI+authInfo.idcard_back:require('../../../images/iconfont/add-bank.png')" alt="">
                            <input type="file" ref='back' @change="upload('back')" accept="image/jpeg,image/png,image/gif">
                        </span>
                        <span class="info">请提交证件反面照片</span>
                    </p>
                    <p>
                        <span></span>
                        <span class="info">提交后，工作人员会在2个工作日内进行审核，只有审核通过后才可以进行提现等相关操作</span>
                    </p>
                    <p>
                        <span></span>
                        <span>
                            <Button type="primary" @click="setUerAuthentication">保存</Button>
                            <Button @click="model.sure.info=true,model.sure.edit=false">返回</Button>
                        </span>
                    </p>
                </div>
            </div>
        </transition>
        <transition enter-active-class="animated fadeInRight">
            <div class="account" v-if="info.account">
                <h2>账号绑定</h2>
                <div class="account-info" v-if="model.account.info">
                    <p>
                        <span>绑定QQ账号</span>
                        <span>未绑定</span>
                        <a @click="model.account.edit=true,model.account.info=false">绑定</a>
                    </p>
                    <p>
                        <span>绑定微信账号</span>
                        <span>已绑定</span>
                        <a>解绑</a>
                    </p>
                    <p>
                        <span>绑定邮箱</span>
                        <span>未绑定</span>
                        <a>绑定</a>
                    </p>
                </div>
                <div class="account-edit" v-if="model.account.edit">
                    <p>
                        <span>邮箱</span>
                        <span>
                            <input type="text" placeholder="请输入账号登陆密码">
                        </span>
                    </p>
                    <p>
                        <span></span>
                        <span class="info">确定后系统将会发送一封邮件到您的邮箱，请登录邮箱按提示操作</span>
                    </p>
                    <p>
                        <span></span>
                        <span>
                            <button>确定</button>
                        </span>
                    </p>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { getCookie } from "../../../js/cookie.js";
export default {
  props: {
    info: {
      basic: Boolean,
      avatar: Boolean,
      sure: Boolean,
      account: Boolean
    }
  },
  filters: {
    idcardType(value) {
      if (value == 1) {
        return "身份证";
      } else if (value == 2) {
        return "护照";
      } else if (value == 3) {
        return "港澳台胞证";
      }
    }
  },
  data() {
    return {
      access_user: "",
      model: {
        basic: {
          info: true,
          edit: false
        },
        avatar: true,
        sure: {
          info: false,
          edit: true,
          auth: false
        },
        account: {
          info: true,
          edit: false
        }
      },
      userInfo: {},
      authInfo: {
        true_name: "",
        idcard_type: "",
        idcard: "",
        password: "",
        idcard_face: "",
        idcard_back: ""
      },
      idcard_typeList: [
        {
          value: 1,
          label: "身份证"
        },
        {
          value: 2,
          label: "护照"
        },

        {
          value: 3,
          label: "港澳台胞证"
        }
      ]
    };
  },
  methods: {
    upload(type) {
      let inputDOM;
      if (type == "avatar") {
        inputDOM = this.$refs.avatar;
      } else if (type == "face") {
        inputDOM = this.$refs.face;
      } else if (type == "back") {
        inputDOM = this.$refs.back;
      }
      this.imgPreview(inputDOM.files[0], type);
    },
    imgPreview(file, type) {
      let self = this;
      let filename = file.name || "";
      let fileType = file.type || "";
      let token = getCookie("token");
      console.log(token);
      if (token == null || token == "") {
      } else {
        this.uploadUrl =
          this.$api.url.baseURI +
          this.$api.url.uploadImg +
          "?access_token=" +
          token +
          "&access_user=" +
          self.access_user;
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;
        if (/^image/.test(file.type)) {
          // 创建一个reader
          var reader = new FileReader();
          // 将图片将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function(e) {
            var base64 = e.target.result || this.result;
            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            formData.append(
              "image",
              self.convertBase64UrlToBlob(base64, fileType),
              filename
            );
            // 开始上传
            xhr.open("POST", self.uploadUrl, true);
            xhr.send(formData);
            xhr.onreadystatechange = function() {
              if (xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.response);
                if (data.code == 0) {
                  if (self.userInfo.image_id) {
                    self.userInfo.image_id.push(data.data.image_id);
                  }
                  if (type == "avatar") {
                    self.userInfo.avatar = data.data.save_name;
                  } else if (type == "face") {
                    self.authInfo.idcard_face = data.data.save_name;
                  } else if (type == "back") {
                    self.authInfo.idcard_back = data.data.save_name;
                  }
                }
              }
            };
          };
        }
      }
    },
    convertBase64UrlToBlob(urlData, filetype) {
      //去掉url的头，并转换为byte
      var bytes = window.atob(urlData.split(",")[1]);
      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      var i;
      for (i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {
        type: filetype
      });
    },
    sexChange(value) {
      if (value == false) {
        this.userInfo.sex = 1;
      } else {
        this.userInfo.sex = 2;
      }
    },
    dateChange(value) {
      this.userInfo.birthday = value;
    },
    getUserInfo(id) {
      let self = this;
      self.$http
        .post(self.$api.url.getUserInfo, {
          id: id
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            self.userInfo = res.data.data;
            sessionStorage.setItem(
              "user_info",
              escape(JSON.stringify(res.data.data))
            );
            if (
              self.userInfo.authentication_status == 0 ||
              self.userInfo.authentication_status == 2
            ) {
              self.model.sure.info = false;
              self.model.sure.edit = true;
              self.authInfo.true_name = self.userInfo.true_name;
              self.authInfo.idcard_type = self.userInfo.idcard_type;
              self.authInfo.idcard = self.userInfo.idcard;
              self.authInfo.idcard_face = self.userInfo.idcard_face;
              self.authInfo.idcard_back = self.userInfo.idcard_back;
            } else if (self.userInfo.authentication_status == 1) {
              self.model.sure.info = true;
              self.model.sure.edit = false;
              self.model.sure.auth = false;
            } else if (self.userInfo.authentication_status == 3) {
              self.model.sure.info = true;
              self.model.sure.edit = false;
              self.model.sure.auth = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateUserAvatar() {
      let self = this;
      self.$http
        .post(self.$api.url.updateUserInfo, {
          id: self.userInfo.id,
          avatar: self.userInfo.avatar,
          image_id: self.userInfo.image_id
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("上传成功");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateUserInfo() {
      let self = this;
      self.$http
        .post(self.$api.url.updateUserInfo, {
          id: self.userInfo.id,
          nickname: self.userInfo.nickname,
          province: self.userInfo.province,
          city: self.userInfo.city,
          sex: self.userInfo.sex,
          birthday: self.userInfo.birthday,
          signature: self.userInfo.signature
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("保存成功");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 认证信息
    setUerAuthentication() {
      let self = this;
      self.$http
        .post(self.$api.url.setUerAuthentication, {
          id: self.userInfo.id,
          true_name: self.authInfo.true_name,
          idcard_type: self.authInfo.idcard_type,
          idcard: self.authInfo.idcard,
          idcard_face: self.authInfo.idcard_face,
          idcard_back: self.authInfo.idcard_back
        })
        .then(res => {
          if (res.data.code == 0) {
            self.$Message.success("提交成功");
            self.model.sure.info = true;
            self.model.sure.edit = false;
            self.model.sure.auth = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (this.$route.query.basic == "edit") {
      this.model.basic.info = false;
      this.model.basic.edit = true;
    }
    if (sessionStorage.getItem("access_user")) {
      this.access_user = sessionStorage.getItem("access_user");
      this.getUserInfo(this.access_user);
    }
  }
};
</script>