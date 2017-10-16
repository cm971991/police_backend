import Vue from 'vue'
import url from './api_config'

export default {
  /**
   * 单个定位 查询
   * @param body
   * @param cb
   * @param errorCb
   */
  querySingleNumberPosition (body, cb, errorCb) {
    Vue.$api.xHttp.post(url.getUrl('querySingleNumberPosition'), {
      phone: body.phone,
      pageNo: body.pageNo,
      pageSize: body.pageSize
    }).then((res) => {
      cb(res)
    }).catch((ex) => {
      errorCb(ex)
    })
  },
  /**
   * 批量定位 查询
   * @param cb
   * @param errorCb
   */
  queryBatchNumberFiles (body, cb, errorCb) {
    Vue.$api.xHttp.post(url.getUrl('queryBatchNumberFiles'), {
      pageNo: body.pageNo,
      pageSize: body.pageSize
    }).then((res) => {
      cb(res)
    }).catch((ex) => {
      errorCb(ex)
    })
  },
  /**
   * 单个定位 导出
   * @param body
   * @param cb
   * @param errorCb
   */
  downloadSingleQueryNumberResult (body, cb, errorCb) {
    Vue.$api.xHttp.post(url.getUrl('downloadSingleQueryNumberResult'), {
      phone: body.phone
    }).then((res) => {
      cb(res)
    }).catch(() => {
      errorCb()
    })
  },
  /**
   * 批量导入
   * @param file
   * @param cb
   * @param errorCb
   */
  importBatchNumberFile (file, cb, errorCb) {
    Vue.$api.xHttp.upload(url.getUrl('importBatchNumberFile'), file,
      {
        headers: {
          'Content-Type': 'multiple/form-data',
          'Authentication': window.$globalHub.$store.state.auth.token || ''
        }
      })
      .then((res) => {
        cb(res)
      })
      .catch((ex) => {
        errorCb(ex)
      })
  }
}
