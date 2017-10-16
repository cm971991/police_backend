/**
 * Created by hale on 2017年9月9日18:08:00.
 */

export default {
  getUrl: (action) => {
    // 线上环境使用真实api地址 开发环境使用axios进行跨域调用/policeApi/
    let url = process.env.NODE_ENV === 'production' ? 'http://v.js165.com/itracking/' : '/policeApi/'
    let actions = {
      // 发送短信验证码
      'sendSmsCode': () => {
        return url + 'sendSmsCode.view'
      },
      // 短信登录
      'loginBySmsCode': () => {
        return url + 'loginBySmsCode.view'
      },
      // 退出登录
      'loginOut': () => {
        return url + 'loginOut.view'
      },
      // 单个定位 查询
      'querySingleNumberPosition': () => {
        return url + 'querySingleNumberPosition.view'
      },
      // 单个定位 导出
      'downloadSingleQueryNumberResult': () => {
        return url + 'downloadSingleQueryNumberResult.view'
      },
      // 批量定位 查询
      'queryBatchNumberFiles': () => {
        return url + 'queryBatchNumberFiles.view'
      },
      // 批量定位 导出
      'downloadBatchQueryNumberResult': () => {
        return url + 'downloadBatchQueryNumberResult.view'
      },
      // 批量定位 导入
      'importBatchNumberFile': () => {
        return url + 'importBatchNumberFile.view'
      },
      // 日志 查询
      'queryOperateLogByPage': () => {
        return url + 'queryOperateLogByPage.view'
      }
    }
    return actions[action]()
  }
}
