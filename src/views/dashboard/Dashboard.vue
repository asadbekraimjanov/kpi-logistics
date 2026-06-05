<template>
    <div class="w-full h-[calc(100vh-4.6rem)] !p-4 overflow-y-auto">
        <div class="flex justify-between gap-4">
            <FinancialStatsComponent v-if="monthlyFinancialData.length" :monthlyFinancialData="monthlyFinancialData" />
            <el-card class="w-3/5">
                <p class="font-semibold text-lg text-blue-800">Moliyaviy samaradorlik davr bo'yicha tahlili</p>
                <apexchart v-if="loadsData.length" type="area" height="200" :series="seriesCash" :options="optionsCash"/>
            </el-card>
        </div>
        <div class="flex justify-between gap-4 !py-4">
            <el-card class="w-1/3">
                <p class="font-semibold text-lg text-blue-800 text-center">Rag'batlantirish kerak bo'lgan xodimlar</p>
                <EmployeeStatisticsComponent  v-if="employeeData.length" :employee-data="employeeData" />
            </el-card>
            <el-card class="w-1/3">
                <p class="font-semibold text-lg text-blue-800 text-center">Jins bo'yicha tahlil</p>
                <EmployeeGenderStatistics  v-if="employeeData.length" :employee-data="employeeData" />
            </el-card>
            <el-card class="w-1/3">
                <EmployeesCountComponent v-if="employeeData.length" :employee-data="employeeData" />
            </el-card>
        </div>
        <div class="w-full">
            <el-card>
                <p class="font-semibold text-lg text-blue-800 text-center">Hududlar reytingi</p>
                <TerritoriesStatistics />
            </el-card>
        </div>
    </div>
</template>

<script setup>
import FinancialStatsComponent from "@/views/dashboard/FinancialStatsComponent.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import EmployeeStatisticsComponent from "@/views/dashboard/EmployeeStatisticsComponent.vue";
import EmployeeGenderStatistics from "@/views/dashboard/EmployeeGenderStatistics.vue";
import EmployeesCountComponent from "@/views/dashboard/EmployeesCountComponent.vue";
import TerritoriesStatistics from "@/views/dashboard/TerritoriesStatistics.vue";


const loadsData = ref([])
const monthlyFinancialData = ref([])
const employeeData = ref([])
const loading = ref(false)

const seriesCash = [
    {
        name: "Aylangan pul",
        data: [5000, 5600, 5900, 5200, 5000, 6000, 6200, 6300, 6100, 7000, 6700, 7200]
    },
    {
        name: "Foyda",
        data: [1000, 1500, 1700, 2000, 1600, 3000, 3100, 3300, 3000, 3500, 3300, 4000]
    },
    {
        name: "Chiqim",
        data: [300, 500, 600, 300, 400, 200, 100, 0, 0, 200, 100, 100]
    },
    // {
    //     name: "Yoqilg'i sarfi",
    //     data: [300, 500, 600, 300, 400, 200, 100, 0, 0, 200, 100, 100]
    // }
]
const optionsCash = ref({
    chart: {
        type: "line",
        toolbar: {show: false},
        fontFamily: 'Inter, sans-serif'
    },

    stroke: {
        curve: 'smooth',
        width: 3
    },

    colors: ['#2b6b8e', '#2b8e74', '#8e2b3d', '#8e722b'],

    xaxis: {
        categories: [
            'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
            'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
        ]
    },

    yaxis: {
        labels: {
            formatter: (val) => `${val.toFixed(0)}%`
        }
    },

    markers: {
        size: 4
    },

    grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 4
    },

    tooltip: {
        y: {
            formatter: (val) => `${val}%`
        }
    },

    legend: {
        position: 'bottom'
    }
})


const calculateMonthlyData = () => {
    const priceData = Array(12).fill(0)
    const profitData = Array(12).fill(0)
    const taxData = Array(12).fill(0)
    const fuelData = Array(12).fill(0)

    loadsData.value.forEach(item => {
        if (!item.fligthTime?.[1]) return

        const month = new Date(item.fligthTime[1]).getMonth()

        const price = Number(item.price || 0)
        const tax = Number(item.tax || 0)

        const distance = Number(item.distance || 0)
        const consumptionPer1km = Number(item.carType?.consumptionPer1km || 0)

        const fuel = Math.round((consumptionPer1km * distance * 13000) / (12000))

        priceData[month] += price
        taxData[month] += tax
        profitData[month] += (price - tax - fuel)
        fuelData[month] += fuel
    })

    const currentMonth = new Date().getMonth() + 1

    return [
        {
            name: "Aylangan pul",
            data: priceData.slice(0, currentMonth)
        },
        {
            name: "Foyda",
            data: profitData.slice(0, currentMonth)
        },
        {
            name: "Chiqim",
            data: taxData.slice(0, currentMonth)
        },
        {
            name: "Yoqilg'i sarfi",
            data: fuelData.slice(0, currentMonth)
        }
    ]
}

const getLoadsData = async () => {
    loading.value = true

    try {
        const res = (await axios.get('https://kpi-logistics-trucks-default-rtdb.firebaseio.com/loads.json')).data
        loadsData.value = Object.entries(res).map(([id, value]) => ({id, ...value}))
    } catch {
        ElMessage.error('Ma\'lumot yuklashda xatolik')
    } finally {
        loading.value = false
    }
}

const getEmployeeData = async () => {
    loading.value = true

    try {
        employeeData.value = (await axios.get('http://localhost:5555/data')).data
    } catch {
        ElMessage.error('Xodim ma\'lumotlarini yuklashda xatolik')
    } finally {
        loading.value = false
    }
}

const calculatePercentData = () => {
    const months = calculateMonthlyData()

    const percentData = months[0].data.map((price, index) => {
        const profit = months[1].data[index]

        return price
            ? Number(((profit / price) * 100).toFixed(1))
            : 0
    })

    const averagePercent =
        percentData.reduce((sum, val) => sum + val, 0) / percentData.length

    const color =
        averagePercent < 60
            ? '#ef4444'
            : averagePercent < 85
                ? '#f59e0b'
                : '#22c55e'

    optionsCash.value.annotations = {
        yaxis: [
            {
                y: averagePercent,
                borderColor: color,
                strokeDashArray: 6,
                label: {
                    borderColor: color,
                    style: {
                        color: '#fff',
                        background: color
                    },
                    text: `O'rtacha: ${averagePercent.toFixed(1)}%`
                }
            }
        ]
    }

    seriesCash.splice(0, seriesCash.length, {
        name: "Foiz ko'rsatkich",
        data: percentData
    })

    monthlyFinancialData.value = months
}

onMounted(async () => {
    await getEmployeeData()
    await getLoadsData()
    await calculatePercentData()

})
</script>

<style>

</style>
