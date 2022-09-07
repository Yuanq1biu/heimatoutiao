import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenobj = token
    }
  }
})
