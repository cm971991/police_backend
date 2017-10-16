import Vue from 'vue'
import url from './api_config'

export default {
  /**
   * 日志查询
   * @param body
   * @param cb
   * @param errorCb
   */
  queryOperateLogByPage (body, cb, errorCb) {
    Vue.$api.xHttp.post(url.getUrl('queryOperateLogByPage'), {
      operatorPhone: body.operatorPhone,
      pageNo: body.pageNo,
      pageSize: body.pageSize
    }).then((res) => {
      cb(res)
    }).catch(() => {
      errorCb()
    })
  }
}
