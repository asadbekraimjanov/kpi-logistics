<template>
    <div class="!p-4">
        <p class="text-gray-800 text-xl font-semibold">Marshrutlar</p>
        <div class="w-full flex gap-[1%] !mt-3">
            <el-card class="!w-[24%]">
                <div class="w-full h-full flex gap-8">
                    <div class="flex flex-col justify-evenly">
                        <p class="text-lg font-medium text-gray-700">Joriy Marshrutlar</p>
                        <p class="text-4xl  font-medium" style="color: #2050a6">10</p>
                    </div>
                    <img src="/tabler-icons/truck-delivery.svg" class="w-16" alt="">
                </div>
            </el-card>
            <el-card class="!w-[24%]">
                <div class="w-full flex justify-between">
                    <img src="/logo.png" class="!w-20" alt="">
                </div>
            </el-card>
            <el-card class="!w-[24%]">
                <div class="w-full flex justify-between">
                    <img src="/logo.png" class="!w-20" alt="">
                </div>
            </el-card>
            <el-card class="!w-[24%]">
                <div class="w-full flex justify-between">
                    <img src="/logo.png" class="!w-20" alt="">
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";

const tableData = ref([
    {
        id: 1,
        jami_masofa: '230',
        bosib_otilgan_masofa: '245',
        boshlanish_vaqti: '2026-04-11',
        kutilayotgan_tugash_vaqti: '2026-04-21',
        tugash_vaqti: '2026-04-22',
        marshrut_ogish_masofasi: '15',
        kechikish_vaqti: '1',
        drayver: 'freight@gmail.com'
    }
])
</script>

<style scoped>

</style>