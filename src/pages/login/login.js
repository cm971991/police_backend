import loginApi from '../../api/login_api'
import menuJson from '../../assets/datas/menu.json'

export default {
  /**
   * 短信登陆
   * @param body
   * @returns {Promise}
   */
  loginBySmsCode (body) {
    return new Promise((resolve, reject) => {
      loginApi.loginBySmsCode({...body},
        (res) => {
          // 关闭登录框
          if (window.$globalHub.$store.state.login.loginDialogIsShow) {
            window.$globalHub.$store.commit('ADMIN_LOGIN', false)
          }
          // 保存token信息
          window.$globalHub.$store.commit('SET_TOKEN', res.token)
          // 设置菜单
          window.$globalHub.$store.commit('SET_USER_NAV_LIST', menuJson)
          resolve(menuJson)
        },
        (ex) => {
          reject(ex)
        })
    })
  },
  /**
   * 发送短信验证码
   * @param body
   * @returns {Promise}
   */
  sendSmsCode (body) {
    return new Promise((resolve, reject) => {
      loginApi.sendSmsCode({...body},
        (res) => {
          resolve(res)
        },
        (ex) => {
          reject(ex)
        })
    })
  },
  /**
   * 退出登录
   * @param body
   * @returns {Promise}
   */
  logOut () {
    return new Promise((resolve, reject) => {
      loginApi.logOut(
        (res) => {
          resolve(res)
        },
        (ex) => {
          reject(ex)
        })
    })
  }
}
