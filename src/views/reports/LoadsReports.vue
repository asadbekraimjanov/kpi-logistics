<template>
    <div class="w-full h-[calc(100vh-100px)] overflow-y-auto">
        <div v-if="tableData.length" class="w-full flex justify-around items-center">
            <div class="w-1/2">
                <p class="text-lg font-medium text-center !mb-3 text-gray-800">Foiz samaradorligi eng yuqori hudud - {{ highTerritoryData[0] }}</p>
                <apexchart type="bar" height="300" width="700" :series="seriesHigh" :options="optionsHigh" />
            </div>
            <div class="w-1/2">
                <p class="text-lg font-medium text-center !mb-3 text-gray-800">Foiz samaradorligi eng past hudud - {{ lowTerritoryData[0] }}</p>
                <apexchart type="bar" height="300" width="700" :series="seriesLow" :options="optionsLow" />
            </div>
        </div>

        <p class="text-xl font-medium text-center !mb-3 !mt-5 text-gray-800">Yuklar hisobotlari (Hududlar kesimida)</p>
        <table class="w-full bg-white !border overflow-x-auto">
            <thead class="bg-gray-100 text-[#3b434e]">
            <tr>
                <th>Hudud</th>
                <th>Yuklar soni</th>
                <th>Yetkazilgan yuklar</th>
                <th>Qaytarilgan yuklar</th>
                <th>Jarayondagilar</th>
                <th>Kechikkan</th>
                <th>Foiz samaradorligi</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in sortedTableData">
                <td class="font-bold text-gray-800 italic">{{ item.to }}</td>
                <td class="bg-gray-100 font-semibold">{{ item.total }}</td>
                <td>{{ item.success }}</td>
                <td>{{ item.rejected }}</td>
                <td>{{ item.inProcess }}</td>
                <td>{{ item.late }}</td>
                <td class="font-semibold"
                        :class="item.efficiency < 20 ? 'text-red-500' : item.efficiency < 60 ? 'text-yellow-500' :
                        item.efficiency < 80 ? 'text-blue-500' : 'text-green-600'">{{ item.efficiency }} %
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import axios from "axios";
import {ElMessage} from "element-plus";


const loading = ref(false);
const tableData = ref([]);
const sortedTableData = ref([]);
const highTerritoryData = ref({});
const lowTerritoryData = ref({});

const seriesHigh = [{
    name: 'Soni',
    data: [
        {
            x: 'Jami yuk',
            y: 0
        },
        {
            x: 'Yetkazilgan yuklar',
            y: 0
        },
        {
            x: 'Qaytarilgan yuklar',
            y: 0
        },
        {
            x: 'Jarayondagilar',
            y: 0
        },
        {
            x: 'Kechikkan',
            y: 0
        }
    ]
}]
const optionsHigh = ref({
    plotOptions: {
        bar: {
            horizontal: true
        }
    },
    colors: ['#2b6b8e'],
    chart: {
        type: 'bar',
        toolbar: { show: false }
    }
})

const seriesLow = [{
    name: 'Soni',
    data: [
        {
            x: 'Jami yuk',
            y: 0
        },
        {
            x: 'Yetkazilgan yuklar',
            y: 0
        },
        {
            x: 'Qaytarilgan yuklar',
            y: 0
        },
        {
            x: 'Jarayondagilar',
            y: 0
        },
        {
            x: 'Kechikkan',
            y: 0
        }
    ]
}]
const optionsLow = ref({
    plotOptions: {
        bar: {
            horizontal: true
        }
    },
    colors: ['#8e2b3d'],
    chart: {
        type: 'bar',
        toolbar: { show: false }
    }
})

const getTableData = async () => {
    loading.value = true

    try {
        const res = (await axios.get('https://kpi-logistics-trucks-default-rtdb.firebaseio.com/routes.json')).data
        tableData.value = Object.entries(res).map(([id, value]) => ({id, ...value}))
    } catch {
        ElMessage.error('Ma\'lumot yuklashda xatolik')
    } finally {
        loading.value = false
    }
}

