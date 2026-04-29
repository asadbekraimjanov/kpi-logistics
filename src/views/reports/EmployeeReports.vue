<template>
    <div class="w-full">
        <p class="text-xl font-medium text-center !mb-3 text-gray-800">Hodim ko'rsatkichlari</p>
        <table class="w-full h-full bg-white !border overflow-x-auto">
            <thead class="bg-gray-100 text-[#3b434e]">
            <tr>
                <th rowspan="2">Jami hodimlar</th>
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
                <th>37</th>
                <th>22</th>
                <th>15</th>
                <th>15</th>
                <th>6</th>
                <th>13</th>
                <th>2</th>
                <th class="text-red-600 animate-pulse">1</th>
            </tr>
            </tbody>
        </table>

        <p class="text-xl font-medium text-center !mb-3 !mt-5 text-gray-800">Haydovchi xavf hisobotlari</p>
        <table class="w-full h-full bg-white !border overflow-x-auto">
            <thead class="bg-gray-100 text-[#3b434e]">
            <tr>
                <th>Jami</th>
                <th>Yo‘l harakatini ko‘p buzadigan haydovchilar</th>
                <th>Marshrutdan ko‘p og‘adiganlar</th>
                <th>Tezlikni ko'p buzadigan hodimlar</th>
                <th>Haydovchilik guvohnomasi muddati kelganlar</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th></th>
                <th></th>
                <th></th>
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
th {
    text-align: center;
}
thead td {
    font-weight: 500;
}
</style>