<template>
    <el-drawer v-model="visible" title="Xodim hisobotlari" @close="close" direction="btt" class="employee-reports-drawer" size="100%">
        <el-table :data="tableData" class="w-full" header-cell-class-name="!text-gray-800 !bg-gray-300" border>
            <el-table-column label="№" width="50">
                <template #default="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column label="Haydovchi" min-width="140" align="center">
                <template #default="scope">{{ scope.row.driver.full_name }}</template>
            </el-table-column>
            <el-table-column label="Marshrut" min-width="180">
                <template #default="scope">
                    <div class="flex items-center justify-between gap-2">
                        <p class="leading-[15px] font-semibold">{{ scope.row.from }}</p>
                        <img src="/tabler-icons/arrow-right-circle.svg" alt="">
                        <p class="leading-[15px] font-semibold">{{ scope.row.to }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Jami masofa (km)" prop="total_distance" min-width="100" align="center" />
            <el-table-column label="Bosib o'tilgan masofa (km)" prop="distance_shot_traveled" min-width="100" align="center" />
            <el-table-column label="Boshlanish vaqti" min-width="100" align="center">
                <template #default="scope">{{ moment(scope.row.startDate).format('DD.MM.YYYY') }}</template>
            </el-table-column>
            <el-table-column label="Tugash vaqti" min-width="100" align="center">
                <template #default="scope">{{ moment(scope.row.endDate).format('DD.MM.YYYY') }}</template>
            </el-table-column>
            <el-table-column label="Kutilayotgan tugash vaqti" min-width="110" align="center">
                <template #default="scope">{{ moment(scope.row.expectedEndDate).format('DD.MM.YYYY') }}</template>
            </el-table-column>
            <el-table-column label="Tashkilot" min-width="140" align="center">
                <template #default="scope">{{ scope.row.driver.work_place }}</template>
            </el-table-column>
            <el-table-column label="Bo'lim" min-width="140" align="center">
                <template #default="scope">{{ scope.row.driver.work_brench }}</template>
            </el-table-column>
            <el-table-column label="Lavozim" min-width="140" align="center">
                <template #default="scope">{{ EmployeePositionsJson[scope.row.driver.position] }}</template>
            </el-table-column>
            <el-table-column label="Kechikish (kun hisobida)" min-width="100" align="center">
                <template #default="scope">
                    <p class="font-bold" :class="moment(scope.row.endDate).diff(moment(scope.row.expectedEndDate), 'days') > 2 ? '' : ''">
                        {{ moment(scope.row.endDate).diff(moment(scope.row.expectedEndDate), 'days') > 0 ?
                        moment(scope.row.endDate).diff(moment(scope.row.expectedEndDate), 'days') : moment(scope.row.endDate).diff(moment(scope.row.expectedEndDate), 'days') === 0 ?
                        'O\'z vaqtida' : moment(scope.row.endDate).diff(moment(scope.row.expectedEndDate), 'days')*-1 + ' kun erta'}}</p>
                </template>
            </el-table-column>
            <el-table-column label="Chetlashish (km)" align="center" width="120">
                <template #default="scope">
                    <p class="font-bold" :class="scope.row.distance_shot_traveled - scope.row.total_distance > 0 ? 'text-red-500' : ''">
                        {{ scope.row.distance_shot_traveled - scope.row.total_distance > 0 ? scope.row.distance_shot_traveled - scope.row.total_distance : 'Kuzatilmagan' }}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="Holati">
                <template #default="scope">
                    <el-tag :type="scope.row.status === 'ACTIVE' ? 'primary' : scope.row.status === 'DONE' ? 'success' : 'danger'">
                        {{ scope.row.status === 'ACTIVE' ? 'Aktiv' : scope.row.status === 'DONE' ? 'Bajarilgan' : 'Rad etilgan' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Telefon raqami" min-width="170" align="center">
                <template #default="scope">
                    <div class="flex justify-center">
                        <p class="w-max rounded !px-2 font-medium flex items-center gap-1">
                            <el-icon><PhoneFilled /></el-icon>
                            +998 {{ scope.row.driver.phone_number }}
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Kontakt" min-width="190" align="center">
                <template #default="scope">
                    <p class="font-bold text-[#2558b3]">{{ scope.row.contact }}</p>
                </template>
            </el-table-column>
        </el-table>
    </el-drawer>
</template>

<script setup>
import {ref} from "vue";
import moment from "moment";
import {PhoneFilled} from "@element-plus/icons-vue";
import EmployeePositionsJson from "../../../helpers/jsons/EmployeePositionsJson.js";

const visible = ref(false)
const tableData = ref([])


const open = (item) => {
    tableData.value = item
    visible.value = true
}

const close = () => {
    visible.value = false
}

defineExpose({
    open,
    close
})
</script>

<style>
.employee-reports-drawer .el-drawer__header {
    background-color: #2558b3;
    color: white;
    font-weight: 500;
    padding: 10px 20px;
    margin-bottom: 0;
}
.employee-reports-drawer .el-drawer__header .el-drawer__title {
    font-size: 17px;
}
</style>