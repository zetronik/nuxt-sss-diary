<template>
  <div class="header">
    <span @click="drawer = true" class="menu-button">
      <i class="menu-icon el-icon-menu"></i>
    </span>
    <el-drawer
      size="200px"
      direction="ltr"
      :visible.sync="drawer"
      :with-header="false">
      <el-menu
        router
        @select="handleClick"
        :default-active="$route.path"
        class="nav-menu-vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span>Главная</span>
        </el-menu-item>

        <el-menu-item v-if="!isLogin" index="/login">
          <i class="el-icon-key"></i>
          <span>Войти</span>
        </el-menu-item>

        <el-menu-item v-if="isLogin" index="/diary">
          <i class="el-icon-reading"></i>
          <span>Дневник</span>
        </el-menu-item>

        <el-menu-item v-if="isLogin" index="/settings">
          <i class="el-icon-setting"></i>
          <span>Настройки</span>
        </el-menu-item>

        <el-menu-item v-if="isLogin" @click="logout">
          <i class="el-icon-switch-button"></i>
          <span>Выход</span>
        </el-menu-item>

      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                drawer: false
            };
        },
        computed: {
            isLogin () {
              return this.$auth.loggedIn
            }
        },
        methods: {
            handleClick () {
                this.drawer = !this.drawer
            },
            async logout () {
              await this.$auth.logout()
              this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 3.5rem;
    background-color: #409EFF;
  }
  .menu-button {
    position: relative;
    top: 8px;
    left: 5px;
    cursor: pointer
  }
  .menu-icon {
    font-size: 2.5rem;
    color: #FFF;
  }
  .nav-menu-vertical {
    height: 100%;
    width: 250px;
  }
</style>
