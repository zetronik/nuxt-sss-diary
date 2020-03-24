<template>
    <el-row>
        <el-col :span="24">
            <el-form v-if="!schoolId" :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">
                <el-form-item prop="id" label="Ввести ID школы или класса">
                    <el-input v-model="ruleForm.id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loadingSerch" type="primary" @click="serch('ruleForm')">Найти</el-button>
                </el-form-item>
            </el-form>
            <el-card v-if="createSchool.school" class="box-card">
                <div class="text item">
                    <h4>Название: {{createSchool.school}}</h4>
                </div>
                <div class="text item">
                    <h4>Класс: {{createSchool.level}}{{createSchool.group}} </h4>
                </div>
                <div>
                    <el-button :loading="loadingJoin" type="primary" @click="join">Присоеденится</el-button>
                    <el-button :loading="loadingJoin" type="danger" @click="dialog = true">Покинуть</el-button>
                </div>
            </el-card>
            <el-dialog
                title="Внимание!"
                :visible.sync="dialog"
                width="30%"
                center>
                    <span>Вы действительно желаете покинуть класс?</span>
                    <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="delJoin">Удалить</el-button>
                    <el-button @click="dialog = false">Отмена</el-button>
                    </span>
            </el-dialog>
        </el-col>
    </el-row>
    
</template>

<script>
export default {
    props: {
        schoolId: {
            type: String,
            required: true
        },
        createSchool: {
            type: Object,
            required: true
        },
        access: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            schoolBtn: false,
            dialog: false,
            loadingSerch: false,
            loadingJoin: false,
            ruleForm: {
                id: ''
            },
            rules: {
                id: [
                    { required: true, message: 'Пожалуйста, введите ID школы или класса', trigger: 'focus' }
                ]
            },
            school: null
        }
    },
    methods: {
        serch (ruleForm) {
            this.loadingSerch = true
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    try {
                        const formData = {
                            id: this.ruleForm.id
                        }
                        const res = await this.$store.dispatch('settings/serchSchool', formData.id)
                        if (res._id) {
                            this.$emit('schoolId', res._id)
                            this.$emit('school', {school: res.school, group: res.group, level: res.level})
                        } else {
                            this.$message.success(res.message);
                        }
                        this.loadingSerch = false
                    } catch (error) {
                        this.loadingSerch = false
                    }
                }
            })
            this.loadingSerch = false
        },
        async join () {
            try {
                this.loadingJoin = true
                const res = await this.$store.dispatch('settings/schoolJoin', this.schoolId)
                
                this.$message.success(res.message);
                this.loadingJoin = false
                this.schoolBtn = true
            } catch (error) {
                this.loadingJoin = false
            }
        },
        async delJoin () {
            try {
                this.loadingJoin = true
                const res = await this.$store.dispatch('settings/joinDelete')
                this.$message.success(res.message);
                this.$emit('schoolId', '')
                this.ruleForm.id = ''
                this.school = null
                this.$emit('school', {school: '', group: '', level: ''})
                this.dialog = false
                this.loadingJoin = false
                this.schoolBtn = false
            } catch (error) {
                this.loadingJoin = false
                this.dialog = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .box-card {
        width: 100%;
        .text {
            font-size: 14px;
        }
        .item {
            padding: 18px 0;
        }
    }
</style>