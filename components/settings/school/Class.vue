<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">

  <el-form-item prop="school" label="Ввести полное название школы">
    <el-input class="school" v-model="ruleForm.school"></el-input>
  </el-form-item>

  <div class="level">
    <el-form-item class="form" prop="level" label="Класс">
      <el-select class="select" v-model="ruleForm.level" placeholder="" value="">
        <el-option v-for="item in levels" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="form" prop="group" label="Группа">
      <el-select class="select" v-model="ruleForm.group" placeholder="" value="">
        <el-option v-for="item in groups" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
  </div>

  <el-form-item>
    <el-button :loading="loadingClass" type="primary" @click="onSubmit('ruleForm')">Записать</el-button>
    <el-button :loading="loadingDelete" type="danger" @click="dialog = true">Удалить</el-button>
  </el-form-item>

  <el-dialog
  title="Внимание!"
  :visible.sync="dialog"
  width="30%"
  center>
    <span>Вы действительно желаете удалить класс?</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="deleteClass">Удалить</el-button>
      <el-button @click="dialog = false">Отмена</el-button>
    </span>
  </el-dialog>

</el-form>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      createSchool: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        loadingClass: false,
        loadingDelete: false,
        dialog: false,
        schools: '',
        levels: [1,2,3,4,5,6,7,8,9,10,11,12],
        groups: ['А','Б','В','Г'],
        ruleForm: {
          school: '',
          level: '',
          group: ''
        },
          rules: {
            school: [
              { required: true, message: 'Пожалуйста, выбирите школу', trigger: 'focus' }
            ],
            level: [
              { required: true, message: 'Пожалуйста, выбирите класс', trigger: 'focus' }
            ],
            group: [
              { required: true, message: 'Пожалуйста, выбирите группу', trigger: 'focus' }
            ]
          }
      }
    },
    mounted () {
      if (this.createSchool) {
        this.ruleForm = this.createSchool
      }
    },
    methods: {
      onSubmit () {
        this.loadingClass = true
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            try {
              const formData = {
                school: this.ruleForm.school,
                level: this.ruleForm.level,
                group: this.ruleForm.group
              }
              const res = await this.$store.dispatch('settings/createClass', formData)
              if (res.id) {
                this.$emit('schoolId', res.id)
              }
              const {school, lesson, student} = await this.$store.dispatch('settings/fetchUser')
              this.$emit('fetchSchool', {school, lesson, student})
              this.$message.success(res.message);
              this.loadingClass = false
            } catch (error) {
              this.loadingClass = false
            }
          }
        })
        this.loadingClass = false
      },
      async deleteClass () {
        this.dialog = false
        this.loadingDelete = true
        try {
        const res = await this.$store.dispatch('settings/deleteClass')
        this.ruleForm = { school: '', level: '', group: ''}
        const id = ''
        this.$emit('schoolId', id)
        this.$emit('fetchSchool', {
                    school: null,
                    lesson: lesson = [
                    {dayLesson: [{lesson: '', homework: []}]},
                    {dayLesson: [{lesson: '', homework: []}]},
                    {dayLesson: [{lesson: '', homework: []}]},
                    {dayLesson: [{lesson: '', homework: []}]},
                    {dayLesson: [{lesson: '', homework: []}]},
                    {dayLesson: [{lesson: '', homework: []}]}
                    ], student: []})
        this.$message.success(res.message);
        this.loadingDelete = false
      } catch (error) {
        this.loadingDelete = false
      }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .school {
    width: 100%;
  }
  .level {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .form {
      width: 45%;
      .select {
        width: 100%;
      }
    }
  }
</style>
