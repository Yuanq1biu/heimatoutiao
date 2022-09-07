import axios from 'axios'
// axios.defaults.baseUrl = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000

export const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})
