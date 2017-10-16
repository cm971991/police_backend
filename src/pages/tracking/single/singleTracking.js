import trackingApi from '../../../api/tracking_api'

export default {
  querySingleNumberPosition (body) {
    return new Promise((resolve, reject) => {
      trackingApi.querySingleNumberPosition({...body},
        (res) => {
          resolve(res)
        },
        (ex) => {
          reject(ex)
        })
    })
  },
  /**
   * 单个定位 导出
   * @param body
   * @returns {Promise}
   */
  downloadSingleQueryNumberResult (body) {
    return new Promise((resolve, reject) => {
      trackingApi.downloadSingleQueryNumberResult({...body},
        (res) => {
          resolve(res)
        }, (ex) => {
          reject(ex)
        })
    })
  }
}
