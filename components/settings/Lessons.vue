<template>
    <el-row>
        <el-col class="lessons" v-for="(day, i) in weekLesson" :xs="24" :sm="12" :md="8" :lg="8" :xl="8" :key="i">
            <p>{{week[i]}}</p>
            <div v-if="access">
                <el-input 
                    v-for="(less, index) in day.dayLesson"
                    v-model="day.dayLesson[index].lesson"
                    :value="less.lesson"
                    class="margin1"
                    :placeholder="index+1"
                    @change="diarySave(i, $event, index)"
                    :key="index">
                </el-input>
            </div>
            
            <div v-if="!access">
                <div class="lesson"
                    v-for="(less, index) in day.dayLesson"
                    :key="index"
                >
                    <p>{{less.lesson}}</p>
                </div>
                
            </div>
            
            <div v-if="access" class="title margin1">
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
            },
            access: {
                type: Boolean,
            }
        },
        data () {
            return {
                week: [
                    'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',
                ],
                lesson: {lesson: '', homework: []}
            }
        },
        methods: {
            diarySave (i, event, diary) {
                this.weekLesson[i].dayLesson[diary].lesson = event;
                this.$emit('changeLesson', this.weekLesson)
            },
            minusLesson (i) {
                if (this.weekLesson[i].dayLesson.length === 1) {
                    this.weekLesson[i].dayLesson[0] = {...this.lesson}
                } else {
                    this.weekLesson[i].dayLesson.pop()
                }
            },
            plusLesson (i) {
                this.weekLesson[i].dayLesson.push({...this.lesson})
            },
        }
    }
</script>

<style lang="scss" scoped>
    .lessons {
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
    .lesson {
        border: 1px solid #757474;
        background-color: rgb(209, 205, 209);
        margin: 0.5rem;
        p {
            font-size: 1rem;
        }
    }
</style>


