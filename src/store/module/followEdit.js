import * as types from '../mutation-types'
import api from '../../fetch/api'
import iView from 'iview'
// initial state
const state = {
  model: false,
  documentaryInfo: {},
  signalSymbolList: []
}
// getters
const getters = {
  documentaryInfo: state => state.documentaryInfo,
  signalSymbolList: state => state.signalSymbolList
}

// actions
const actions = {
  followEdit({
    commit
  }, product) {
    commit(types.FOLLOWEDIT, product)
  },
  // 设置跟随
  setDocumentaryInfo({
    commit
  }, payload) {
    api.setDocumentaryInfo(payload).then(res => {
      if (res.data.code === 0) {
        iView.Message.success('跟随成功！')
        commit(types.GETDOCUMENTARYINFO, res)
      }
    })
  },
  // 取消跟随
  deleteDocumentaryData({
    commit
  }, payload) {
    console.log(payload)
    api.deleteDocumentaryData(payload).then(res => {
      if (res.data.code === 0) {
        iView.Message.success('取消跟随成功！')
      }
    })
  },
  //  获取跟随信息
  getDocumentaryInfo({
    commit
  }, payload) {
    api.getDocumentaryInfo(payload).then(res => {
      if (res.data.code === 0) {
        commit(types.GETDOCUMENTARYINFO, res)
      }
    })
  },
  // 获取信号源品种
  getSignalSymbol({
    commit
  }, payload) {
    api.getSignalSymbol(payload).then(res => {
      if (res.data.code === 0) {
        commit(types.GETSIGNALSYMBOL, res)
      }
    })
  }
}

// mutations
const mutations = {
  [types.FOLLOWEDIT](state, product) {
    state.model = product
  },
  [types.GETDOCUMENTARYINFO](state, res) {
    state.documentaryInfo = res.data.data
  },
  [types.GETSIGNALSYMBOL](state, res) {
    state.signalSymbolList = res.data.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
