import request from '@/utils/request'

/**
 *
 * @returns Promise
 */
export const getChannelAPI = () => {
  return request({
    url: 'v1_0/user/channels'
  })
}

/**
 *
 * @returns Promise
 */
export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
