<template>
    <el-table :data="Object.keys(employeePositionsJson)" height="270" header-cell-class-name="!bg-[#2B6B8E] text-white">
        <el-table-column label="№" align="center" width="50">
            <template #default="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="Lavozim" align="center">
            <template #default="scope">
                <p class="font-semibold">{{ employeePositionsJson[scope.row] }}</p>
            </template>
        </el-table-column>
        <el-table-column label="Xodimlar soni" align="center" width="120">
            <template #default="scope">
                <div class="flex justify-center">
                    <p @click="sendTotalEmployees(scope.$index)" class="cursor-pointer font-bold text-white bg-blue-500 w-10 rounded-full">{{ positionCount[scope.row] }}</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Aktiv xodimlar" align="center" width="120">
            <template #default="scope">
                <div class="flex justify-center">
                    <p @click="sendActiveEmployees(scope.$index)" class="cursor-pointer font-bold text-white bg-green-600 w-10 rounded-full">{{ positionStatusCount[scope.row].ACTIVE }}</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Zaxirada" align="center" width="100">
            <template #default="scope">
                <div class="flex justify-center">
                    <p @click="sendInactiveEmployees(scope.$index)" class="cursor-pointer font-bold text-white bg-yellow-600 w-10 rounded-full">{{ positionStatusCount[scope.row].INACTIVE }}</p>
                </div>
            </template>
        </el-table-column>
    </el-table>

    <EmployeesInfoDrawer ref="employeesInfoRef" :drawer-title="drawerTitle" />
</template>

<script setup>
import employeePositionsJson from "@/helpers/jsons/EmployeePositionsJson.js";
import {computed, onMounted, ref} from "vue";
import EmployeesInfoDrawer from "@/views/reports/helpers/EmployeesInfoDrawer.vue";

const props = defineProps({
    employeeData: {
        required: true,
        type: Array
    }
})
const employeesInfoRef = ref(null)
const drawerTitle = ref(null)


const sendTotalEmployees = (idx) => {
    drawerTitle.value = 'Jami xodimlar'
    switch (idx) {
        case 0: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'MANAGER')); break;
        case 1: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'OPERATOR')); break;
        case 2: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'DEVELOPER')); break;
        case 3: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'ANALITIK')); break;
        case 4: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'DRIVER')); break;
        case 5: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'SPECIALIST')); break;
    }
}
const sendActiveEmployees = (idx) => {
    drawerTitle.value = 'Aktiv xodimlar'
    switch (idx) {
        case 0: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'MANAGER' && e.status === 'ACTIVE')); break;
        case 1: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'OPERATOR' && e.status === 'ACTIVE')); break;
        case 2: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'DEVELOPER' && e.status === 'ACTIVE')); break;
        case 3: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'ANALITIK' && e.status === 'ACTIVE')); break;
        case 4: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'DRIVER' && e.status === 'ACTIVE')); break;
        case 5: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'SPECIALIST' && e.status === 'ACTIVE')); break;
    }
}
const sendInactiveEmployees = (idx) => {
    drawerTitle.value = 'Zaxiradagi xodimlar'
    switch (idx) {
        case 0: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'MANAGER' && e.status === 'INACTIVE')); break;
        case 1: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'OPERATOR' && e.status === 'INACTIVE')); break;
        case 2: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'DEVELOPER' && e.status === 'INACTIVE')); break;
        case 3: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'ANALITIK' && e.status === 'INACTIVE')); break;
        case 4: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'DRIVER' && e.status === 'INACTIVE')); break;
        case 5: employeesInfoRef.value.open(props.employeeData.filter(e => e.position === 'SPECIALIST' && e.status === 'INACTIVE')); break;
    }
}

const positionStatusCount = computed(() => {
    const map = {
        MANAGER: { ACTIVE: 0, INACTIVE: 0 },
        OPERATOR: { ACTIVE: 0, INACTIVE: 0 },
        DEVELOPER: { ACTIVE: 0, INACTIVE: 0 },
        ANALITIK: { ACTIVE: 0, INACTIVE: 0 },
        DRIVER: { ACTIVE: 0, INACTIVE: 0 },
        SPECIALIST: { ACTIVE: 0, INACTIVE: 0 }
    }

    props.employeeData.forEach(e => {
        if (map[e.position] && map[e.position][e.status] !== undefined) {
            map[e.position][e.status]++
        }
    })

    return map
})

const positionCount = computed(() => {
    const map = {
        MANAGER: 0,
        OPERATOR: 0,
        DEVELOPER: 0,
        ANALITIK: 0,
        DRIVER: 0,
        SPECIALIST: 0
    }

    props.employeeData.forEach(e => {
        if (map[e.position] !== undefined) {
            map[e.position]++
        }
    })

    return map
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