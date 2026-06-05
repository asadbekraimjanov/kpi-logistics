<template>
    <div class="w-full h-[calc(100vh-100px)] overflow-y-auto relative">
        <el-select v-model="currentYear" class="!w-20 !absolute right-0">
            <el-option label="2026" value="2026"/>
        </el-select>

        <div v-if="tableData.length" class="w-full flex justify-around items-center">
            <div class="w-1/3">
                <p class="text-lg font-medium text-center !mb-3 text-gray-800">Davr bo'yicha tahlil</p>
                <apexchart type="line" height="300" :series="seriesCash" :options="optionsCash"/>
            </div>
            <div>
                <p class="text-lg font-medium text-center !mb-3 text-gray-800">Hozirgi davr uchun umumiy ko'rsatkichlar</p>
                <apexchart type="donut" height="300" :series="seriesTotal" :options="optionsTotal" />
            </div>
        </div>

        <p class="text-xl font-medium text-center !mb-3 !mt-5 text-gray-800">Moliyaviy hisobotlar</p>
        <table class="w-full bg-white !border overflow-x-auto">
            <thead class="bg-gray-100 text-[#3b434e]">
            <tr>
                <th>Davr</th>
                <th>Korxonada aylangan pul miqdori</th>
                <th>Kelib tushgan foyda</th>
                <th>Ajratilgan chiqim</th>
                <th>Yoqilg'i sarfi</th>
                <th>Ko'rilgan daromad (% da)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, index) in tableRows" :key="index">
                <td class="font-semibold text-gray-800">{{ row.month }}</td>
                <td class="font-semibold text-gray-800">{{ row.price ? numberFormat(row.price) + ' $' : 0 }}</td>
                <td class="font-semibold text-gray-800">{{ row.profit ? numberFormat(row.profit) + ' $' : 0 }}</td>
                <td class="font-semibold text-gray-800">{{ row.tax ? numberFormat(row.tax) + ' $' : 0 }}</td>
                <td class="font-semibold text-gray-800">{{ row.fuel ? numberFormat(row.fuel) + ' $' : 0 }}</td>
                <td class="font-bold" :class="row.percent < 20 ? 'text-red-500' : row.percent < 60 ? 'text-yellow-500' :
                        row.percent < 80 ? 'text-blue-500' : 'text-green-600'">{{ row.percent }}%</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const currentYear = ref('2026')
const tableData = ref([])
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
    {
        name: "Yoqilg'i sarfi",
        data: [300, 500, 600, 300, 400, 200, 100, 0, 0, 200, 100, 100]
    }
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

    markers: {
        size: 4
    },

    grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 4
    },

    tooltip: {
        y: {
            formatter: (val) => `${val} $`
        }
    },

    legend: {
        position: 'bottom'
    }
})

const seriesTotal = ref([153800, 98600, 3500, 2500])
const optionsTotal = ref({
    labels: ['Aylangan pul miqdori', 'Kelib tushgan foyda', 'Ajratilgan chiqim', 'Yoqilg\'i sarfi'],

    colors: ['#2b6b8e', '#2b8e74', '#8e2b3d', '#8e722b'],

    legend: {
        position: 'bottom',
        fontSize: '14px',
        labels: {
            colors: '#3b434e'
        }
    },

    dataLabels: {
        enabled: false
    },

    stroke: {
        width: 2,
        colors: ['#fff']
    },

    plotOptions: {
        pie: {
            expandOnClick: true,

            donut: {
                size: '68%',

                labels: {
                    show: true,

                    name: {
                        show: true,
                        fontSize: '14px',
                        color: '#6b7280'
                    },

                    value: {
                        show: true,
                        fontSize: '30px',
                        fontWeight: 600,
                        color: '#2e4250',
                        formatter: (val, opts) => {
                            const aylanganPul = opts.globals.seriesTotals[0]

                            return ((val / aylanganPul) * 100).toFixed(1) + '%'
                        }
                    },

                    total: {
                        show: true,
                        label: 'Aylangan pul',
                        fontSize: '14px',
                        color: '#6b7280',
                        formatter: () => '100%'
                    }
                }
            }
        }
    },

    tooltip: {
        y: {
            formatter: (val) => `${new Intl.NumberFormat('ru-RU').format(val)} $`
        }
    }
})

const monthLabels = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
]
const tableRows = computed(() => {
    const monthlyData = calculateMonthlyData()

    return monthlyData[0].data.map((_, i) => {
        const price = monthlyData[0].data[i]
        const profit = monthlyData[1].data[i]
        const tax = monthlyData[2].data[i]
        const fuel = monthlyData[3].data[i]

        const percent = price
            ? (((price - tax - fuel) / price) * 100).toFixed(1)
            : 0

        return {
            month: monthLabels[i],
            price,
            profit,
            tax,
            fuel,
            percent
        }
    })
})

const numberFormat = (value) => {
    if (!value) return '0'
    return new Intl.NumberFormat('en-US').format(value)
}

const calculateTotals = () => {
    return tableData.value.reduce(
        (acc, item) => {
            const price = Number(item.price || 0)
            const tax = Number(item.tax || 0)

            const distance = Number(item.distance || 0)
            const consumptionPer1km = Number(item.carType?.consumptionPer1km || 0)

            const fuel = Math.round(
                (consumptionPer1km * distance * 13000) / (12000)
            )

            acc.price += price
            acc.tax += tax
            acc.profit += (price - tax - fuel)
            acc.fuel += fuel

            return acc
        },
        {
            price: 0,
            tax: 0,
            profit: 0,
            fuel: 0
        }
    )
}

const calculateMonthlyData = () => {
    const priceData = Array(12).fill(0)
    const profitData = Array(12).fill(0)
    const taxData = Array(12).fill(0)
    const fuelData = Array(12).fill(0)

    tableData.value.forEach(item => {
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

const getTableData = async () => {
    loading.value = true

    try {
        const res = (await axios.get('https://kpi-logistics-trucks-default-rtdb.firebaseio.com/loads.json')).data
        tableData.value = Object.entries(res).map(([id, value]) => ({id, ...value}))
    } catch {
        ElMessage.error('Ma\'lumot yuklashda xatolik')
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    await getTableData()

    const totals = calculateTotals()
    seriesTotal.value[0] = totals.price
    seriesTotal.value[1] = totals.profit
    seriesTotal.value[2] = totals.tax
    seriesTotal.value[3] = totals.fuel

    const months = calculateMonthlyData()
    seriesCash[0].data = months[0].data
    seriesCash[1].data = months[1].data
    seriesCash[2].data = months[2].data
    seriesCash[3].data = months[3].data
})

</script>

<style scoped>
table, tr, td, th {
    border: 1px solid #ddd;
    border-collapse: collapse;
}

td, th, tr {
    padding: 5px;
    text-align: left;
    font-size: 14px;
}

th, td {
    text-align: center;
}

thead td {
    font-weight: 500;
}
</style>