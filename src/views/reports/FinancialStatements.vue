<template>
    <div class="w-full relative">
        <el-select v-model="currentYear" class="!w-20 !absolute right-0">
            <el-option label="2026" value="2026"/>
        </el-select>

        <div class="w-full flex justify-around items-center">
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
        <table class="w-full h-full bg-white !border overflow-x-auto">
            <thead class="bg-gray-100 text-[#3b434e]">
            <tr>
                <th>Davr</th>
                <th>Korxonada aylangan pul miqdori</th>
                <th>Kelib tushgan foyda</th>
                <th>Ajratilgan chiqim</th>
                <th>Yoqilg'i sarfi</th>
                <th>Korilgan daromad (% da)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Yanvar</td>
                <td>7</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Fevral</td>
                <td>7</td>
                <td>5</td>
                <td>3</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Mart</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Aprel</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>May</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Iyun</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Iyul</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Avgust</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Sentyabr</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Oktyabr</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Noyabr</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Dekabr</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {ref} from "vue";

const currentYear = ref('2026')


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

    colors: ['#2b6b8e', '#2b8e74', '#8e2b3d'],

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

const seriesTotal = ref([153800, 98600, 3500])
const optionsTotal = ref({
    labels: ['Aylangan pul miqdori', 'Kelib tushgan foyda', 'Ajratilgan chiqim'],

    colors: ['#2b6b8e', '#2b8e74', '#8e2b3d'],

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
                        formatter: (val) => {
                            return new Intl.NumberFormat('ru-RU').format(val) + ' $'
                        }
                    },

                    total: {
                        show: true,
                        label: 'Daromad',
                        fontSize: '14px',
                        color: '#6b7280',
                        formatter: function () {
                            return '78%'
                        }
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