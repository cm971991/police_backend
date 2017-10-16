<template>
    <div v-if="menus" class="sidebar">
        <div class="dmc-user-info-bg">
        </div>
        <div class="dmc-user-info">
            <img class="user-icon" src="../assets/images/logo.png"/>
            <el-dropdown trigger="click" @command="handleCommand">
                <p>{{$store.state.auth.authInfo || '您好'}}<i class="el-icon-caret-bottom el-icon--right"></i></p>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="exit" divided>退 出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-menu :default-active="$route.fullPath" class="el-menu-vertical-demo" :router="false"
                 :unique-opened="true" @select="select">
            <div v-for="(menu, index) in menus" :key="index">
                <el-submenu :index="index.toString()">
                    <template slot="title">
                        <i class="axon-icon icon-size" v-if="menu.icon.indexOf('#')>-1" v-html="menu.icon"></i>
                        <i :class="menu.icon+' icon-size'" v-else></i>
                        <span>{{menu.name}}</span>
                    </template>
                    <template v-for="sub in menu.sub">
                        <el-menu-item :index="sub.link">{{sub.name}}</el-menu-item>
                    </template>
                </el-submenu>
            </div>
        </el-menu>
    </div>
</template>

<script>
  import api from '../api/login_api'

  export default {
    props: {
      menus: Array,
      required: true
    },
    data () {
      return {}
    },
    methods: {
      select (index) {
        this.$router.push({path: index})
      },
      handleCommand (command) {
        switch (command) {
          case 'exit':
            api.loginOut(() => {
              this.$store.commit('TOKEN_INIT')
              this.$router.push('/login')
            }, () => {
              this.$store.commit('TOKEN_INIT')
              this.$router.push('/login')
            })
            break
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
    .sidebar {
        display: block;
        position: absolute;
        width: 199px;
        left: 0;
        top: 0;
        bottom: 0;
        border-right: 1px solid #CCCCCC;
        .axon-icon {
            padding-right: 10px;
        }
        .dmc-user-info-bg {
            height: 120px;
            position: relative;
            display: block;
            overflow: hidden;
            background-image: url("../assets/images/menu.jpg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            text-align: center;
        }
        .dmc-user-info {
            position: absolute;
            top: 22px;
            left: 75px;
            text-align: center;
            color: #FFFFFF;
            .user-icon {
                width: 50px;
                height: 50px;
                border-radius: 50px;
                vertical-align: middle;
                border: 2px solid rgba(32, 160, 255, 0.5);
            }
            .el-autocomplete, .el-dropdown {
                color: #FFFFFF;
                font-size: 16px;
                display: block;
            }
            p {
                padding-top: 2px;
                cursor: pointer;
                i {
                    font-size: 6px;
                }
            }
        }
    }

    .sidebar > ul {
        height: 100%;
    }

    .icon-size {
        font-size: 16px;
    }

    .el-menu--dark {
        background-color: rgba(238, 241, 246, 0.9);
    }

    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        background-color: #20A0FF !important;
        color: #FFFFFF !important;
    }

    .el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover {
        color: #20A0FF;
        background-color: transparent;
        //background-color: rgba(32, 160, 255, 0.4);
    }

    .sidebar .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .sidebar .el-menu-item.is-active {
        color: #FFFFFF;
    }

    .el-menu--dark .el-submenu .el-menu {
        background-color: transparent;
    }

    .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        color: #20A0FF;
        background-color: transparent; //rgba(32, 160, 255, 0.4);
    }

    .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title {
        color: #333333;
    }

    .el-menu {
        .el-icon-menu {
            font-size: 16px;
        }
    }

    .el-submenu .el-menu-item {
        min-width: 0;
        p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
