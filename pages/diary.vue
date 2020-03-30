<template>
    <div class="wrap">
      <dir v-if="diary">
        <div class="diary-wrap mb">
        <span>
          <i class="el-icon-caret-left" @click="pastWeeks"></i>
        </span>
        <p>{{dashWeeks}}</p>
        <span>
          <i class="el-icon-caret-right" @click="nextWeeks"></i>
        </span>
      </div>
      <div class="comtrol mb">
        <el-button type="primary" @click="writeIn" :disabled="access">Заполнить<i class="el-icon-s-order el-icon-right"></i></el-button>
        <el-button type="primary" @click="save">Сохранить<i class="el-icon-upload el-icon-right"></i></el-button>
      </div>
      <el-collapse class="accordion" v-model="activeName" accordion>
        <el-collapse-item v-for="(day, w) in diary"  :title="weeks[w]" :name="w+1" :key="w">
          <el-table
            border
            :data="day.dayLesson"
            style="width: 100%">

            <el-table-column align="center" label="Урок">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.lesson }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Задание">
              <template slot-scope="scope">
                <i v-for="n in scope.row.homework.length" class="el-icon-s-management" :key="n"></i>
                <!-- <span style="margin-left: 10px">{{ scope.row.homework.length }}</span> -->
              </template>
            </el-table-column>

            <el-table-column
              width="60px"
              align="right"
            >
              <template slot-scope="scope">
                <el-button
                  circle
                  type="primary"
                  size="medium"
                  @click="editDialog(scope.row.homework, scope.row.lesson, w, scope.$index)"
                  icon="el-icon-edit"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      
      

      <el-dialog
        title="Задание"
        :visible.sync="dialog"
        fullscreen
        class="dialog"
        >
        <el-input
          class="mb"
          v-model="less"
          :disabled="access">
        </el-input>

        <span>
          <el-card shadow="hover" class="mb" v-for="(item, i) in work" :key="i">
            
            <p class="mb">{{item.work}}</p>
            <div class="mb">
              <time class="time">{{item.name}}</time>
              <time class="time">{{new Date(item.date).toLocaleString() }}</time>
            </div>
            
            <div v-if="user._id === item.id" class="btn">
              <el-button type="primary" icon="el-icon-edit" circle plain @click="editHomework(i)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle plain @click="delHomework(i)"></el-button>
            </div>
            
          </el-card>
          <el-input
            class="mb"
            type="textarea"
            :rows="2"
            placeholder="Please input"
            v-model="homework"
          >
          </el-input>
          <el-button type="success" plain @click="saveHomework(homework)">Сохранить</el-button>
          <el-button type="danger" plain @click="clearHomework">Очистить</el-button>
        </span>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveDialog">Сохранить</el-button>
        </span>
      </el-dialog>
      </dir>
      <div v-else class="school">
        <p>Сначала зарегестрируйте класс или присоеденитесь к классу</p>
      </div>
    </div>
</template>

