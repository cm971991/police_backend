<template>
  <div class="bc-contain" v-if="menus">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbList">
        <el-breadcrumb-item :to="item.to">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default{
    props: {
      menus: Array,
      required: true
    },
    computed: {
      breadcrumbList () {
        let list = []
        if (this.menus) {
          for (let i in this.menus) {
            let sub = this.menus[i].sub.find(x => this.$route.meta.alias === x.name)
            if (sub) {
              list.push({name: this.menus[i].name})
              list.push({name: sub.name, to: {path: sub.link}})
              if (this.$route.meta.subAlias) {
                list.push({name: this.$route.meta.subAlias})
              }
            }
          }
        }
        return list
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .bc-contain {
    margin-top: 5px;
    margin-bottom: 15px;
  }
</style>
