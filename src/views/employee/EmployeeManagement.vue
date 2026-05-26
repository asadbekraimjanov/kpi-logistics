<template>
    <div class="w-full !p-4">
        <div class="w-full h-max flex justify-between items-center gap-2 !pb-4">
            <el-card v-loading="loading" class="w-full h-full flex justify-between gap-2">
                <div class="w-full flex justify-between items-center">
                    <div class="flex flex-col">
                        <p>Xodimlar soni</p>
                        <p class="text-2xl font-normal">
                            {{ new Intl.NumberFormat('en-US').format(tableData.length) }}
                            <span class="text-lg font-semibold text-[#577eff]">(100%)</span>
                        </p>
                    </div>
                    <div class="w-12 h-12 flex justify-center items-center rounded bg-[#e4ecff]">
                        <img src="/tabler-icons/users.svg" alt="">
                    </div>
                </div>
            </el-card>
            <el-card v-loading="loading" class="w-full h-full flex justify-between gap-2">
                <div class="w-full flex justify-between items-center">
                    <div class="flex flex-col">
                        <p>Faol xodimlar soni</p>
                        <p class="text-2xl font-normal">
                            {{ new Intl.NumberFormat('en-US').format(tableData.filter(e => e.status === 'ACTIVE').length) }}
                            <span class="text-lg font-semibold text-green-500">({{ (tableData.filter(e => e.status === 'ACTIVE').length/tableData.length*100).toFixed(1) }}%)</span>
                        </p>
                    </div>
                    <div class="w-12 h-12 flex justify-center items-center rounded bg-green-100">
                        <img src="/tabler-icons/user-check.svg" alt="">
                    </div>
                </div>
            </el-card>
            <el-card v-loading="loading" class="w-full h-full flex justify-between gap-2">
                <div class="w-full flex justify-between items-center">
                    <div class="flex flex-col">
                        <p>Zaxiradagi xodimlar soni</p>
                        <p class="text-2xl font-normal">
                            {{ new Intl.NumberFormat('en-US').format(tableData.filter(e => e.status === 'INACTIVE').length) }}
                            <span class="text-lg font-semibold text-[#FFB400]">({{ (tableData.filter(e => e.status === 'INACTIVE').length/tableData.length*100).toFixed(1) }}%)</span>
                        </p>
                    </div>
                    <div class="w-12 h-12 flex justify-center items-center rounded bg-[#FFF3D6]">
                        <img src="/tabler-icons/user-scan.svg" alt="">
                    </div>
                </div>
            </el-card>
            <el-card v-loading="loading" class="w-full h-full flex justify-between gap-2">
                <div class="w-full flex justify-between items-center">
                    <div class="flex flex-col">
                        <p>Muammoli/Jarima olganlar</p>
                        <p class="text-2xl font-normal">
                            {{ new Intl.NumberFormat('en-US').format(tableData.filter(e => e.has_disciplinary === 1).length) }}
                            <span class="text-lg font-semibold text-[#FF4C51]">({{ (tableData.filter(e => e.has_disciplinary === 1).length/tableData.length*100).toFixed(1) }}%)</span>
                        </p>
                    </div>
                    <div class="w-12 h-12 flex justify-center items-center rounded bg-red-100">
                        <img src="/tabler-icons/user-x.svg" alt="">
                    </div>
                </div>
            </el-card>
        </div>

        <div class="w-full !mb-4 flex justify-between">
            <div class="flex gap-4 items-center">
                <p>Filtr:</p>
                <el-input v-model="fullNameFilter" class="!w-[200px]" placeholder="F.I.SH" clearable></el-input>
                <el-input v-model="phoneFilter" class="!w-[200px]" placeholder="Telefon raqami" clearable />
                <el-select v-model="positionFilter" placeholder="Lavozim" class="!w-[200px]" filterable clearable>
                    <el-option label="Menejer" value="MANAGER" />
                    <el-option label="Dasturchi" value="DEVELOPER" />
                    <el-option label="Operator" value="OPERATOR" />
                    <el-option label="Analitik" value="ANALITIK" />
                    <el-option label="Haydovchi" value="DRIVER" />
                    <el-option label="Mutaxassis" value="SPECIALIST" />
                </el-select>
                <el-select v-model="genderFilter" placeholder="Jinsi" class="!w-[200px]" clearable>
                    <el-option label="Erkak" value="MALE" />
                    <el-option label="Ayol" value="FEMALE" />
                </el-select>
            </div>
            <el-button @click="dialog.open()" type="primary" class="!bg-[#577eff]">Qo'shish</el-button>
        </div>

        <el-table :data="paginatedTableData" v-loading="loading" border style="height: calc(100vh - 19rem);">
            <el-table-column label="№" header-align="center" width="50">
                <template #default="scope">
                    {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column label="Rasm" width="66">
                <template #default="scope">
                    <div class="w-10 h-10 rounded-full overflow-hidden">
                        <img v-if="scope.row.gender === 'FEMALE'" src="@/assets/images/employee-female.png" class="w-full" alt="">
                        <img v-else src="@/assets/images/employee.png" class="w-full" alt="">
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="F.I.SH" prop="full_name" min-width="170" />
            <el-table-column label="Tashkilot" prop="work_place" min-width="130" />

            <el-table-column label="Bo'lim" prop="work_brench" min-width="130" />
            <el-table-column label="Lavozim" prop="position" min-width="130" />
            <el-table-column label="Tizimda qachondan" min-width="120">
                <template #default="scope">
                    {{ scope.row.inSystem ? moment(scope.row.inSystem).format('DD.MM.YYYY') : '' }}
                </template>
            </el-table-column>

            <el-table-column label="Tug'ilgan sana" align="center" min-width="130">
                <template #default="scope">
                    <div class="flex justify-center">
                        <p class="w-max rounded !px-2 font-medium flex items-center gap-1">
                            <el-icon><Calendar /></el-icon>
                            {{ moment(scope.row.birth_date).format('DD.MM.YYYY') }}
                        </p>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Pasport seriya va raqami" min-width="140">
                <template #default="scope">
                    {{ scope.row.passport_series }} {{ scope.row.passport_number }}
                </template>
            </el-table-column>

            <el-table-column label="JSHSHIR" prop="pinfl" min-width="150" />

            <el-table-column label="Status" min-width="100" align="center">
                <template #default="scope">
                    <el-tag :type="scope.row.status === 'ACTIVE' ? 'primary' : 'warning'">
                        {{ scope.row.status === 'ACTIVE' ? 'Faol' : 'Zahira' }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="Jinsi" prop="gender" width="80" />

            <el-table-column label="Telefon raqami" min-width="160">
                <template #default="scope">
                    <div class="flex justify-center">
                        <p class="w-max rounded !px-2 font-medium flex items-center gap-1">
                            <el-icon><PhoneFilled /></el-icon>
                            +998 {{ scope.row.phone_number }}
                        </p>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Harakatlar" width="120" fixed="right">
                <template #default="scope">
                    <div class="flex gap-2 justify-center">
                        <!--<div @click="onDrawerOpen(scope.row)" class="bg-[#577eff] text-white flex justify-center items-center rounded-md !p-1.5 cursor-pointer hover:bg-blue-400">
                            <el-icon :size="18"><View /></el-icon>
                        </div>-->
                        <div @click="dialog.open(scope.row)" class="bg-[#577eff] text-white flex justify-center items-center rounded-md !p-1.5 cursor-pointer hover:bg-blue-400">
                            <el-icon :size="18"><Edit /></el-icon>
                        </div>
                        <div @click="deleteItem(scope.row.id, scope.$index)" class="bg-[#FF4C51] text-white flex justify-center items-center rounded-md !p-1.5 cursor-pointer hover:bg-red-300">
                            <el-icon :size="18"><Delete /></el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <div class="w-full flex justify-center items-center !py-4">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                background
                layout="prev, pager, next, total, sizes, jumper"
                :total="filteredTableData.length"
                :page-sizes="[5, 10, 20, 50]"
            />
        </div>

        <el-drawer v-model="drawer" size="64%" :title="rowData.full_name" class="employee-drawer">
            <EmployeeInfoDrawer :employeeData="rowData" />
        </el-drawer>
        <formDialog @save="save" ref="dialog"/>
    </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import {Calendar, Delete, Edit, PhoneFilled, View} from "@element-plus/icons-vue";
import moment from "moment";
import EmployeeInfoDrawer from "@/views/employee/EmployeeInfoDrawer.vue";
import axios from "axios";
import FormDialog from "@/views/employee/formDialog.vue";
import {ElMessage, ElMessageBox} from "element-plus";

const fullNameFilter = ref('')
const phoneFilter = ref('')
const positionFilter = ref('')
const genderFilter = ref('')

const drawer = ref(false)
const dialog = ref(false)
const loading = ref(false)
const rowData = ref({})

const currentPage = ref(1)
const pageSize = ref(10)

const tableData = ref([])

const save = async () => {
    await getTableData()
}

const deleteItem = async (id, idx) => {
    ElMessageBox.confirm(
        'O\'chirishni tasdiqlaysizmi?',
        {confirmButtonText: 'Ha', cancelButtonText: 'Yo\'q', type: 'warning',}
    ).then( async () => {
        await axios.delete(`http://localhost:5555/data/${id}`)
        tableData.value.splice(idx, 1)
        ElMessage.primary('Amal bajarildi')
    }).catch(() => {
        ElMessage({type: 'info', message: 'Bekor qilindi',})
    })
}

const filteredTableData = computed(() => {
    return tableData.value.filter(item => {
        const matchName =
            !fullNameFilter.value ||
            item.full_name.toLowerCase().includes(fullNameFilter.value.toLowerCase())

        const matchPhone =
            !phoneFilter.value ||
            item.phone_number.toString().includes(phoneFilter.value)

        const matchPosition =
            !positionFilter.value ||
            item.position === positionFilter.value

        const matchGender =
            !genderFilter.value ||
            item.gender === genderFilter.value

        return matchName && matchPhone && matchPosition && matchGender
    })
})

const paginatedTableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredTableData.value.slice(start, end)
})

watch([fullNameFilter, phoneFilter, positionFilter, genderFilter], () => {
    currentPage.value = 1
})

const onDrawerOpen = (row) => {
    rowData.value = row
    drawer.value = true
}

const getTableData = async () => {
    loading.value = true

    try {
        tableData.value = (await axios.get('http://localhost:5555/data')).data
    } catch {
        ElMessage.error('Ma\'lumot yuklashda xatolik')
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    await getTableData()
})
</script>

<style>
.employee-drawer .el-drawer__header {
    background-color: #2558b3;
    color: white;
    font-weight: 500;
    padding: 10px 20px;
    margin-bottom: 0;
}
.employee-drawer .el-drawer__header .el-drawer__title {
    font-size: 17px;
}
.el-pagination {
    scale: 0.85;
}
.el-pager li.is-active {
    background-color: #2558b3 !important;
    border: none;
}
.el-input .el-input__wrapper {
    background-color: #ffffff;
    border-radius: 5px;
    padding: 0 10px;
}
.el-table__header th {
    font-weight: 500;
}
</style>
