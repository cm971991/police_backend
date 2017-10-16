<template>
    <div class="wrapper">
        <div class="sidebar-wrapper">
            <v-sidebar :menus="menus"></v-sidebar>
        </div>
        <Tabs></Tabs>
        <div class="content">
            <transition name="move" mode="out-in">
                <keep-alive>
                    <router-view class="main"></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
  import vSidebar from './SideBar.vue'
  import BreadCrumb from './BreadCrumb.vue'
  import Tabs from './Tabs.vue'

  export default {
    components: {
      vSidebar, BreadCrumb, Tabs
    },
    mounted () {
      this.$nextTick(() => {
        this.menus = this.$store.state.menus.userNavList
      })
    },
    data () {
      return {
        menus: null
      }
    },
    methods: {}
  }
</script>
<style lang="less" rel="stylesheet/less">
    @import "../assets/style/mixin";

    .wrapper {
        .sidebar-wrapper {
            .scrollBar()
        }
        .tables {
            z-index: 100;
            padding-top: 10px;
            height: 42px;
            margin-left: 200px;
            background: rgba(242, 242, 242, 0.8);
            .el-tabs__header {
                padding-left: 6px !important;
                .is-active {
                    background: #ffffff;
                }
            }
        }
    }
</style>
