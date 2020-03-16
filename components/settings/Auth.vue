<template>
  <div>
    <el-container class="mb2">
      <el-input placeholder="Сменить почту" class="mr" v-model.trim="email"></el-input>
      <el-button :loading="loadEmail" type="primary" @click="changeEmail">Сменить</el-button>
    </el-container>
    <el-container class="mb2">
      <el-input placeholder="Сменить пароль" class="mr" v-model.trim="pass" type="password"></el-input>
      <el-button :loading="loadPass" type="primary" @click="changePass">Сменить</el-button>
    </el-container>
  </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                loadEmail: false,
                loadPass: false,
                email: '',
                pass: '',
            }
        },
        methods: {
            async changeEmail () {
                const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
                const change = {
                    id: this.id,
                    login: this.email
                };
                if (reg.test(this.email)) {
                    try {
                        this.loadEmail = true;
                        await this.$store.dispatch('settings/changeEmail', change);
                        this.$message.success('Данные изменены');
                        this.loadEmail = false
                    } catch (e) {
                        this.$message.success('Введите корректный e-mail');
                        this.loadEmail = false
                    }
                } else {
                    this.$message.success('Введите корректный e-mail');
                }


            },
            async changePass () {
                this.loadPass = true;
                if (this.pass.length > 5) {
                    const change = {
                    id: this.id,
                    pass: this.pass
                    }
                    await this.$store.dispatch('settings/changePass', change);
                    this.$message.success('Пароль изменен');
                    this.loadPass = false;
                } else {
                    this.$message.success('Пароль долже быть больше 5 символов');
                    this.loadPass = false;
                }
             }
        }
    }
</script>

<style scoped>

</style>
