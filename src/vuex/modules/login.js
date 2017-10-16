// 该模块的初始状态
const state = {
  loginDialogIsShow: false
}

const mutations = {
  ADMIN_LOGIN (state, status) {
    state.loginDialogIsShow = status
  }
}

export default {
  state,
  mutations
}
