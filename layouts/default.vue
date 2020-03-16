<template>
  <el-container>
    <el-header class="header">
      <app-header />
    </el-header>
    <el-main><nuxt /></el-main>
  </el-container>
</template>

<script>
  import AppHeader from '../components/Header'
  export default {
      components: {AppHeader},
      data() {
          return {
              drawer: false
          };
      },
  }
</script>

<style lang="scss" scoped>
  .header {
    padding: 0;
  }
</style>
