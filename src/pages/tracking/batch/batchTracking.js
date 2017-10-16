// import Vue from 'vue'
import trackingApi from '../../../api/tracking_api'

export default {
  /**
   *  批量定位 查询
   * @returns {Promise}
   */
  queryBatchNumberFiles (body) {
    return new Promise((resolve, reject) => {
      trackingApi.queryBatchNumberFiles({...body},
        (res) => {
          resolve(res)
        },
        (ex) => {
          reject(ex)
        })
    })
  },
  /**
   * 批量导入
   * @param file
   * @returns {Promise}
   */
  importBatchNumberFile (file) {
    return new Promise((resolve, reject) => {
      trackingApi.importBatchNumberFile(file,
        (res) => {
          resolve(res)
        }, (ex) => {
          reject(ex)
        })
    })
  }
}
