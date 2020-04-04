<template>
<div class="login-wrap">
  <el-card
    shadow="always"
    style="max-width: 500px;min-width: 300px"
  >
    <el-tabs v-model="activeName" :stretch="true">
      <el-tab-pane label="Вход" name="login">
        <el-form
        :model="login"
        :rules="loginRules"
        ref="login"
        @submit.native.prevent="auth"
      >
        <el-form-item label="Логин" prop="login">
          <el-input v-model.trim="login.login" />
        </el-form-item>
        <div class="mb2">
          <el-form-item label="Пароль" prop="password">
            <el-input v-model.trim="login.password" type="password" />
          </el-form-item>
        </div>
        <el-form-item class="btn">
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
      </el-tab-pane>
      <el-tab-pane label="Регистрация" name="registration">
        <el-form
        :model="registration"
        :rules="registrationRules"
        ref="registration"
        @submit.native.prevent="registr"
      >
        <el-form-item label="Логин" prop="login">
          <el-input v-model.trim="registration.login" />
        </el-form-item>
        <div class="mb2">
          <el-form-item label="Пароль" prop="password">
            <el-input type="password" v-model="registration.password" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="mb2">
          <el-form-item label="Повторить пароль" prop="checkPass">
            <el-input type="password" v-model="registration.checkPass" autocomplete="off" />
          </el-form-item>
        </div>
        <el-form-item class="btn">
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
      </el-tab-pane>
    </el-tabs>
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
          const validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Введите пароль'));
            } else {
              if (this.registration.checkPass !== '') {
                this.$refs.registration.validateField('checkPass');
              }
              callback();
            }
            };
            const validatePass2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Повторите пароль'));
              } else if (value !== this.registration.password) {
                callback(new Error('Два пароля не совпадают'));
              } else {
                callback();
              }
          };
            return {
              activeName: 'login',
              loading: false,
              login: {
                login: '',
                password: ''
              },
              loginRules: {
                login: [
                  { required: true, message: 'Введите логин', trigger: 'blur' }
                ],
                password: [
                  { required: true, message: 'Введите пароль', trigger: 'blur' },
                  { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur' }
                ]
              },
              registration: {
                  login: '',
                  password: '',
                  checkPass: ''
                },
                registrationRules: {
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
          auth() {
            this.$refs.login.validate(async valid => {
              if (valid) {
                this.loading = true;
                try {
                  const formData = {
                    login: this.login.login,
                    password: this.login.password
                  };
                  await this.$store.dispatch('auth/login', formData);
                  this.$router.push('/diary')
                } catch (e) {
                    this.loading = false
                }
              }
            })
          },
          registr() {
            this.$refs.registration.validate(async valid => {
              if (valid) {
                this.loading = true;
                try {
                  const formData = {
                    login: this.registration.login,
                    password: this.registration.password
                  };
                  const res = await this.$store.dispatch('auth/createUser', formData);
                  this.$message.success(res.message);
                  this.loading = false
                  this.activeName = 'login'
                  this.login = {...formData}
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
  .btn {
    display: flex;
    justify-content: center;
  }
</style>
