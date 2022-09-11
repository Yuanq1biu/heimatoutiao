import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// 1.下载
// - yarn add vuex-persistedstate@3.2.1
// 2.引入
// - import createPersistedState from 'vuex-persistedstate'
// 3.调用
// - plugins: [createPersistedState()]

// 方法1
// export default new Vuex.Store({
//   plugins: [createPersistedState()],
//   state: {
//     takenObj:
//       JSON.parse(window.localStorage.getItem('HEIMATOUTIAO_TOKEN')) || {}
//   },
//   getters: {},
//   mutations: {
//     SET_TOKEN(state, token) {
//       state.tokenobj = token
//       window.localStorage.setItem('HEIMATOUTIAO_TOKEN', JSON.stringify(token))
//     }
//   }
// })
// 方法2
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      // sorage: window.sessionStorage,
      reducer(state) {
        const { tokenObj } = state
        return { tokenObj }
      }
    })
  ],
  state: {
    tokenObj: {}
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  }
})
