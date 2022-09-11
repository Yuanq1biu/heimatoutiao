import request from '@/utils/request'

/**
 *
 * @param {String |Number} id
 * @param {Number} timestamp
 * @returns
 */
export const getAriticle = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
