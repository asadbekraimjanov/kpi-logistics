<template>
    <div class="w-full">
        <div class="w-full flex justify-around items-center">
            <div class="w-full">
                <p class="text-lg font-medium text-center !mb-3 text-gray-800">Hududiy reyting</p>
                <apexchart type="bar" height="300" :series="series" :options="options" />
            </div>
        </div>

        <p class="text-xl font-medium text-center !mb-3 !mt-5 text-gray-800">Marshrutlar hisobotlari</p>
        <table class="w-full h-full bg-white !border overflow-x-auto">
            <thead class="bg-gray-100 text-[#3b434e]">
            <tr>
                <th>Yo'nalish</th>
                <th>Reyslar soni</th>
                <th>Yuk qiymati</th>
                <th>Qaytarilgan reyslar soni</th>
                <th>Mamnunlik darajasi (%)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Samarqand</td>
                <td>7</td>
                <td>5</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Farg'ona</td>
                <td>7</td>
                <td>5</td>
                <td>3</td>
                <td>3</td>
            </tr>
            <tr>
                <td>Andijon</td>
                <td>7</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {ref} from "vue";

const series = [{
    name: 'Foiz ko\'rsatkich',
    data: [
        { x: ['Toshkent', 'Samarqand'], y: 45 },
        { x: ['Buxoro', 'Xorazm'], y: 72 },
        { x: ['Farg\'ona', 'Andijon'], y: 88 },
        { x: ['Namangan', 'Qashqadaryo'], y: 61 },
        { x: ['Surxondaryo', 'Jizzax'], y: 93 },
        { x: ['Sirdaryo', 'Navoiy'], y: 37 },
        { x: ['Toshkent', 'Buxoro'], y: 54 },
        { x: ['Samarqand', 'Farg\'ona'], y: 79 },
        { x: ['Andijon', 'Namangan'], y: 26 },
        { x: ['Qashqadaryo', 'Surxondaryo'], y: 97 },
        { x: ['Xorazm', 'Sirdaryo'], y: 68 },
        { x: ['Navoiy', 'Jizzax'], y: 41 },
        { x: ['Toshkent', 'Andijon'], y: 83 },
        { x: ['Buxoro', 'Namangan'], y: 29 },
        { x: ['Farg\'ona', 'Xorazm'], y: 90 }
    ]
}]
const options = ref({
    plotOptions: {
        bar: {
            horizontal: false
        }
    },
    colors: ['#2b6b8e'],
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