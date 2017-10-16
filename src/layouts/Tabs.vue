<template>
    <el-tabs type="card" v-model="fullPath" @tab-click="onTabClick" v-if="menuList && menuList.length > 0"
             @tab-remove="removeTab" class="tables">
        <el-tab-pane v-for="(menu,index) in menuList" :label="menu.name" :name="menu.path" :key="index"
                     :closable="menu.name!=='首页'"></el-tab-pane>
    </el-tabs>
</template>

<script>
  export default {
    data () {
      return {
        fullPath: null
      }
    },
    computed: {
      menuList () {
        return this.$store.state.menus.menuList
      }
    },
    created () {
      this.fullPath = this.$route.fullPath
    },
    beforeDestroy () {},
    mounted () {},
    methods: {
      onTabClick (data) {
        this.$router.push({path: data.name})
      },
      removeTab (targetName) {
        let last = false
        let tabs = this.menuList
        let activeName = this.$route.fullPath
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.path === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.path
              } else {
                last = true
              }
            }
          })
        }
        if (!last) {
          this.$store.commit('REMOVE_MENU', targetName)
          this.$router.push({path: activeName})
        }
      }
    },
    watch: {
      $route () {
        this.fullPath = this.$route.fullPath
      }
    }
  }
</script>

<style lang="less">
    .tabs-contain {
        background-color: #fff;
    }
</style>
