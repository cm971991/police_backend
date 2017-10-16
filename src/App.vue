<template>
  <div id="app" style="height:100%;">
    <!--default slot-->
    <router-view></router-view>
    <!--登录框组件-->
    <iLogin v-if="LoginDialogIsShow"></iLogin>
  </div>
</template>

<script>
  import iLogin from './components/iLogin.vue'
  import { mapState } from 'vuex'
  export default {
    components: {iLogin},
    data () {
      return {}
    },
    computed: {
      ...mapState({
        LoginDialogIsShow: ({login}) => login.loginDialogIsShow
      })
    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./assets/style/main.less";
  @import "./assets/style/color-dark.css";
  @import "./assets/style/icon.css";
</style>
