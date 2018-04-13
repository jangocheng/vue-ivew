import * as types from '../mutation-types'
import api from '../../fetch/api'
// initial state
const state = {
  model: false,
  MTList: [],
  singleId: ''
}
// getters
const getters = {
  MTList: state => state.MTList,
  singleId: state => state.singleId
}
// actions
const actions = {
  followSet ({
    commit
  }, product) {
    commit(types.FOLLOWSET, product)
  },
  getMTList ({
    commit
  }) {
    api.getMTList().then(res => {
      commit(types.GETMTLIST, res)
    })
  },
  // 获取信号源ID
  getSingleId ({
    commit
  }, product) {
    commit(types.GETSINGLEID, product)
  }
}

// mutations
const mutations = {
  [types.FOLLOWSET] (state, product) {
    state.model = product
  },
  [types.GETMTLIST] (state, res) {
    if (res.data.code === 0) {
      let arr = []
      res.data.data.map(v => {
        if (v.list) {
          arr.push(...v.list)
        }
      })
      state.MTList = arr
    }
  },
  [types.GETSINGLEID] (state, product) {
    state.singleId = product
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
