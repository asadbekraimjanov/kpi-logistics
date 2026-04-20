<template>
    <div class="w-full !p-4">
        <div class="w-full flex justify-between items-center gap-2 !pb-4">
            <el-card class="w-full flex justify-between gap-2">
                <div class="w-full flex justify-between items-center">
                    <div class="flex flex-col">
                        <p>Xodimlar soni</p>
                        <p class="text-2xl font-normal">
                            {{ new Intl.NumberFormat('en-US').format(10000) }}
                            <span class="text-lg font-semibold text-[#577eff]">(100%)</span>
                        </p>
                    </div>
                    <div class="w-12 h-12 flex justify-center items-center rounded bg-[#e4ecff]">
                        <img src="/tabler-icons/users.svg" alt="">
                    </div>
                </div>
            </el-card>
            <el-card class="w-full flex justify-between gap-2">
                <div class="w-full flex justify-between items-center">
                    <div class="flex flex-col">
                        <p>Faol xodimlar soni</p>
                        <p class="text-2xl font-normal">
                            {{ new Intl.NumberFormat('en-US').format(5) }}
                            <span class="text-lg font-semibold text-green-500">(1%)</span>
                        </p>
                    </div>
                    <div class="w-12 h-12 flex justify-center items-center rounded bg-green-100">
                        <img src="/tabler-icons/user-check.svg" alt="">
                    </div>
                </div>
            </el-card>
            <el-card class="w-full flex justify-between gap-2">
                <div class="w-full flex justify-between items-center">
                    <div class="flex flex-col">
                        <p>Muammoli/Jarima olganlar soni</p>
                        <p class="text-2xl font-normal">
                            {{ new Intl.NumberFormat('en-US').format(5000) }}
                            <span class="text-lg font-semibold text-[#FF4C51]">(20%)</span>
                        </p>
                    </div>
                    <div class="w-12 h-12 flex justify-center items-center rounded bg-red-100">
                        <img src="/tabler-icons/user-x.svg" alt="">
                    </div>
                </div>
            </el-card>
            <el-card class="w-full flex justify-between gap-2">
                <div class="w-full flex justify-between items-center">
                    <div class="flex flex-col">
                        <p>Ishga kelganlar soni</p>
                        <p class="text-2xl font-normal">
                            {{ new Intl.NumberFormat('en-US').format(1000) }}
                            <span class="text-lg font-semibold text-[#FFB400]">(60%)</span>
                        </p>
                    </div>
                    <div class="w-12 h-12 flex justify-center items-center rounded bg-[#FFF3D6]">
                        <img src="/tabler-icons/user-scan.svg" alt="">
                    </div>
                </div>
            </el-card>
        </div>

        <div class="w-full !mb-4 flex justify-between">
            <div class="flex gap-4 items-center">
                <p>Filtr:</p>
                <el-input v-model="fullNameFilter" class="!w-[200px]" placeholder="F.I.SH" clearable></el-input>
                <el-input v-model="fullNameFilter" class="!w-[200px]" placeholder="Telefon raqami" clearable></el-input>
                <el-select placeholder="Lavozim" class="!w-[200px]" filterable clearable></el-select>
                <el-select placeholder="Jinsi" class="!w-[200px]" clearable></el-select>
            </div>
            <el-button type="primary" class="!bg-[#577eff]">Qo'shish</el-button>
        </div>

        <el-table :data="tableData" border style="height: calc(100vh - 300px);">
            <el-table-column label="№" header-align="center" width="50">
                <template #default="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column label="Rasm" width="66">
                <template #default="scope">
                    <div class="w-10 h-10 rounded-full overflow-hidden">
                        <img v-if="scope.$index % 2 === 0" src="@/assets/images/male.png" class="w-full" alt="">
                        <img v-else src="@/assets/images/female.png" class="w-full" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="F.I.SH" prop="familiyasiIsmiOtasiningIsmi" />
            <el-table-column label="Tashkilot" prop="tashkilotNomi" />
            <el-table-column label="Bo'lim" prop="bolimNomi" />
            <el-table-column label="Lavozim" prop="lavozimi" />
            <el-table-column label="Tug'ilgan sana" align="center">
                <template #default="scope">
                    <div class="flex justify-center">
                        <p class="w-max text-white rounded !px-2 bg-blue-500 flex items-center gap-1">
                            <el-icon><Calendar /></el-icon>
                            {{ moment(scope.row.tugilganSana).format('DD.MM.YYYY') }}
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Pasport seriya va raqami">
                <template #default="scope">
                    {{ scope.row.pasportSeriyasi }} {{ scope.row.pasportRaqami }}
                </template>
            </el-table-column>
            <el-table-column label="JSHSHIR" prop="jismoniyShaxsShaxsiyIdentifikatsiyaRaqami" />
            <el-table-column label="Jinsi" prop="jinsi" width="80" />
            <el-table-column label="Telefon raqami">
                <template #default="scope">
                    <div class="flex justify-center">
                        <p class="w-max text-white rounded !px-2 bg-cyan-500 flex items-center gap-1">
                            <el-icon><PhoneFilled /></el-icon>
                            {{ scope.row.phoneNumber }}
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Harakatlar" width="120">
                <template #default="scope">
                    <div class="flex gap-2 justify-center">
                        <div @click="onDrawerOpen(scope.row)" class="bg-[#577eff] text-white flex justify-center items-center rounded-md !p-1.5 cursor-pointer hover:bg-blue-400">
                            <el-icon :size="18"><View /></el-icon>
                        </div>
                        <div class="bg-[#FF4C51] text-white flex justify-center items-center rounded-md !p-1.5 cursor-pointer hover:bg-red-300">
                            <el-icon :size="18"><Delete /></el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <div class="w-full flex justify-center items-center !py-4">
            <el-pagination background layout="prev, pager, next, total, sizes, jumper" :total="1000" />
        </div>

        <el-drawer v-model="drawer" size="64%" :title="rowData.familiyasiIsmiOtasiningIsmi" class="employee-drawer">
            <EmployeeInfoDrawer :employeeData="rowData" />
        </el-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {Calendar, Delete, PhoneFilled, View} from "@element-plus/icons-vue";
