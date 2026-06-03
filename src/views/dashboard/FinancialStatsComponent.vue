<template>
    <el-card class="w-2/5">
        <p class="font-semibold text-lg text-blue-800">Joriy oydagi moliyaviy hisobotlar</p>
        <div class="w-full flex justify-between flex-wrap">
            <div class="w-1/2 !mt-5">
                <p class="font-medium">Jami pul aylanmasi</p>
                <div class="flex items-center gap-3">
                    <img v-if="averageData[0]?.average < total" src="/tabler-icons/triangle-up.svg" class="w-5" alt="">
                    <img v-else src="/tabler-icons/triangle-down.svg" class="w-5" alt="">
                    <p class="text-2xl font-semibold text-gray-800">$ {{ new Intl.NumberFormat('en-US').format(Math.floor(total)) }}</p>
                </div>
            </div>
            <div class="w-1/2 !mt-5">
                <p class="font-medium">Ko'rilgan foyda</p>
                <div class="flex items-center gap-3">
                    <img v-if="averageData[1]?.average < profit" src="/tabler-icons/triangle-up.svg" class="w-5" alt="">
                    <img v-else src="/tabler-icons/triangle-down.svg" class="w-5" alt="">
                    <p class="text-2xl font-semibold text-gray-800">$ {{ new Intl.NumberFormat('en-US').format(Math.floor(profit)) }}</p>
                </div>
            </div>
            <div class="w-1/2 !mt-5">
                <p class="font-medium">Xarajatlar</p>
                <div class="flex items-center gap-3">
                    <img v-if="averageData[2]?.average < tax" src="/tabler-icons/triangle-up.svg" class="w-5" alt="">
                    <img v-else src="/tabler-icons/triangle-down.svg" class="w-5" alt="">
                    <p class="text-2xl font-semibold text-gray-800">$ {{ new Intl.NumberFormat('en-US').format(Math.floor(tax)) }}</p>
                </div>
            </div>
            <div class="w-1/2 !mt-5">
                <p class="font-medium">Yoqilg'i sarfi</p>
                <div class="flex items-center gap-3">
                    <img v-if="averageData[3]?.average < fuel" src="/tabler-icons/triangle-up.svg" class="w-5" alt="">
                    <img v-else src="/tabler-icons/triangle-down.svg" class="w-5" alt="">
                    <p class="text-2xl font-semibold text-gray-800">$ {{ new Intl.NumberFormat('en-US').format(Math.floor(fuel)) }}</p>
                </div>
            </div>
        </div>
        <div class="font-medium !mt-3 text-lg">
            <div class="ticker">
                <div v-if="(averageData[1]?.average/averageData[0]?.average) > (profit/total) && (profit/total) < 1" class="text-red-600">
                    <el-icon class="translate-y-0.5 !mr-1 animate-pulse "><WarningFilled /></el-icon>
                    <span class="animate-pulse">Korxona oylik pul aylanmalari barcha davrlardagi o'rtacha pul aylanmalaridan quyi ko'rsatkichlarda</span>
                </div>
                <div v-else class="text-green-600">
                    <el-icon class="translate-y-0.5 !mr-1 animate-pulse "><SuccessFilled /></el-icon>
                    <span class="animate-pulse">Korxona ijobiy tomonga rivojlanmoqda</span>
                </div>
            </div>
        </div>
        {{ profit/total }}
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTransition } from '@vueuse/core'
import {SuccessFilled, WarningFilled} from "@element-plus/icons-vue";


const props = defineProps({
    monthlyFinancialData: {
        type: Array,
        required: true
    }
})

const totalSource = ref(0)
const profitSource = ref(0)
const taxSource = ref(0)
const fuelSource = ref(0)
const averageData = ref([])

const total = useTransition(totalSource, { duration: 1500 })
const totalTicker = ref(0)
const profit = useTransition(profitSource, { duration: 1000 })
const profitTicker = ref(0)
const tax = useTransition(taxSource, { duration: 500 })
const fuel = useTransition(fuelSource, { duration: 500 })

onMounted(() => {
    totalSource.value = props.monthlyFinancialData[0]?.data[props.monthlyFinancialData[0]?.data.length-1]
    profitSource.value = props.monthlyFinancialData[1]?.data[props.monthlyFinancialData[1]?.data.length-1]
    taxSource.value = props.monthlyFinancialData[2]?.data[props.monthlyFinancialData[2]?.data.length-1]
    fuelSource.value = props.monthlyFinancialData[3]?.data[props.monthlyFinancialData[3]?.data.length-1]

    averageData.value = props.monthlyFinancialData.map(item => ({
        name: item.name,
        average: (item.data.reduce((a, b) => a + b, 0) / item.data.length).toFixed()
    }))
    console.log(averageData.value)
})
</script>

<style scoped>
.ticker {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
}

.ticker div {
    display: inline-block;
    padding-left: 100%;
    animation: scrollText 10s linear infinite;
}

@keyframes scrollText {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
}
</style>