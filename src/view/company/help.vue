<style lang="less" scoped>
    @import "./help.less";
</style>
<template>
    <div class="help">
        <div class="title">
            <li v-for="(item,index) in typeTitle" :key="index">
                <a :style="typeIndex==index?typeActive:''" @click="typeIndex=index">{{item}}</a>
            </li>
        </div>
        <div class="content">
            <header>
                <a>如何注册？</a>
                <a>如何登录？</a>
                <a>如何绑定MT帐号</a>
                <a>如何跟随</a>
                <a>如何交易</a>
            </header>
            <section>
                <h4>第一条 模拟用户介绍</h4>
                <p>用户注册后即为模拟用户，可免费体验跟随交易和自主交易，以深度了解Maxpro创新的外汇社区交易模式。 模拟用户可在无任何风险的情况下，深度体验Maxpro跟随交易， 尝试设置不同的跟随策略和选择适合自己的交易员；还可利用虚拟资金体
                    验自主在线交易。模拟用户帐号的报价实时反映市场价格，体验和真实帐号基本一致。
                </p>
                <h4>第二条 注册模拟用户</h4>
                <p>进入Maxpro官网，点击“注册”按钮，可选择手机号注册和邮箱注册两种方式，也可直接通过社交帐号，如微信、QQ、微博，绑定帐号登录。 </p>
                <h5> 1)手机号注册： </h5>
                <p>第一步：输入手机号码、填写验证码、输入短信验证码、设置密码； </p>
                <p>第二步：设置用户昵称； </p>
                <p>第三步：选择交易喜好； </p>
                <p>第四步：选择跟随推荐交易员； </p>
                <p>第五步：注册成功。 </p>
                <h5>2)邮箱注册： </h5>
                <p>第一步：输入邮箱、设置密码、输入验证码；</p>
            </section>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeTitle: ["新手指南", "跟随策略", "平台政策"],
                typeActive: {
                    borderBottom: " 2px solid #0263ff",
                    color: "#0263ff"
                },
                typeIndex: 0
            };
        }
    };
</script>