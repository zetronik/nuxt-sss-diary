<template>
  <h1>logout</h1>
</template>

<script>
    export default {
        middleware: ['admin-auth'],
        async beforeCreate() {
            await this.$auth.logout()
            this.$router.push('/login')
        }
    }
</script>

<style scoped>

</style>
