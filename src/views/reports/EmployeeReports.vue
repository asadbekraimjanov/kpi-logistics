<template>
    <div class="w-full">
        <div class="w-full flex justify-around items-center">
            <div class="w-1/3">
                <p class="text-center text-lg font-medium">Rag'bat va intizomiy jazo olganlik ko'rsatkichlari</p>
                <apexchart type="bar" height="300" :series="seriesEmployee" :options="employeeChartOptions" />
            </div>
            <div>
                <p class="text-center text-lg font-medium">Jinsi bo'yicha tahlil</p>
                <apexchart type="donut" height="300" :series="seriesGenderChart" :options="genderChartOptions" />
            </div>
        </div>

        <p class="text-xl font-medium text-center !mb-3 text-gray-800">Hodim ko'rsatkichlari</p>
        <table class="w-full h-full bg-white !border overflow-x-auto">
            <thead class="bg-gray-100 text-[#3b434e]">
            <tr>
                <th rowspan="2">№</th>
                <th rowspan="2">Lavozim</th>
                <th rowspan="2">Hodimlar soni</th>
                <th colspan="4">Shundan</th>
                <th rowspan="2">Rag'batlantirilgan hodimlar</th>
                <th rowspan="2">Rag'batlantirilishi kerak bo'lgan hodimlar</th>
                <th rowspan="2">Intizomiy jazo olgan hodimlar</th>
            </tr>
            <tr>
                <th>Erkak hodimlar</th>
                <th> Ayol hodimlar</th>
                <th>Topshiriqni o'z vaqtida bajaruvchi</th>
                <th>O'z vaqtida bajarmayotganlar</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Dispetcher</td>
                <td>37</td>
                <td>22</td>
                <td>15</td>
                <td>15</td>
                <td>6</td>
                <td>13</td>
                <td>2</td>
                <td>1</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Analitik</td>
                <td>37</td>
                <td>22</td>
                <td>15</td>
                <td>15</td>
                <td>6</td>
                <td>13</td>
                <td>2</td>
                <td>1</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Haydovchi</td>
                <td>37</td>
                <td>22</td>
                <td>15</td>
                <td>15</td>
                <td>6</td>
                <td>13</td>
                <td>2</td>
                <td>1</td>
            </tr>
            </tbody>
        </table>

        <p class="text-xl font-medium text-center !mb-3 !mt-5 text-gray-800">Haydovchi xavf hisobotlari</p>
        <table class="w-full h-full bg-white !border overflow-x-auto">
            <thead class="bg-gray-100 text-[#3b434e]">
            <tr>
                <th>Staji</th>
                <th>Yo‘l harakatini ko‘p buzadigan haydovchilar</th>
                <th>Marshrutdan ko‘p og‘adiganlar</th>
                <th>Tezlikni ko'p buzadigan hodimlar</th>
                <th>Haydovchilik guvohnomasi muddati kelganlar</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1 yillik</td>
                <td>7</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>2 yillik</td>
                <td>7</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>3 yildan ko'p</td>
                <td>7</td>
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

const seriesGenderChart = ref([22, 15])
const genderChartOptions = ref({
    labels: ['Erkak', 'Ayol'],

    colors: ['#2558b3', '#9f3e3e'],

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
                        fontSize: '40px',
                        fontWeight: 600,
                        color: '#2e4250'
                    },

                    total: {
                        show: true,
                        label: 'Jami',
                        fontSize: '16px',
                        color: '#6b7280',
                        formatter: function (w) {
                            return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                        }
                    }
                }
            }
        }
    },

    tooltip: {
        y: {
            formatter: (val) => `${val} ta`
        }
    },

    responsive: [
        {
            breakpoint: 768,
            options: {
                chart: {
                    height: 280
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    ]
})

const seriesEmployee = ref([
    {
        name: 'Hodimlar',
        data: [
            {
                x: 'Rag\'batlantirilgan hodimlar',
                y: 13
            },
            {
                x: ['Rag\'batlantirilishi kerak', 'bo\'lgan hodimlar'],
                y: 3,
            },
            {
                x: 'Intizomiy jazo olgan hodimlar',
                y: 2
            }
        ]
    }
])

const employeeChartOptions = ref({
    chart: {
        type: 'bar',
        toolbar: { show: false }
    },

    colors: ['#2b778e', '#2b778e', '#8e2b3d'],

    plotOptions: {
        bar: {
            horizontal: false,
            distributed: true,
            columnWidth: '45%',
            borderRadius: 6
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