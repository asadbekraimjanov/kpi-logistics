<template>
    <div class="w-full">
        <div class="w-full flex justify-around items-center">
            <div class="w-1/2">
                <p class="text-lg font-medium text-center !mb-3 text-gray-800">Foiz samaradorligi eng yuqori hudud</p>
                <apexchart type="bar" height="300" width="700" :series="seriesHigh" :options="optionsHigh" />
            </div>
            <div class="w-1/2">
                <p class="text-lg font-medium text-center !mb-3 text-gray-800">Foiz samaradorligi eng past hudud</p>
                <apexchart type="bar" height="300" width="700" :series="seriesLow" :options="optionsLow" />
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


const seriesHigh = [{
    name: 'Soni',
    data: [
        {
            x: 'Jami yuk',
            y: 20
        },
        {
            x: 'Yetkazilgan yuklar',
            y: 7
        },
        {
            x: 'Qaytarilgan yuklar',
            y: 3
        },
        {
            x: 'Jarayondagilar',
            y: 18
        },
        {
            x: 'Kechikkan',
            y: 34
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
            y: 20
        },
        {
            x: 'Yetkazilgan yuklar',
            y: 7
        },
        {
            x: 'Qaytarilgan yuklar',
            y: 3
        },
        {
            x: 'Jarayondagilar',
            y: 18
        },
        {
            x: 'Kechikkan',
            y: 34
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