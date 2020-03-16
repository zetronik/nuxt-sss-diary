<template>
  <h1>logout</h1>
</template>

<script>
    export default {
        middleware: ['admin-auth'],
        beforeCreate() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/')
        }
    }
</script>

<style scoped>

</style>
