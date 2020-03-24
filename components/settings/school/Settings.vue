<template>
    <el-table
    :data="student"
    style="width: 100%">
    <el-table-column
        label="Одноклассник">
        <template slot-scope="scope">
        {{scope.row.name}} {{scope.row.surname}}
        </template>
    </el-table-column>
    <el-table-column
        fixed="right"
        width="100"
        label="Доступ">
        <template slot-scope="scope">
            <el-switch
                :disabled="!access"
                v-model="scope.row.access"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeAccess(scope.$index, scope.row.id)"
                >
            </el-switch>
        </template>
    </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: {
        student: {
            type: Array,
            required: true
        },
        access: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        async changeAccess (index, id) {
            try {
                const user = {
                    id, access: this.student[index].access
                }
                const res = await this.$store.dispatch('settings/studentAccess', user)
                const student = this.student.filter(s => s.id === res.id)
                this.$message.success(`${student[0].surname} ${student[0].name} предоставлен доступ "${res.access}"`);
            } catch (error) {
                
            }
        }
    }
}
</script>