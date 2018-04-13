// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import animate from 'animate.css'
import echarts from 'echarts'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../my-theme/index.less' // 修改主题
import {
  zh
} from './language/zh-CN.js'
import {
  en
} from './language/en-US.js'
import 'swiper/dist/css/swiper.css'
import './js/http'
import API from './js/API'
// 语言切换
import VueI18n from 'vue-i18n'
// 过滤器
import {
  formatDate,
  cmdFilter,
  currencys,
  timeStamp,
  sexFilter,
  percent
} from './js/filter'
import {
  Page,
  Select,
  Message,
  Table,
  DatePicker,
  Switch,
  Option,
  Input,
  Button,
  Modal,
  Spin,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Poptip,
  Badge,
  Icon
} from 'iview'
Vue.component('Page', Page)
Vue.component('Select', Select)
Vue.component('Message', Message)
Vue.component('Table', Table)
Vue.component('DatePicker', DatePicker)
Vue.component('i-switch', Switch)
Vue.component('Option', Option)
Vue.component('Input', Input)
Vue.component('Button', Button)
Vue.component('Modal', Modal)
Vue.component('Spin', Spin)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Checkbox', Checkbox)
Vue.component('Poptip', Poptip)
Vue.component('Badge', Badge)
Vue.component('Icon', Icon)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.prototype.$Spin = Spin
const api = new API()
// http请求组件
Vue.filter('formatDate', formatDate)
Vue.filter('currencys', currencys)
Vue.filter('cmdFilter', cmdFilter)
Vue.filter('timeStamp', timeStamp)
Vue.filter('sexFilter', sexFilter)
Vue.filter('percent', percent)
Vue.prototype.$api = api
Vue.use(animate)
Vue.use(VueI18n)
Vue.use(VueAwesomeSwiper)
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': zh,
    'en': en
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#maxpro')
