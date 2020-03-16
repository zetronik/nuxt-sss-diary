<template>
    <el-row>
        <el-col :span="24">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">

                <el-form-item prop="id" label="Ввести ID школы или класса">
                    <el-input v-model="ruleForm.id"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button :loading="loadingSerch" type="primary" @click="serch('ruleForm')">Найти</el-button>
                </el-form-item>

            </el-form>
            <el-card v-if="school" class="box-card">
                <div class="text item">
                    <h4>ID: {{school._id}}</h4>
                </div>
                <div class="text item">
                    <h4>Название: {{school.school}}</h4>
                </div>
                <div class="text item">
                    <h4>Класс: {{school.level}}{{school.group}} </h4>
                </div>
                <div>
                    <el-button :loading="loadingJoin" type="primary" @click="join">Присоеденится</el-button>
                </div>
            </el-card>
        </el-col>
    </el-row>
    
</template>

<script>
export default {
    data () {
        return {
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
                        this.school = await this.$store.dispatch('settings/serchSchool', formData.id)
                        this.loadingSerch = false
                    } catch (error) {
                        this.loadingSerch = false
                    }
                }
            })
            this.loadingSerch = false
        },
        join () {
            console.log(this.school)
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