const countHighTerritoryData = () => {
    const routes = tableData.value

    const stats = {}

    routes.forEach(item => {
        const region = item.to

        if (!stats[region]) {
            stats[region] = {
                done: 0,
                total: 0,
                nonRejected: 0,
                active: 0,
                late: 0
            }
        }

        stats[region].total++

        if (item.status === "DONE") {
            stats[region].done++
        }

        if (item.status !== "REJECTED") {
            stats[region].nonRejected++
        }

        if (item.status === "ACTIVE") {
            stats[region].active++
        }

        // LATE check
        if (item.endDate && item.expectedEndDate) {
            if (new Date(item.endDate) > new Date(item.expectedEndDate)) {
                stats[region].late++
            }
        }
    })

    const entries = Object.entries(stats)

    if (!entries.length) {
        highTerritoryData.value = null
    } else {
        highTerritoryData.value = entries.reduce((max, current) => {
            const A = max[1]
            const B = current[1]

            if (B.done !== A.done) return B.done > A.done ? current : max
            if (B.total !== A.total) return B.total > A.total ? current : max
            if (B.nonRejected !== A.nonRejected) return B.nonRejected > A.nonRejected ? current : max
            if (B.active !== A.active) return B.active > A.active ? current : max

            return B.late > A.late ? current : max
        })
    }
}
const countLowTerritoryData = () => {
    const routes = tableData.value

    const stats = {}

    routes.forEach(item => {
        const region = item.to

        if (!stats[region]) {
            stats[region] = {
                done: 0,
                total: 0,
                nonRejected: 0,
                active: 0,
                late: 0,
                rejected: 0
            }
        }

        stats[region].total++

        if (item.status === "DONE") {
            stats[region].done++
        }

        if (item.status === "ACTIVE") {
            stats[region].active++
        }

        if (item.status === "REJECTED") {
            stats[region].rejected++
        }

        if (item.status !== "REJECTED") {
            stats[region].nonRejected++
        }

        // LATE hisob
        if (item.endDate && item.expectedEndDate) {
            if (new Date(item.endDate) > new Date(item.expectedEndDate)) {
                stats[region].late++
            }
        }
    })

    const entries = Object.entries(stats)

    if (!entries.length) {
        lowTerritoryData.value = null
    } else {
        lowTerritoryData.value = entries.reduce((max, current) => {
            const A = max[1]
            const B = current[1]

            // 1. REJECTED ko'p
            if (B.rejected !== A.rejected) {
                return B.rejected > A.rejected ? current : max
            }

            // 2. TOTAL kam
            if (B.total !== A.total) {
                return B.total < A.total ? current : max
            }

            // 3. DONE kam
            if (B.done !== A.done) {
                return B.done < A.done ? current : max
            }

            return max
        })
    }
}
const sortTableData = () => {
    const routes = tableData.value

    const grouped = {}

    routes.forEach(item => {
        const region = item.to

        if (!grouped[region]) {
            grouped[region] = {
                to: region,
                total: 0,
                success: 0,
                rejected: 0,
                inProcess: 0,
                late: 0
            }
        }

        const g = grouped[region]

        g.total++

        if (item.status === "DONE") {
            g.success++
        }

        if (item.status === "REJECTED") {
            g.rejected++
        }

        if (item.status === "ACTIVE") {
            g.inProcess++
        }

        if (item.endDate && item.expectedEndDate) {
            if (new Date(item.endDate) > new Date(item.expectedEndDate)) {
                g.late++
            }
        }
    })

// efficiency qo‘shamiz
    sortedTableData.value = Object.values(grouped).map(item => ({
        ...item,
        efficiency: item.total
            ? (item.success / item.total) * 100
            : 0
    }))
}

onMounted(async () => {
    await getTableData()
    countHighTerritoryData()
    countLowTerritoryData()
    sortTableData()

    seriesHigh[0].data[0].y = highTerritoryData.value[1].total
    seriesHigh[0].data[1].y = highTerritoryData.value[1].done
    seriesHigh[0].data[2].y = highTerritoryData.value[1].total - highTerritoryData.value[1].nonRejected
    seriesHigh[0].data[3].y = highTerritoryData.value[1].active
    seriesHigh[0].data[4].y = highTerritoryData.value[1].late

    seriesLow[0].data[0].y = lowTerritoryData.value[1].total
    seriesLow[0].data[1].y = lowTerritoryData.value[1].done
    seriesLow[0].data[2].y = Math.max(0,lowTerritoryData.value[1].total - highTerritoryData.value[1].nonRejected)
    seriesLow[0].data[3].y = lowTerritoryData.value[1].active
    seriesLow[0].data[4].y = lowTerritoryData.value[1].late
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
