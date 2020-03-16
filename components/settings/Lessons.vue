<template>
    <el-row>
        <el-col class="lesson" v-for="(day, i) in weekLesson" :xs="24" :sm="12" :md="8" :lg="8" :xl="8" :key="i">
            <p>{{week[i]}}</p>
            <el-input 
                v-for="(less, index) in day.dayLesson"
                v-model="day.dayLesson[index].lesson"
                :value="less.lesson"
                class="margin1"
                @change="diarySave(i, $event, index)"
                :key="index">
            </el-input>
            <div class="title margin1">
                <el-button @click="minusLesson(i)" icon="el-icon-s-fold" circle></el-button>
                <el-button @click="plusLesson(i)" icon="el-icon-s-unfold" circle></el-button>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        props: {
            weekLesson: {
                type: Array,
                required: true
            }
        },
        data () {
            return {
                week: [
                    'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',
                ]
            }
        },
        methods: {
            diarySave (i, event, diary) {
                this.weekLesson[i].dayLesson[diary].lesson = event;
                this.$emit('changeLesson', this.weekLesson)
            },
            minusLesson (i) {
                if (this.weekLesson[i].dayLesson.length === 1) {
                    this.weekLesson[i].dayLesson[0] = {lesson: '', homework: ''}
                } else {
                    this.weekLesson[i].dayLesson.pop()
                }
            },
            plusLesson (i) {
                this.weekLesson[i].dayLesson.push({lesson: '', homework: ''})
            },
        }
    }
</script>

<style lang="scss" scoped>
    .lesson {
        padding: 5px;
        p {
            text-align: center;
            font-size: 1.5rem;
        }
        .title {
            display: flex;
            justify-content: space-between;
            align-content: center;
            
        }
        
    }
</style>


