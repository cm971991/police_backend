import Vue from 'vue'
import url from './api_config'

export default {
  /**
   * 短信登录
   * @param body
   * @param cb
   * @param errorCb
   */
  loginBySmsCode (body, cb, errorCb) {
    Vue.$api.xHttp.post(url.getUrl('loginBySmsCode'), {
      phone: body.phone,
      smsCode: body.smsCode
    }).then((res) => {
      cb(res)
    }).catch(() => {
      errorCb()
    })
  },
  /**
   * 发送短信验证码
   * @param phone
   * @param cb
   * @param errorCb
   */
  sendSmsCode (phone, cb, errorCb) {
    Vue.$api.xHttp.post(url.getUrl('sendSmsCode'), phone).then((res) => {
      cb(res)
    }).catch((ex) => {
      errorCb(ex)
    })
  },
  /**
   * 退出登录
   * @param cb
   * @param errorCb
   */
  loginOut (cb, errorCb) {
    Vue.$api.xHttp.post(url.getUrl('loginOut')).then((res) => {
      cb(res)
    }).catch((ex) => {
      errorCb(ex)
    })
  }
}
