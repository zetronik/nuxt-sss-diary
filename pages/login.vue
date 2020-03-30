<template>
  <div class="login-wrap">
    <el-card
      shadow="always"
      style="max-width: 500px;min-width: 300px"
    >
      <el-form
        :model="controls"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"

      >
        <h2>Войти</h2>

        <el-form-item label="Логин" prop="login">
          <el-input v-model.trim="controls.login" />
        </el-form-item>

        <div class="mb2">
          <el-form-item label="Пароль" prop="password">
            <el-input v-model.trim="controls.password" type="password" />
          </el-form-item>
        </div>

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            round
            :loading="loading"
          >
            Войти
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
    export default {
        head () {
          return {
              title: `Вход | ${process.env.appName}`
          }
        },
        layout: 'empty',
        data() {
            return {
                loading: false,
                controls: {
                    login: '',
                    password: ''
                },
                rules: {
                    login: [
                        { required: true, message: 'Введите логин', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Введите пароль', trigger: 'blur' },
                        { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            const {message} = this.$route.query;

            switch (message) {
                case 'auth':
                    this.$message.success('Теперь войдите в систему');
                    break;
                case 'login':
                    this.$message.info('Для начала войдите в систему');
                    break;
                case 'logout':
                    this.$message.success('Вы успешно вышли из системы');
                    break;
                case 'session':
                    this.$message.warning('Время сессии истекло, пожалуйста зайдите заного');
                    break
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true;

                        try {
                            const formData = {
                                login: this.controls.login,
                                password: this.controls.password
                            };

                            await this.$store.dispatch('auth/login', formData);
                            this.$router.push('/')

                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .login-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
