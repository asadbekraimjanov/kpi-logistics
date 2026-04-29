<template>
    <div class="!p-4">
        <div class="w-full flex justify-between !border-b !border-gray-300 !pb-2 !mb-4">
            <div>
                <p class="text-xl font-medium text-gray-700">Jami:
                    <span class="text-[#2558b3] font-semibold">10</span>
                </p>
            </div>
            <el-button class="!bg-[#2558b3] !border-none hover:!bg-blue-500 !text-white" :icon="Plus">Qo'shish</el-button>
        </div>
        <el-scrollbar style="height: calc(100vh - 190px)">
            <div class="w-full flex gap-3 flex-wrap justify-center">
                <el-card v-for="item in 16" class="w-[400px] !bg-blue-50 !mb-1 hover:!shadow-md hover:-translate-y-1.5 cursor-pointer">
                    <div class="w-full h-full flex justify-between !border-l-2 !border-l-[#2558b3]">
                        <div class="w-1/3">
                            <img src="@/assets/images/iveco.png" class="w-full" alt="">
                        </div>
                        <div class="w-2/3">
                            <p class="text-gray-700 font-medium">450 kg</p>
                            <p class="font-bold text-2xl text-[#2558b3]">ISUZU 5</p>
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
                size="small"
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
</template>

<script setup>
import {Checked, LocationFilled, Plus, Position, Right, Timer} from "@element-plus/icons-vue";
import {ref} from "vue";

const drawer = ref(false)


const onDrawerOpen = () => {
    drawer.value = true
}

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