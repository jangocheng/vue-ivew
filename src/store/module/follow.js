import * as types from '../mutation-types'
import api from '../../fetch/api'
// initial state
const state = {
  follow_level: [{
    label: '交易大咖',
    value: 1
  },
  {
    label: '交易菜鸟',
    value: 2
  },
  {
    label: '所有交易员',
    value: ''
  }
  ],
  trade_time: [{
    label: '近一周有交易',
    value: 7
  },
  {
    label: '近两周有交易',
    value: 14
  }, {
    label: '近一月有交易',
    value: 30
  }
  ],
  tradeFollowList: []
}

// getters
const getters = {
  tradeFollowList: state => state.tradeFollowList
}

// actions
const actions = {
  getSignalAllList ({
    commit
  }, payload) {
    api.getSignalAllList(payload).then(res => {
      if (res.data.code === 0) {
        commit(types.GETSIGNALALLLIST, res)
      }
    })
  }
}

// mutations
const mutations = {
  [types.GETSIGNALALLLIST] (state, res) {
    state.tradeFollowList = res.data.data.list
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
