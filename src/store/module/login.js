import * as types from '../mutation-types'
import api from '../../fetch/api'
import iView from 'iview'
// initial state
const state = {
  model: false,
  user: {
    info: {},
    statu: false
  }
}

// getters
const getters = {
  user: state => state.user
}

// actions
const actions = {
  loginModel({
    commit
  }, product) {
    commit(types.LOGINMODEL, product)
  },
  loginMobile({
    commit
  }, payload) {
    api.loginMobile(payload).then(res => {
      if (res.data.code === 0) {
        if (payload.remember === true) {
          localStorage.setItem('mobile', payload.mobile)
        } else {
          if (localStorage.getItem('mobile')) {
            localStorage.removeItem('mobile')
          }
        }
      }
      commit(types.USERINFO, res)
    })
  },
  loginEmail({
    commit
  }, payload) {
    api.loginEmail(payload).then(res => {
      if (res.data.code === 0) {
        if (payload.remember === true) {
          localStorage.setItem('email', payload.email)
        } else {
          if (localStorage.getItem('email')) {
            localStorage.removeItem('email')
          }
        }
      }
      commit(types.USERINFO, res)
    })
  },
  loginCode({
    commit
  }, payload) {
    api.loginCode(payload).then(res => {
      if (payload.remember === true) {
        localStorage.setItem('mobile', payload.mobile)
      } else {
        if (localStorage.getItem('mobile')) {
          localStorage.removeItem('mobile')
        }
      }
      commit(types.USERINFO, res)
    })
  }
}

// mutations
const mutations = {
  [types.LOGINMODEL](state, product) {
    state.model = product
  },
  [types.USERINFO](state, res) {
    if (res.data.code === 0) {
      state.user.info = res.data.data
      state.user.statu = true
      sessionStorage.setItem('access_user', res.data.data.id)
      sessionStorage.setItem(
        'user_info',
        escape(JSON.stringify(res.data.data))
      )
      state.model = false
      iView.Message.success('登录成功！')
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
