import * as types from '../mutation-types'
// initial state
const state = {
  info: null
}

// getters
const getters = {}

// actions
const actions = {
  userInfo ({
    commit,
    state
  }, products) {
    console.log(products)
    commit(types.USER, {
      products
    })
  }
}

// mutations
const mutations = {
  [types.USER] (state, {
    products
  }) {
    state.info = products.info
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
