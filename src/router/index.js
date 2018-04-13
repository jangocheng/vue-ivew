import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 首页
export const home = {
  path: '/',
  name: 'home',
  meta: {
    requireAuth: true
  },
  component: () =>
    import('@/view/home/home')
}
// 交易动态
export const dynamic = {
  path: '/maxpro/dynamic',
  name: 'dynamic',
  meta: {
    requireAuth: true
  },
  component: () =>
    import('@/view/dynamic/dynamic')
}
// 交易跟随
export const follow = {
  path: '/maxpro/follow',
  name: 'follow',
  meta: {
    requireAuth: true
  },
  component: () =>
    import('@/view/follow/follow')
}
// 在线理财
export const manage = {
  path: '/maxpro/manage',
  name: 'manage',
  meta: {
    requireAuth: true
  },
  component: () =>
    import('@/view/manage/manage')
}
// 信号源详情
export const signal = {
  path: '/maxpro/signal',
  name: 'signal',
  meta: {
    requireAuth: true
  },
  component: () =>
    import('@/view/signal/signal')
}
// 个人中心
export const center = {
  path: '/maxpro/center',
  name: 'center',
  meta: {
    requireAuth: true
  },
  component: () =>
    import('@/view/center/center')
}
// 微博
export const blog = [{
  path: '/maxpro/blog',
  redirect: '/maxpro/blog/other/index'
},
{
  path: '/maxpro/blog/other',
  redirect: '/maxpro/blog/other/index'
}, {
  path: '/maxpro/blog/my',
  redirect: '/maxpro/blog/my/index',
  component: () =>
      import('@/view/blog/my/my'),
  children: [{
    path: '/maxpro/blog/my/index',
    name: 'my-index',
    component: () =>
        import('@/view/blog/my/index')
  }, {
    path: '/maxpro/blog/my/article',
    name: 'my-article',
    component: () =>
        import('@/view/blog/my/article')
  }, {
    path: '/maxpro/blog/my/hot',
    name: 'my-hot',
    component: () =>
        import('@/view/blog/my/hot')
  }, {
    path: '/maxpro/blog/my/care',
    name: 'my-care',
    component: () =>
        import('@/view/blog/my/care')
  }, {
    path: '/maxpro/blog/my/mail',
    name: 'my-mail',
    component: () =>
        import('@/view/blog/my/mail')
  }, {
    path: '/maxpro/blog/my/comment',
    name: 'my-comment',
    component: () =>
        import('@/view/blog/my/comment')
  }, {
    path: '/maxpro/blog/my/detail',
    name: 'my-detail',
    component: () =>
        import('@/view/blog/my/detail')
  }, {
    path: '/maxpro/blog/my/praise',
    name: 'my-praise',
    component: () =>
        import('@/view/blog/my/praise')
  }, {
    path: '/maxpro/blog/my/collect',
    name: 'my-collect',
    component: () =>
        import('@/view/blog/my/collect')
  }]
}, {
  path: '/maxpro/blog/other/index',
  name: 'other-index',
  component: () =>
      import('@/view/blog/other/index')
}, {
  path: '/maxpro/blog/other/detail',
  name: 'other-detail',
  component: () =>
      import('@/view/blog/other/detail')
}
]

export const user = {
  path: '/maxpro/user',
  redirect: '/maxpro/user/info',
  component: () =>
    import('@/view/user/user'),
  children: [{
    path: '/maxpro/user/info',
    name: 'user-info',
    component: () =>
      import('@/view/user/info/info')
  }, {
    path: '/maxpro/user/trade',
    name: 'user-trade',
    component: () =>
      import('@/view/user/trade/trade')
  }, {
    path: '/maxpro/user/currency',
    name: 'user-currency',
    component: () =>
      import('@/view/user/currency/currency')
  }, {
    path: '/maxpro/user/pwd',
    name: 'user-pwd',
    component: () =>
      import('@/view/user/pwd/pwd')
  }]
}

export const company = [{
  path: '/maxpro/company/info',
  name: 'company-info',
  component: () =>
      import('@/view/company/info')
},
{
  path: '/maxpro/company/help',
  name: 'company-help',
  component: () =>
      import('@/view/company/help')
},
{
  path: '/maxpro/company/new',
  name: 'company-new',
  component: () =>
      import('@/view/company/new')
}
]
export default new Router({
  routes: [
    home,
    dynamic,
    follow,
    manage,
    signal,
    center,
    ...blog,
    user,
    ...company
  ]
})
