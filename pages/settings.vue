<template>
  <el-container>
    <el-collapse class="accordion" v-model="activeName" accordion>
      <el-collapse-item title="Настройки пользователя" :name="1">
        <app-user :id="id"  :user="user" />
      </el-collapse-item>

      <el-collapse-item title="Смена почты и пароля" :name="2">
        <app-auth :id="id" />
      </el-collapse-item>

      <el-collapse-item title="Настройки школы" :name="3">
        <el-tabs v-model="activeTab">
          <el-tab-pane  v-if="!access" label="Присоеденится" name="join">
            <div v-if="schoolId" class="scholl-id">
              <p>ID: {{schoolId}}</p>
            </div>
            <app-join 
              :access="joinAccess"
              :schoolId="schoolId"
              :createSchool="createSchool"
              @schoolId="schoolId = $event"
              @school="createSchool = {...$event}"
            />
          </el-tab-pane>
          <el-tab-pane v-if="access" label="Создать класс" name="class">
            <div v-if="schoolId" class="scholl-id">
              <p>ID: {{schoolId}}</p>
            </div>
            <app-class :id="id" :createSchool="createSchool" @schoolId="schoolId = $event"/>
          </el-tab-pane>
          <el-tab-pane v-if="access" label="Создать школу" name="school">User</el-tab-pane>
          <el-tab-pane label="Настройки" name="settings">
            <app-settings :student="student" :access="access"/>
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>

      <el-collapse-item title="Расписание уроков" :name="4">
        <el-row>
          <el-col v-if="access" justify="center" :span="24">
            <el-button type="primary" @click="reload">Обновить</el-button>
            <el-button type="success" @click="save">Записать</el-button>
          </el-col>
        </el-row>
        <app-lessons 
          :access="access"
          :weekLesson="weekLesson"
          @changeLesson="weekLesson = $event" />
      </el-collapse-item>

    </el-collapse>
  </el-container>
</template>

<script>
  import AppUser from '../components/settings/User'
  import AppAuth from '../components/settings/Auth'
  import AppLessons from '../components/settings/Lessons'
  import AppClass from '../components/settings/school/Class'
  import AppJoin from '../components/settings/school/Join'
  import AppSettings from '../components/settings/school/Settings'
    export default {
      components: {
        'app-user': AppUser,
        'app-auth': AppAuth,
        'app-lessons': AppLessons,
        'app-class': AppClass,
        'app-join': AppJoin,
        'app-settings': AppSettings
      },
      middleware: ['admin-auth'],
      async asyncData ({store}) {
          const id = await store.getters['auth/getId'];
          const {user, school} = await store.dispatch('settings/fetchUser', id);
          console.log('user: ', user)
          console.log('school: ', school)
          return {user, school, id}
      },
      data () {
          return {
              activeName: 3,
              activeTab: 'join',
              schoolId: '',
              weekLesson: [
                  {dayLesson: [{lesson: '', homework: []}]},
                  {dayLesson: [{lesson: '', homework: []}]},
                  {dayLesson: [{lesson: '', homework: []}]},
                  {dayLesson: [{lesson: '', homework: []}]},
                  {dayLesson: [{lesson: '', homework: []}]},
                  {dayLesson: [{lesson: '', homework: []}]}
              ],
              userSettings: {
                name: '',
                surname: ''
              },
              createSchool: {
                school: '',
                level: '',
                group: ''
              },
              student: []
          }
      },
      mounted () {
        if (this.school.id) {
          this.schoolId = this.school.id
          this.createSchool.school = this.school.school
          this.createSchool.level = this.school.level
          this.createSchool.group = this.school.group
          this.weekLesson = this.school.weekLesson
          this.student = this.school.student
        }
        if (this.user) {
          this.userSettings = {...this.user}
        }
      },
      computed: {
        joinAccess () {
          if (this.userSettings.userId) {
            return true
          } else {
            return false
          }
        },
        access () {
          if (this.userSettings.userId) {
            if (this.school.adminId === this.userSettings.userId) {
            this.activeTab = 'class'
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        }
      },
      methods: {
        reload () {
          console.log(this.school)
        },
        async save () {
          try {
            const school = {
              id: this.school.id,
              weekLesson: this.school.weekLesson
            }
            const res = await this.$store.dispatch('settings/save', school)
            this.$message.success(res.message);
          } catch (error) {
            console.log(error)
          }
          
        }
      }
    }
</script>

<style lang="scss" scoped>
  .accordion {
    width: 100%;
  }
  .scholl-id {
    width: 100%;
    margin: 0 auto 2rem auto;
    padding: 1rem;
    background-color:#67C23A;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    p {
      text-align: center;
      font-size: 1rem;
    }
  }
</style>
