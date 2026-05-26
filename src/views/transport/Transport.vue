<template>
    <div class="!p-4">
        <div class="w-full flex justify-between !border-b !border-gray-300 !pb-2">
            <div>
                <p class="text-xl font-medium text-gray-700">Jami:
                    <span class="text-[#2558b3] font-semibold">{{ tableData.length }}</span>
                </p>
            </div>
            <el-button @click="dialog.open()" class="!bg-[#2558b3] !border-none hover:!bg-blue-500 !text-white" :icon="Plus">Qo'shish</el-button>
        </div>
        <el-scrollbar v-loading="loading" style="height: calc(100vh - 190px)">
            <div class="w-full flex gap-3 flex-wrap justify-center !pt-4">
                <el-card v-for="item in tableData" class="w-[380px] !bg-blue-50 !mb-1 hover:!shadow-md hover:-translate-y-1.5 cursor-pointer">
                    <div class="w-full h-full flex justify-between !border-l-2 !border-l-[#2558b3]">
                        <div class="w-1/3">
                            <img src="@/assets/images/iveco.png" class="w-full" alt="">
                        </div>
                        <div class="w-2/3">
                            <p class="text-gray-700 font-medium">{{ item.weight }} kg</p>
                            <p class="font-bold text-2xl text-[#2558b3]">{{ item.name }}</p>
                            <div class="flex gap-2">
                                <p class="w-4/5 text-sm text-gray-700">Reyslar soni:
                                    <span class="text-xl font-semibold">20</span>
                                    <!--                                <span class="text-green-500">80%</span>-->
                                </p>
                                <el-button @click="onDrawerOpen" type="primary" round :icon="Right" class="!w-8 !h-8 !bg-[#2558b3] !border-none hover:scale-[1.1] hover:!bg-blue-500"></el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-scrollbar>
        <div class="w-full flex justify-center items-center !py-4 !border-t !border-gray-300">
            <el-pagination
                background
                layout="prev, pager, next, total, sizes, jumper"
                :total="10"
                :page-sizes="[10, 20, 30, 50]"
            />
        </div>
    </div>

    <el-drawer v-model="drawer" show-close close-on-press-escape close-on-click-modal class="truck-drawer" size="40%">
        <template #header>
            <p class="!m-0 !p-0">Truck nomi - reyslar ro'yxati</p>
        </template>
        <div class="!mb-6">
            <p class="!mb-2 text-lg font-semibold text-teal-600 italic text-center">
                <el-icon><Timer /></el-icon>
                Jarayonda
            </p>
            <div v-for="item in 3">
                <el-steps :active="1" finish-status="success" process-status="process">
                    <el-step title="Toshkent" :icon="LocationFilled" description="Boshlanish: 11.04.2026" />
                    <el-step title="Isuzu 5" :icon="Position" description="230 km" />
                    <el-step title="Samarqand" :icon="LocationFilled" description="Tugash: 21.04.2026" />
                </el-steps>
            </div>
        </div>
        <div>
            <p class="!mb-2 text-lg font-semibold text-sky-600 italic text-center">
                <el-icon><Checked /></el-icon>
                Tugallangan
            </p>
            <div v-for="item in 3">
                <el-steps :active="3" finish-status="finish" process-status="process">
                    <el-step title="Toshkent" :icon="LocationFilled" description="Boshlanish: 11.04.2026" />
                    <el-step title="Isuzu 5" :icon="Position" description="230 km" />
                    <el-step title="Samarqand" :icon="LocationFilled" description="Tugash: 21.04.2026" />
                </el-steps>
            </div>
        </div>
    </el-drawer>
    <TransportDialogComponent @save="save" ref="dialog" />
</template>

<script setup>
import {Checked, LocationFilled, Plus, Position, Right, Timer} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import TransportDialogComponent from "@/views/transport/TransportDialogComponent.vue";
import {ElMessage} from "element-plus";

const drawer = ref(false)
const loading = ref(false)
const dialog = ref(null)
const tableData = ref([])

const save = async () => {
    await getTableData()
}

const onDrawerOpen = () => {
    drawer.value = true
}

const getTableData = async () => {
    loading.value = true

    try {
        const res = (await axios.get('https://kpi-logistics-trucks-default-rtdb.firebaseio.com/trucks.json')).data
        tableData.value = Object.entries(res).map(([id, value]) => ({id, ...value}))
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
.truck-drawer .el-drawer__header {
    background-color: #2558b3;
    color: white;
    font-weight: 500;
    padding: 10px 20px;
    margin-bottom: 0;
}
.truck-drawer .el-drawer__header .el-drawer__title {
    font-size: 17px;
}

.el-pager li.is-active {
    background-color: #2558b3 !important;
    border: none;
}
</style>
