<template>
    <div class="w-full">
        <div class="w-full flex justify-around items-center">
            <div class="w-1/3">
                <p class="text-lg font-medium text-center !mb-3 text-gray-800">Foiz samaradorligi Ko'rsatkichi</p>
                <apexchart type="bar" height="300" :series="series" :options="options" />
            </div>
            <div>
                <p class="text-lg font-medium text-center !mb-3 text-gray-800">Foiz samaradorligi eng past hudud</p>
<!--                <apexchart type="donut" height="300" :series="seriesGenderChart" :options="genderChartOptions" />-->
            </div>
        </div>

        <p class="text-xl font-medium text-center !mb-3 !mt-5 text-gray-800">Yuklar hisobotlari (Hududlar kesimida)</p>
        <table class="w-full h-full bg-white !border overflow-x-auto">
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
            <tr>
                <td>Samarqand</td>
                <td>7</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
                <td>4</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Farg'ona</td>
                <td>7</td>
                <td>5</td>
                <td>3</td>
                <td>3</td>
                <td>4</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Andijon</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
                <td>4</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from "vue"


const series = [{
    data: [
        {
            x: 'Samarqand',
            y: 20
        },
        {
            x: 'Toshkent',
            y: 7
        },
        {
            x: 'Buxoro',
            y: 3
        },
        {
            x: 'Farg\'ona',
            y: 18
        },
        {
            x: 'Andijon',
            y: 34
        },
        {
            x: 'Namangan',
            y: 8
        },
        {
            x: 'Jizzax',
            y: 24
        }
    ]
}]

const options = ref({
    plotOptions: {
        bar: {

        }
    },
    chart: {
        type: 'bar',
        toolbar: { show: false }
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

.shadow-lg {
    --tw-shadow: 0 0 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow); }
</style>