<template>
  <div class="footer_">
    <div class="footer_-content">
      <h6>风险提示：仅为外汇投资者提供跟单服务，资料显示与对交易信息的使用均为用户自主行为，大概率社区不对行为结果负责</h6>
      <ul class="list">
        <li>
          <h4 @click="$router.push('/maxpro/company/info')">关于我们</h4>
          <p>
            <span>公司简介</span>
            <span>合作伙伴</span>
          </p>
          <p>
            <span>产品介绍</span>
            <span @click="$router.push('/maxpro/company/new')">新闻动态</span>
          </p>
          <p>
            <span>联系我们</span>
            <span>关于我们</span>
          </p>
        </li>
        <li>
          <h4 @click="$router.push('/maxpro/company/help')">帮助中心</h4>
          <p>
            <span>新手指南</span>
            <span>常见问题</span>
          </p>
          <p>
            <span>跟随策略</span>
            <span>网站地图</span>
          </p>
          <p>
            <span>品种标准</span>
            <span>标签中心</span>
          </p>
        </li>
        <li>
          <h4>网站条款</h4>
          <p>
            <span>隐私政策</span>
            <span>常见问题</span>
          </p>
          <p>
            <span>服务条款</span>
            <span>社区守则</span>
          </p>
        </li>
        <li>
          <h4>联系我们</h4>
          <p>
            <span>邮箱：maxpro@maxpro.com</span>
          </p>
          <p>
            <span>电话：40040004000</span>
          </p>
        </li>
      </ul>
      <div class="info">
        <p>
          <span>友情链接：</span>
          <a>前瞻数据库</a>
          <a>惠普财经</a>
          <a>外汇</a>
          <a>FXStreet中文网</a>
          <a>一起学外汇</a>
          <a>证券之星</a>
          <a>外汇交易</a>
          <a>环球外汇网</a>
          <a>金汇彩金</a>
          <a>趋势财经</a>
          <a>快讯通财金</a>
          <a>TradingView</a>
        </p>
        <p>Copyright &copy; 2018 FollowME Limited 版权所有</p>
      </div>
    </div>
  </div>
</template>