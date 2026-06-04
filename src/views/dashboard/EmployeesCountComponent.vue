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
                    <p class=" font-bold text-white bg-blue-500 w-10 rounded-full">{{ positionCount[scope.row] }}</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Aktiv xodimlar" align="center" width="120">
            <template #default="scope">
                <div class="flex justify-center">
                    <p class=" font-bold text-white bg-green-600 w-10 rounded-full">{{ positionStatusCount[scope.row].ACTIVE }}</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Zaxirada" align="center" width="100">
            <template #default="scope">
                <div class="flex justify-center">
                    <p class=" font-bold text-white bg-yellow-600 w-10 rounded-full">{{ positionStatusCount[scope.row].INACTIVE }}</p>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import employeePositionsJson from "@/helpers/jsons/EmployeePositionsJson.js";
import {computed, onMounted} from "vue";

const props = defineProps({
    employeeData: {
        required: true,
        type: Array
    }
})

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

onMounted(() => {
    console.log(Object.values(employeePositionsJson))
})
</script>

<style scoped>

</style>