import { request } from '@/utils/request'
/**
 * @param {string} mobile
 * @param {Number} code
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 *
 * @param {String} mobile
 * @returns Promise
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 *
 * @returns Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}
