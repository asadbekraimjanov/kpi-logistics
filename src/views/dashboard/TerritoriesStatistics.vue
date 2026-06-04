<template>
    <apexchart type="bar" height="240" :series="seriesTerritories" :options="optionsTerritories" />
</template>

<script setup>
import {nextTick, onMounted, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";


const tableData = ref([])
const loading = ref(false)

const seriesTerritories = ref([{
    name: 'Foiz ko\'rsatkich',
    data: [
        // { x: ['Toshkent', 'Samarqand'], y: 45 },
        // { x: ['Buxoro', 'Xorazm'], y: 72 },
        // { x: ['Farg\'ona', 'Andijon'], y: 88 },
        // { x: ['Namangan', 'Qashqadaryo'], y: 61 },
        // { x: ['Surxondaryo', 'Jizzax'], y: 93 },
        // { x: ['Sirdaryo', 'Navoiy'], y: 37 },
        // { x: ['Toshkent', 'Buxoro'], y: 54 },
        // { x: ['Samarqand', 'Farg\'ona'], y: 79 },
        // { x: ['Andijon', 'Namangan'], y: 26 },
        // { x: ['Qashqadaryo', 'Surxondaryo'], y: 97 },
        // { x: ['Xorazm', 'Sirdaryo'], y: 68 },
        // { x: ['Navoiy', 'Jizzax'], y: 41 },
        // { x: ['Toshkent', 'Andijon'], y: 83 },
        // { x: ['Buxoro', 'Namangan'], y: 29 },
        // { x: ['Farg\'ona', 'Xorazm'], y: 90 }
    ]
}])
const optionsTerritories = ref({
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 2,
            columnWidth: "45%",
            distributed: true
        }
    },

    colors: ['#2b6b8e'],

    chart: {
        type: 'bar',
        toolbar: { show: false }
    },

    tooltip: {
        y: {
            formatter: function (val, { dataPointIndex, w }) {
                const item = w.config.series[0].data[dataPointIndex]

                const from = item.x?.[0] || ''
                const to = item.x?.[1] || ''

                return `${from} - ${to}: ${val}`
            }
        }
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

const formatRouteData = (tableData) => {
    const map = {}

    tableData.forEach(item => {
        const from = item.from
        const to = item.to

        if (!from || !to) return

        const key = `${from}__${to}`

        if (!map[key]) {
            map[key] = {
                x: [from, to],
                y: 0
            }
        }

        map[key].y++
    })

    return Object.values(map)
}

onMounted(async () => {
    await getTableData()
    seriesTerritories.value = []
    await nextTick(() => {
        seriesTerritories.value = [{
            name: "Foiz ko'rsatkich",
            data: formatRouteData(tableData.value)
        }]
    })
})

</script>

<style scoped>

</style>