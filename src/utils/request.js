import axios from 'axios'
import store from '@/store'

// axios.defaults.baseUrl = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000

export const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

request.interceptors.request.use(
  function (config) {
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default request
