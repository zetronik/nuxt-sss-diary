<template>
    <el-table
    :data="student"
    style="width: 100%">
    <el-table-column
        sortable
        label="Одноклассник">
        <template slot-scope="scope">
        {{scope.row.surname}} {{scope.row.name}} 
        </template>
    </el-table-column>
    <el-table-column
        sortable
        fixed="right"
        width="100"
        label="Доступ">
        <template slot-scope="scope">
            <el-tooltip v-if="scope.row.access === 'admin'" class="item" effect="dark" content="Администратор" placement="left-start">
                <i class="el-icon-s-custom root-icon"></i>
            </el-tooltip>
            
            <el-switch
                v-else
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
        },
        access: {
            type: Boolean,
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

<style lang="scss" scoped>
    .root-icon {
        font-size: 1.5rem;
    }
</style>