import axios from 'axios'
import router from '../router/index'
import Vue from 'vue'
import iView from 'iview'
import Qs from 'qs'
import {
  getCookie,
  setCookie
} from './cookie.js'
import API from './API'
const api = new API()
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  // iView.Spin.show()
  const token = getCookie('token')
  let accessUser
  if (sessionStorage.getItem('access_user')) {
    accessUser = unescape(sessionStorage.getItem('access_user'))
  }
  config.data = Qs.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  if (token) {
    config.params = {
      access_token: token,
      access_user: accessUser
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(
  response => {
    // setTimeout(() => {
    //   iView.Spin.hide()
    if (response.data.code === -1) {
      iView.Message.error(response.data.msg)
    } else {
      return response
    }
  },
  err => {
    return Promise.reject(err)
  })
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getCookie('token')
  if (!token) {
    axios.post(axios.defaults.baseURL + api.url.getToken, {
      client_id: api.appConfig.client_id,
      client_secret: api.appConfig.client_secret
    })
      .then(res => {
        if (res.data.code === 0) {
          setCookie('token', res.data.access_token, res.data.expired)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  next()
})
router.afterEach(route => {
  iView.LoadingBar.finish()
})
export default axios