<script>
  const date = new Date();
  const week = date.getDay();
  const startDay = new Date((date - (86400000*(week - 1))));
  const year = new Date(startDay.valueOf()).getFullYear();
  const month = new Date(startDay.valueOf()).getMonth();
  let hour = 0;
  if (new Date(year, 6,1,0,0,0,0).getTimezoneOffset() - date.getTimezoneOffset() === 60) {
    hour = 1
    } else {
      if (new Date(year, 6,1,0,0,0,0).getTimezoneOffset() === date.getTimezoneOffset()) {
        hour = 1
      }
    }
  const start = new Date(year, month, startDay.getDate(), hour,0,0,0).valueOf();

  export default {
    head () {
      return {
        title: `Мой дневник | ${process.env.appName}`
      }
    },
    middleware: ['admin-auth'],
    async asyncData ({store}) {
          const {diary, user, student } = await store.dispatch('diary/fetchDiary', start)
          return {diary, user, student}
      },
    data () {
      return {
        homework: '',
        dashWeeks: null,
        start: start,
        date: null,
        dialog: false,
        activeName: 1,
        weeks: ['Понедельлник','Вторник','Среда','Четверг','Пятница','Суббота'],
        day: null,
        index: null,
        less: '',
        work: {}
    }
      },
      mounted () {
        const activeDate = new Date().getDay();
        if (activeDate !== 0) {
            this.activeName = activeDate
        }
        const date = Date.now();
        this.date = new Date(date);
        const week = this.date.getDay();

        const startYear = new Date((date - (86400000*(week - 1)))).getFullYear();
        const endYear = new Date(date + (86400000*(7 - week))).getFullYear();

        let startMonth = new Date((date - (86400000*(week - 1)))).getMonth() + 1;
        if (startMonth < 10) {startMonth = '0' + startMonth}
        let endMonth = new Date(date + (86400000*(7 - week))).getMonth() + 1;
        if (endMonth < 10) {endMonth = '0' + endMonth}

        const startDay = new Date((date - (86400000*(week - 1)))).getDate();
        const endDay = new Date(date + (86400000*(7 - week))).getDate();
        this.dashWeeks = `${startDay}.${startMonth}.${startYear}-${endDay}.${endMonth}.${endYear}`;
      },
      computed: {
        access () {
          if (typeof this.student[0].access === 'string') {
            return false
          } else {
            if (this.student[0].access) {
              return false
            } else {
              return true
            }
          }
        }
      },
      methods: {
        delHomework (val) {
          this.work.splice(val, 1)
        },
        editHomework (val) {
            this.homework = this.work[val].work;
            this.delHomework(val)
        },
        saveHomework (val) {
          this.work.push({
              name: `${this.user.surname} ${this.user.name}`,
              work: val,
              date: Date.now(),
              id: this.user._id
          });
          this.clearHomework();
        },
        clearHomework () {
          this.homework = ''
        },
        async writeIn () {
          try {
            const diaty = await this.$store.dispatch('diary/writeIn')
            this.diary = diaty
            this.$message.success('Дневник заполнен')
          } catch (e) {
            console.log(e)
          }
        },
        async save () {
          try {
            const diary = {date: this.start, diary: this.diary}
            const res = await this.$store.dispatch('diary/save', diary)
            this.$message.success(res.message)
          } catch (e) {
            console.log(e)
          }
        },
        editDialog (homework, lesson, day, index) {
          this.work = [...homework]
          this.dialog = true
          this.less = lesson;
          this.day = day;
          this.index = index;
        },
        async saveDialog () {
          this.diary[this.day].dayLesson[this.index].homework = this.work;
          this.diary[this.day].dayLesson[this.index].lesson = this.less
          this.dialog = false
          this.save()
        },
        async pastWeeks () {
          const date = this.date.valueOf() - 604800000;
          this.date = new Date(date);
          const week = this.date.getDay();

          const startYear = new Date((date - (86400000*(week - 1)))).getFullYear();
          const endYear = new Date(date + (86400000*(7 - week))).getFullYear();

          let startMonth = new Date((date - (86400000*(week - 1)))).getMonth() + 1;
          if (startMonth < 10) {startMonth = '0' + startMonth}
          let endMonth = new Date(date + (86400000*(7 - week))).getMonth() + 1;
          if (endMonth < 10) {endMonth = '0' + endMonth}

          const startDay = new Date((date - (86400000*(week - 1)))).getDate();
          const endDay = new Date(date + (86400000*(7 - week))).getDate();

          this.start = this.start - 86400000*7;
          this.dashWeeks = `${startDay}.${startMonth}.${startYear}-${endDay}.${endMonth}.${endYear}`;
          const {diary} = await this.$store.dispatch('diary/fetchDiary', this.start)
          this.diary = [...diary]
        },
        async nextWeeks () {
          const date = this.date.valueOf() + 604800000;
          this.date = new Date(date);
          const week = this.date.getDay();

          const startYear = new Date((date - (86400000*(week - 1)))).getFullYear();
          const endYear = new Date(date + (86400000*(7 - week))).getFullYear();

          let startMonth = new Date((date - (86400000*(week - 1)))).getMonth()+1;
          if (startMonth < 10) {startMonth = '0' + startMonth}
          let endMonth = new Date(date + (86400000*(7 - week))).getMonth()+1;
          if (endMonth < 10) {endMonth = '0' + endMonth}

          const startDay = new Date((date - (86400000*(week - 1)))).getDate();
          const endDay = new Date(date + (86400000*(7 - week))).getDate();

          this.start = this.start + 86400000*7;
          this.dashWeeks = `${startDay}.${startMonth}.${startYear}-${endDay}.${endMonth}.${endYear}`;
          const {diary} = await this.$store.dispatch('diary/fetchDiary', this.start)
          this.diary = [...diary]
        }
      }
  }
</script>

<style lang="scss" scoped>
  .accordion {
    width: 100%;
  }
  .diary-wrap {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    span i {
      font-size: 4rem;
      color: #67C23A;
      cursor: pointer;
    }
  }
  .school {
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
  .time {
    font-size: 13px;
    color: #999;
  }
</style>
