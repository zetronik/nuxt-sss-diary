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
        <h2>Регистрация</h2>

        <el-form-item label="Логин" prop="login">
          <el-input v-model.trim="controls.login" />
        </el-form-item>

        <div class="mb2">
          <el-form-item label="Пароль" prop="password">
            <el-input type="password" v-model="controls.password" autocomplete="off"></el-input>
          </el-form-item>
        </div>

        <div class="mb2">
          <el-form-item label="Повторить пароль" prop="checkPass">
            <el-input type="password" v-model="controls.checkPass" autocomplete="off" />
          </el-form-item>
        </div>

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            round
            :loading="loading"
          >
            Регистрация
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
    export default {
        layout: 'empty',
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Введите пароль'));
                } else {
                    if (this.controls.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Повторите пароль'));
                } else if (value !== this.controls.password) {
                    callback(new Error('Два пароля не совпадают'));
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                controls: {
                    login: '',
                    password: '',
                    checkPass: ''
                },
                rules: {
                    login: [
                        { required: true, message: 'Введите логин', trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' },
                        { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            const {message} = this.$route.query;

            switch (message) {
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

                            await this.$store.dispatch('auth/createUser', formData);
                            this.$router.push('/login?message=auth')
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
