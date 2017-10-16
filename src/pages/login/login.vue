<template>
    <div class="login-wrap">
        <!--<div class="login-header">-->
            <!--<img class="login-header-logo" src="../../assets/images/logo.png"/>-->
            <!--<div class="login-title">{{ systemConfig[0].project_name }}</div>-->
        <!--</div>-->
        <div class="login-main">
            <!--region 登录组件-->
            <iLogin :showMask="false" @login-success="$router.push('/single_tracking')"></iLogin>
            <!--endregion-->
        </div>
        <footer class="footer-login" v-if="false">
            <p>中国联通&nbsp;&nbsp;Copyright&nbsp;&nbsp;江苏分公司 版权所有</p>
        </footer>
    </div>
</template>

<script>
  import iLogin from '../../components/iLogin.vue'

  export default {
    components: {iLogin},
    data () {
      return {
//        systemConfig: require('../../assets/datas/system_config.json')
      }
    },
    created () {},
    computed: {},
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../assets/style/page/login";
</style>
