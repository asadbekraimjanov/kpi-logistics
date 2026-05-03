<template>
    <div class="w-full">

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