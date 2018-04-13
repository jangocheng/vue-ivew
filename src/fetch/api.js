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
  loginMobile (params) {
    return fetch('index/Web/login_mobile', params)
  },
  loginEmail (params) {
    return fetch('index/Web/login_email', params)
  },
  loginCode (params) {
    return fetch('index/Web/login_code', params)
  },
  register (params) {
    return fetch('index/Webuser/set_info', params)
  },
  sendRegisterEmail (params) {
    return fetch('index/Email/send_register', params)
  },
  getHomeIndex () {
    return fetch('index/Web/index')
  },
  getAllSymbolList () {
    return fetch('index/web/get_all_symbol')
  },
  getTradesUserList () {
    return fetch('index/Websignal/get_trades_user_list')
  },
  getMTList () {
    return fetch('index/Webuser/get_signal_list')
  },
  getSignalAllList (params) {
    return fetch('index/web/get_signal_daily_summary', params)
  },
  getSignalSymbol (params) {
    return fetch('index/Webuser/get_signal_symbol', params)
  },
  setDocumentaryInfo (params) {
    return fetch('index/Webuser/set_documentary_info', params)
  },
  getDocumentaryInfo (params) {
    return fetch('index/Webuser/get_documentary_info', params)
  },
  deleteDocumentaryData (params) {
    return fetch('index/Webuser/delete_documentary_data', params)
  },
  setCollectInfo (params) {
    return fetch('blog/Web/set_collect_info', params)
  }
}
