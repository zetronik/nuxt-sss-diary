<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">

    <el-form-item label="Имя" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="Фамилия" prop="surname">
      <el-input v-model="ruleForm.surname"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :loading="loading" type="primary" @click="onSubmit('ruleForm')">Записать</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      user: {
        type: Object,
      }
    },
    data () {
      return {
        loading: false,
        ruleForm: {
          name: '',
          surname: ''
        },
        rules: {
          name: [
            { required: true, message: 'Пожалуйста, введите свое имя', trigger: 'blur' },
          ],
          surname: [
            { required: true, message: 'Пожалуйста, введите свою фамилию', trigger: 'blur' },
          ]
        }
      }
    },
    mounted () {
      if (this.user) {
        this.ruleForm.name = this.user.name;
        this.ruleForm.surname = this.user.surname;
      }
    },
    methods: {
      onSubmit() {
          this.$refs.ruleForm.validate(async valid => {
            if (valid) {
              this.loading = true;
              try {
                const formData = {
                  name: this.ruleForm.name,
                  surname: this.ruleForm.surname,
                  userId: this.id
                };
                const res = await this.$store.dispatch('settings/user', formData);
                this.$message.success(res.message);
                this.loading = false
              } catch (e) {
                this.loading = false
              }
            }
          })
        },
      }
    }
</script>

<style scoped>

</style>
