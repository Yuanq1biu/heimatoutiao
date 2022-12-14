import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// css
import '@/assets/fonts/iconfont.css'
// vant
import Vant from 'vant'
import 'vant/lib/index.css'
// rem้้
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
