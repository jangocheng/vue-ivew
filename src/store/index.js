import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import follow from './module/follow'
import home from './module/home'
import followSet from './module/followSet'
import followEdit from './module/followEdit'
import login from './module/login'
import register from './module/register'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user,
    follow,
    home,
    followSet,
    followEdit,
    login,
    register
  }
})
