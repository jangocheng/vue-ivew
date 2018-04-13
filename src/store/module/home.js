import * as types from '../mutation-types'
import api from '../../fetch/api'
import iView from 'iview'
const state = {
  cooperationLogoList: [],
  blogList: [],
  starSignal: [],
  topSignal: [],
  bannerlist: [],
  companyList: [],
  symbolList: [],
  userTradeList: []
}

// getters
const getters = {
  cooperationLogoList: state => state.cooperationLogoList,
  starSignal: state => state.starSignal,
  topSignal: state => state.topSignal,
  bannerlist: state => state.bannerlist,
  companyList: state => state.companyList,
  symbolList: state => state.symbolList,
  userTradeList: state => state.userTradeList,
  blogList: state => state.blogList
}

// actions
const actions = {
  // 首页
  getHomeIndex({
    commit
  }) {
    api.getHomeIndex().then(res => {
      commit(types.GETHOMEINDEX, res)
    })
  },
  getAllSymbolList({
    commit
  }) {
    api.getAllSymbolList().then(res => {
      commit(types.GETALLSYMBOLLIST, res)
    })
  },
  getTradesUserList({
    commit
  }) {
    api.getTradesUserList().then(res => {
      commit(types.GETTRADESUSERLIST, res)
    })
  },
  setCollectInfo({
    commit
  }, payload) {
    api.setCollectInfo(payload).then(res => {
      if (res.data.code === 0) {
        if (res.data.data === 1) {
          iView.Message.success('关注成功')
        } else if (res.data.data === 2) {
          iView.Message.warning('取消关注成功！')
        }
      }
    })
  }
}
// mutations
const mutations = {
  [types.GETHOMEINDEX] (state, res) {
    if (res.data.code === 0) {
      let arr = []
      state.cooperationLogoList = res.data.data.cooperationLogoList
      state.starSignal = res.data.data.starSignal
      res.data.data.topSignal.map(v => {
        if (v.collect_id > 0) {
          arr.push({
            care_class: 'nocare',
            care_info: '取消关注',
            ...v
          })
        } else {
          arr.push({
            care_class: 'care',
            care_info: '关注',
            ...v
          })
        }

      })
      state.topSignal = arr
      state.bannerlist = res.data.data.bannerlist
      state.companyList = res.data.data.companyList
      state.blogList = res.data.data.blogList
    }
  },
  [types.GETALLSYMBOLLIST](state, res) {
    if (res.data.code === 0) {
      state.symbolList = res.data.data
    }
  },
  [types.GETTRADESUSERLIST](state, res) {
    if (res.data.code === 0) {
      state.userTradeList = res.data.data.list
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
