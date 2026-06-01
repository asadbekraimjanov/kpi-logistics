<template>
    <el-card class="w-2/5">
        <p class="font-semibold text-lg text-blue-800">Joriy oydagi moliyaviy hisobotlar</p>
        <div class="w-full flex justify-between flex-wrap">
            <div class="w-1/2 !mt-5">
                <p class="font-medium">Jami pul aylanmasi</p>
                <div class="flex items-center gap-3">
                    <img src="/tabler-icons/triangle-up.svg" class="w-5" alt="">
                    <p class="text-2xl font-semibold text-gray-800">$ {{ new Intl.NumberFormat('en-US').format(Math.floor(total)) }}</p>
                </div>
            </div>
            <div class="w-1/2 !mt-5">
                <p class="font-medium">Ko'rilgan foyda</p>
                <div class="flex items-center gap-3">
                    <img src="/tabler-icons/triangle-up.svg" class="w-5" alt="">
                    <p class="text-2xl font-semibold text-gray-800">$ {{ new Intl.NumberFormat('en-US').format(Math.floor(profit)) }}</p>
                </div>
            </div>
            <div class="w-1/2 !mt-5">
                <p class="font-medium">Umumiy xarajatlar</p>
                <div class="flex items-center gap-3">
                    <img src="/tabler-icons/triangle-down.svg" class="w-5" alt="">
                    <p class="text-2xl font-semibold text-gray-800">$ {{ new Intl.NumberFormat('en-US').format(Math.floor(tax)) }}</p>
                </div>
            </div>
            <div class="w-1/2 !mt-5">
                <p class="font-medium">Yoqilg'i sarfi</p>
                <div class="flex items-center gap-3">
                    <img src="/tabler-icons/triangle-down.svg" class="w-5" alt="">
                    <p class="text-2xl font-semibold text-gray-800">$ {{ new Intl.NumberFormat('en-US').format(Math.floor(fuel)) }}</p>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTransition } from '@vueuse/core'

const totalSource = ref(0)
const profitSource = ref(0)
const taxSource = ref(0)
const fuelSource = ref(0)

const total = useTransition(totalSource, { duration: 1500 })
const profit = useTransition(profitSource, { duration: 1000 })
const tax = useTransition(taxSource, { duration: 500 })
const fuel = useTransition(fuelSource, { duration: 500 })

onMounted(() => {
    totalSource.value = 157600
    profitSource.value = 132000
    taxSource.value = 1710
    fuelSource.value = 1710
})
</script>

<style scoped>

</style>