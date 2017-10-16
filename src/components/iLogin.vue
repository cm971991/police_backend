<template>
    <div class="dmc-login-wrap" id="dvLoginDialog">
        <el-dialog v-model="showDialog" size="tiny"
                   :lock-scroll="false"
                   :modal="showMask"
                   :close-on-click-modal="false"
                   :show-close="false"
                   :close-on-press-escape="false" :custom-class="customClass">
            <transition enter-active-class="animated flipInY"
                        leave-active-class="animated flipOutY">
                <!--短信 + 验证码登录-->
                <div class="ms-login">
                    <div>
                        <el-form :model="loginModel" ref="loginModel" label-width="0" @keyup.native.enter="login">
                            <el-form-item label="">
                                <el-input placeholder="请填写登录手机号" v-model="loginModel.phone" :maxlength="11">
                                    <template slot="prepend"><i class="el-icon-information"></i></template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input placeholder="请填写收到的验证码" v-model="loginModel.smsCode" :maxlength="6">
                                    <template slot="prepend"><i class="el-icon-message"></i></template>
                                    <el-button slot="append"
                                               class="btn-send-code"
                                               type="primary"
                                               :disabled="disabledSend||stop"
                                               @click="sendCode" :loading="smsSendBtn.loading">
                                        <span>{{smsSendBtn.txt}}</span>
                                    </el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="btn-login" type="primary" @click="login" :disabled="!!errMsgSendLogin"
                                           :loading="loginBtn.loading">
                                    <span>{{loginBtn.txt}}</span>
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </transition>
        </el-dialog>
    </div>
</template>

<script>
  import login from '../pages/login/login'

  export default {
    props: {
      showMask: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
      return {
        uid: null,
        loginModel: {
          phone: '',
          smsCode: '',
          imgCode: ''
        },
        showDialog: true,
        closeModel: false,
        smsSendBtn: {
          txt: '发送验证码',
          loading: false
        },
        loginBtn: {
          txt: '登 录',
          loading: false
        },
        stop: false,
        smsCodeInterval: null,
        countDown: 60
      }
    },
    created () {
    },
    mounted () {
      this.$nextTick(() => {
        // 初始化vuex缓存数据
        if (!this.showMask) {
          this.$store.commit('MENU_INIT')
        }
        this.$store.commit('TOKEN_INIT')
      })
    },
    computed: {
      customClass () {
        return !this.showMask ? 'dialog-login top' : 'dialog-login'
      },
      disabledSend () {
        if (!this.loginModel.phone || this.loginModel.phone.length !== 11) {
          return true
        }
        return false
      },
      errMsgSend () {
        if (!this.$utils.Validate.chkFormat(this.loginModel.phone, 'phone')) {
          return '请输入正确的手机号'
        }
        return null
      },
      disabledLogin () {
        if (!this.loginModel.phone || this.loginModel.phone.length !== 11) {
          return true
        } else if (!this.loginModel.smsCode || this.loginModel.smsCode.length !== 6) {
          return true
        }
        return false
      },
      errMsgSendLogin () {
        if (!this.$utils.Validate.chkFormat(this.loginModel.phone, 'phone')) {
          return '请输入正确的手机号'
        }
        if (!this.$utils.Validate.chkFormat(this.loginModel.smsCode, 'code')) {
          return '请填写正确的短信验证码'
        }
        return null
      }
    },
    methods: {
      /**
       * 发送验证码
       */
      sendCode () {
        if (this.errMsgSend) {
          this.$notify.error({
            title: '错误',
            message: this.errMsgSend
          })
          return
        }
        this.smsSendBtn.loading = true
        this.smsSendBtn.txt = '发送中'
        login.sendSmsCode({
          phone: this.loginModel.phone
        }).then((res) => {
          setTimeout(() => {
            this.smsSendBtn.loading = false
            this.smsSendBtn.txt = '发送验证码'
            this.$notify({
              title: '成功',
              message: '短信验证码已发送',
              type: 'success'
            })
            // 倒计时开始
            this.startTime()
          }, 500)
        }).catch((ex) => {
          this.smsSendBtn.loading = false
          this.smsSendBtn.txt = '发送验证码'
        })
      },
      /**
       * 倒计时
       */
      startTime () {
        if (!this.stop) {
          this.stop = true
          this.smsCodeInterval = setInterval(() => {
            if (this.countDown <= 1) {
              this.stop = false
              this.countDown = 60
              this.smsSendBtn.txt = '发送验证码'
              clearInterval(this.smsCodeInterval)
              this.smsCodeInterval = null
            } else {
              this.smsSendBtn.txt = this.countDown + ' 秒后重试'
              this.countDown--
            }
          }, 1000)
        }
      },
      // 登录
      login () {
        if (this.errMsgSendLogin) {
          this.$notify.error({
            title: '错误',
            message: this.errMsgSendLogin
          })
          return
        }
        this.loginBtn.loading = true
        this.loginBtn.txt = '登录中'
        login.loginBySmsCode({
          phone: this.loginModel.phone,
          smsCode: this.loginModel.smsCode
        }).then(() => {
          this.loginBtn.loading = false
          this.loginBtn.txt = '登 录'
          if (this.showMask) {
            window.location.reload()
          } else {
            this.$emit('login-success')
          }
        }).catch(() => {
          this.loginBtn.loading = false
          this.loginBtn.txt = '登 录'
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../assets/style/comp/iLogin";
</style>
