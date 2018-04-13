<style lang="less" scoped>
@import "./info.less";
</style>
<template>
    <div class="info">
        <div class="info-left">
            <ul>
                <li>
                    <i>1</i>
                    <a>公司简介</a>
                </li>
                <li>
                    <i></i>
                    <a>关于我们</a>
                </li>
                <li>
                    <i></i>
                    <a>发展历程</a>
                </li>
                <li>
                    <i></i>
                    <a>联系我们</a>
                </li>
            </ul>
        </div>
        <div class="info-right">
            <div class="introduce" v-if="info.introduce">
                <div class="title">
                    <h2>公司简介</h2>
                </div>
                <div class="content">
                    <img src="../../images/footer/14.png" alt="">
                    <div>了解如何在 Adobe Photoshop 中使用 Creative Cloud Libraries。 Creative Cloud Libraries 是一种 Web 服务，它允许您在各种 Adobe
                        桌面和移动应用程序中访问您的资源。您可以在 Photoshop 中将图形、 颜色、文本样式和图层样式添加到库，然后在多个 Creative Cloud 应 用程序内轻松访问这些元素。在 Adob在
                        Adobe Photoshop 中使用 Typekit 字体，可为您的创意项目排版提供无限的可能性。 Photoshop 中使用字体，可为您的创意项目排版提供无限的可能性。了解如何在 Adobe
                        Photoshop 中使用 Creative Cloud Libraries。 Creative Cloud Libraries 是一种 Web 服务，它允许您在各种 Adobe 桌面和移动应用程序中访问您的资源。您可以在
                        Photoshop 中将图形、 颜色、文本样式和图层样式添加到库，然后在多个 Creative Cloud 应 用程序内轻松访问这些元素。在 Adob在 Adobe Photoshop 中使用
                        Typekit 字体，可为您的创意项目排版提供无限的可能性。 Photoshop 中使用字体，可为您的创意项目排版提供无限的可能性。了解如何在 Adobe Photoshop 中使用 Creative
                        Cloud Libraries。 Creative Cloud Libraries 是一种 Web 服务，它允许您在各种 Adobe 桌面和移动应用程序中访问您的资源。您可以在 Photoshop
                        中将图形、 颜色、文本样式和图层样式添加到库，然后在多个 Creative Cloud 应 用程序内轻松访问这些元素。在 Adob在 Adobe Photoshop 中使用 Typekit 字体，可为您的创意项目排版提供无限的可能性。
                        Photoshop 中使用字体，可为您的创意项目排版提供无限的可能性。
                    </div>
                </div>
            </div>
            <div class="about"></div>
            <div class="develop"></div>
            <div class="contact">
                <div class="title">
                    <h2>联系我们</h2>
                </div>
                <div class="content">
                    <ul>
                        <li>
                            <img src="../../images/footer/15.png" alt="">
             
                                <h4>上海公司</h4>
                                <p><i></i>电话：8888888888</p>
                                <p><i></i>邮箱：maxpro@maxpro.com</p>
                                <p><i></i>地址：上海市浦东新区东方路8号良丰大厦11楼</p>
   
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        introduce: false,
        about: false,
        develop: false,
        contact: false
      }
    };
  }
};
</script>
