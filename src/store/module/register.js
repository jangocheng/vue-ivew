import * as types from '../mutation-types'
import api from '../../fetch/api'
import iView from 'iview'
// initial state
const state = {
  model: false
}

// getters
const getters = {}

// actions
const actions = {
  registerModel ({
    commit
  }, product) {
    commit(types.REGISTERMODEL, product)
  },
  register ({
    commit
  }, payload) {
    api.register(payload).then(res => {
      if (res.data.code === 0) {
        iView.Message.success('注册成功！')
        commit(types.REGISTERMODEL, false)
      }
    })
  },
  sendRegisterEmail ({
    commit
  }, payload) {
    api.sendRegisterEmail(payload).then(res => {
      if (res.data.code === 0) {
        iView.Message.success('邮箱发送成功！请注意查收')
        commit(types.REGISTERMODEL, false)
      }
    })
  }
}

// mutations
const mutations = {
  [types.REGISTERMODEL] (state, product) {
    state.model = product
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