import moment from "moment";
import EmployeeInfoDrawer from "@/views/employee/EmployeeInfoDrawer.vue";

const fullNameFilter = ref(null)
const drawer = ref(false)
const tableData = ref([
    {
        tartibRaqami: 1,
        familiyasiIsmiOtasiningIsmi: "Aliyev Anvar Abdulla o‘g‘li",
        tashkilotNomi: "UzAuto Motors",
        bolimNomi: "IT bo‘limi",
        lavozimi: "Frontend developer",
        tugilganSana: "1998-03-12",
        pasportSeriyasi: "AA",
        pasportRaqami: "1234567",
        jismoniyShaxsShaxsiyIdentifikatsiyaRaqami: "30102981234567",
        jinsi: "Erkak",
        phoneNumber: "+998500355535"
    },
    {
        tartibRaqami: 2,
        familiyasiIsmiOtasiningIsmi: "Karimova Dilnoza Shavkat qizi",
        tashkilotNomi: "Beeline Uzbekistan",
        bolimNomi: "Marketing",
        lavozimi: "Mutaxassis",
        tugilganSana: "1995-07-21",
        pasportSeriyasiVaRaqami: "AB7654321",
        jismoniyShaxsShaxsiyIdentifikatsiyaRaqami: "30507951234567",
        jinsi: "Ayol",
        phoneNumber: "+998500355535"
    },

    ...Array.from({ length: 28 }, (_, i) => {
        const id = i + 3
        return {
            tartibRaqami: id,
            familiyasiIsmiOtasiningIsmi: `Test User ${id}`,
            tashkilotNomi: ["Artel", "Ucell", "Uztelecom", "IT Park"][id % 4],
            bolimNomi: ["IT", "HR", "Moliya", "Logistika"][id % 4],
            lavozimi: ["Manager", "Developer", "Operator", "Analitik"][id % 4],
            tugilganSana: `199${id % 10}-0${(id % 9) + 1}-1${id % 9}`,
            pasportSeriyasiVaRaqami: `AA${1000000 + id}`,
            jismoniyShaxsShaxsiyIdentifikatsiyaRaqami: `3${id}0${id}981234567`,
            jinsi: id % 2 === 0 ? "Erkak" : "Ayol",
            phoneNumber: "+998500355535"
        }
    })
])
const rowData = ref({})


const onDrawerOpen = (row) => {
    rowData.value = row
    drawer.value = true
}

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
