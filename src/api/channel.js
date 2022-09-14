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
/**
 *
 * @param {Number|String} id
 * @returns Promise
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
/**
 *
 * @param {String|Number} id
 * @param {Number} seq
 * @returns Promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
