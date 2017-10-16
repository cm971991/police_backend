import logApi from '../../api/log_api'

export default {
  /**
   * 日志 查询
   * @param body
   * @returns {Promise}
   */
  queryOperateLogByPage (body) {
    return new Promise((resolve, reject) => {
      logApi.queryOperateLogByPage({...body},
        (res) => {
          resolve(res)
        }, (ex) => {
          reject(ex)
        })
    })
  }
}
