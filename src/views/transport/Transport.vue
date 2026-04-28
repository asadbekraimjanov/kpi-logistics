<template>
    <div class="!p-4">
        <div class="w-full flex justify-between !border-b !border-gray-300 !pb-2 !mb-4">
            <div>Jami: 10</div>
            <el-button class="!bg-[#2558b3] !border-none hover:!bg-blue-500 !text-white" :icon="Plus">Qo'shish</el-button>
        </div>
        <div class="w-full flex gap-3 flex-wrap justify-center">
            <el-card v-for="item in 16" class="w-[400px] !bg-blue-100 !mb-1 hover:!shadow-md hover:-translate-y-1.5 cursor-pointer">
                <div class="w-full h-full flex justify-between !border-l-2 !border-l-[#2558b3]">
                    <div class="w-1/3">
                        <img src="@/assets/images/iveco.png" class="w-full" alt="">
                    </div>
                    <div class="w-2/3">
                        <p class="text-gray-700 font-medium">450 kg</p>
                        <p class="font-bold text-2xl text-[#2558b3]">ISUZU 5</p>
                        <div class="flex gap-2">
                            <p class="w-4/5 text-sm text-gray-700">Reyslar soni:
                                <span class="text-xl font-semibold">20</span> /
                                <span class="text-green-500">80%</span>
                            </p>
                            <el-button type="primary" round :icon="Right" class="!w-8 !h-8 !bg-[#2558b3] !border-none hover:scale-[1.1] hover:!bg-blue-500"></el-button>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>

import {Plus, Right} from "@element-plus/icons-vue";
</script>

<style scoped>

</style>