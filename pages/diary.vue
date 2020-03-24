<template>
    <div class="wrap">
      <div class="diary-wrap mb">
        <span>
          <i class="el-icon-caret-left"></i>
        </span>

        <span>
          <i class="el-icon-caret-right"></i>
        </span>
      </div>
      <el-collapse class="accordion" v-model="activeName" accordion>
        <el-collapse-item v-for="(day, w) in diary"  :title="weeks[w]" :name="w+1" :key="w">
          <el-table
            border
            :data="day"
            style="width: 100%">

            <el-table-column label="Урок" >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.less }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Задание">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.work.lenght }}</span>
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
                  @click="handleEdit(scope.row.work)"
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

      </el-dialog>

    </div>
</template>

<script>
    export default {
        middleware: ['admin-auth'],
        data () {
            return {
                dialog: false,
                activeName: 1,
                diary: [
                    [
                        {less: 'Урок1', work: ''},
                        {less: 'Урок2', work: ''},
                        {less: 'Урок3', work: ''},
                        {less: 'Урок4', work: ''}
                    ],
                    [
                        {less: 'Урок1', work: ''},
                        {less: 'Урок2', work: ''},
                        {less: 'Урок3', work: ''},
                        {less: 'Урок4', work: ''}
                    ],
                    [
                        {less: 'Урок1', work: ''},
                        {less: 'Урок2', work: ''},
                        {less: 'Урок3', work: ''},
                        {less: 'Урок4', work: ''}
                    ],
                    [
                        {less: 'Урок1', work: ''},
                        {less: 'Урок2', work: ''},
                        {less: 'Урок3', work: ''},
                        {less: 'Урок4', work: ''}
                    ],
                    [
                        {less: 'Урок1', work: ''},
                        {less: 'Урок2', work: ''},
                        {less: 'Урок3', work: ''},
                        {less: 'Урок4', work: ''}
                    ],
                    [
                        {less: 'Урок1', work: ''},
                        {less: 'Урок2', work: ''},
                        {less: 'Урок3', work: ''},
                        {less: 'Урок4', work: ''}
                    ],
                ],
                weeks: ['Понедельлник','Вторник','Среда','Четверг','Пятница','Суббота']
            }
        },
        mounted () {
            const date = new Date().getDay();
            if (date !== 0) {
                this.activeName = date
            }
        },
        methods: {
            handleEdit () {
              this.dialog = true
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
</style>
