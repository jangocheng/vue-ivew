import axios from 'axios'
export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  // 登录
  // 手机号密码登录
  loginMobile (params) {
    return fetch('index/Web/login_mobile', params)
  },
  // 邮箱密码登录
  loginEmail (params) {
    return fetch('index/Web/login_email', params)
  },
  // 手机动态密码登录
  loginCode (params) {
    return fetch('index/Web/login_code', params)
  },
  // 手机注册
  register (params) {
    return fetch('index/Webuser/set_info', params)
  },
  // 邮箱注册
  sendRegisterEmail (params) {
    return fetch('index/Email/send_register', params)
  },
  // 获取home首页
  getHomeIndex () {
    return fetch('index/Web/index')
  },
  // 所有品种
  getAllSymbolList () {
    return fetch('index/web/get_all_symbol')
  },
  // 交易动态
  getTradesUserList () {
    return fetch('index/Websignal/get_trades_user_list')
  },
  // 获取MT列表
  getMTList () {
    return fetch('index/Webuser/get_signal_list')
  },
  // 跟随
  // 获取跟随页列表
  getSignalAllList (params) {
    return fetch('index/web/get_signal_daily_summary', params)
  },
  //  获取信号源品种
  getSignalSymbol (params) {
    return fetch('index/Webuser/get_signal_symbol', params)
  },
  // 设置跟随
  setDocumentaryInfo (params) {
    return fetch('index/Webuser/set_documentary_info', params)
  },
  // 获取跟随信息
  getDocumentaryInfo (params) {
    return fetch('index/Webuser/get_documentary_info', params)
  },
  // 取消跟随
  deleteDocumentaryData (params) {
    return fetch('index/Webuser/delete_documentary_data', params)
  },
  //  博客
  // 关注
  setCollectInfo (params) {
    return fetch('blog/Web/set_collect_info', params)
  }
}
