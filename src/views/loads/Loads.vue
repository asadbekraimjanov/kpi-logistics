<template>
    <div class="w-full h-full !p-4">
        <div class="w-full flex justify-between items-center">
            <div class="w-full flex items-center gap-2">
                <img src="/tabler-icons/mail-fast.svg" alt="">
                <p class="text-gray-800 font-semibold">Yuk ulanishi</p>
                <el-select class="!w-48 !ml-2" placeholder="dispatcher@gmail.com" clearable></el-select>
                <p class="text-gray-800 font-semibold !ml-6">
                    Topilgan yuklar:
                    <span class=" text-2xl font-bold text-blue-500 !ml-2">{{ tableData.length }}</span>
                </p>
                <div class="flex flex-col !mx-4 !ml-10">
                    <p class=" w-full flex justify-between gap-4 leading-[15px] italic text-sm text-gray-800">
                        Yakunlangan: <span class="font-bold not-italic text-[#577eff]">
                    {{ tableData.filter(e => e.status === 'DONE').length }}</span></p>
                    <p class=" w-full flex justify-between gap-4 leading-[15px] italic text-sm text-gray-800">
                        Jarayonda: <span class="font-bold not-italic text-green-600">{{ tableData.filter(e => e.status === 'ACTIVE').length }}</span></p>
                </div>
                <div class="flex flex-col !mx-4">
                    <p class=" w-full flex justify-between gap-4 leading-[15px] italic text-sm text-gray-800">
                        To'lmagan mashinalar: <span class="delay-300 font-bold not-italic" :class="tableData.filter(e => e.status === 'ACTIVE'
                                && e.carStatus.toUpperCase() === 'EMPTY').length === 0 ? 'text-[#577eff]' : 'text-red-500 animate-pulse'">
                    {{ tableData.filter(e => e.status === 'ACTIVE' && e.carStatus.toUpperCase() === 'EMPTY').length }}</span></p>
                    <p class=" w-full flex justify-between gap-4 leading-[15px] italic text-sm text-gray-800">
                        To'la yuk ortilgan: <span class="font-bold not-italic text-green-600">
                    {{ tableData.filter(e => e.status === 'ACTIVE' && e.carStatus.toUpperCase() === 'FULL').length }}</span></p>
                </div>
            </div>
            <el-button :icon="Plus" type="primary" class="!bg-blue-500">Yuk qo'shish</el-button>
        </div>
        <div class="w-full flex items-center gap-2 bg-slate-400 !py-1.5 !px-3 !mt-2 rounded-md">
            <el-input placeholder="Masofa" clearable />
            <el-input placeholder="Yuk bahosi" clearable />
            <el-input placeholder="Yuk miqdori" clearable />
            <el-input placeholder="Mashina holati" clearable />
            <el-input placeholder="Holati" clearable />
            <el-select placeholder="Yuk mashinasi" clearable></el-select>
            <el-input placeholder="Kompaniya" clearable />
            <el-date-picker type="daterange" v-model="filterDateRange" start-placeholder="dan" end-placeholder="gacha"></el-date-picker>
            <el-button type="primary" class="!bg-blue-500" :icon="Search"></el-button>
        </div>
    </div>
    <el-table :data="tableData" :row-style="tableRowStyle" style="height: calc(100vh - 12.6rem);">
        <el-table-column label="Masofa" align="center" width="100">
            <template #default="scope">
                <p class="font-bold text-[#2558b3] !pr-2 !border-r !border-gray-300">{{ scope.row.distance }} km</p>
            </template>
        </el-table-column>
        <el-table-column label="Bahosi" width="130">
            <template #default="scope">
                <p class="font-bold !pr-2 !border-r !border-gray-300 flex items-center justify-between">
                    <span>${{ scope.row.price }}</span>
                    <img src="/tabler-icons/coin.svg" alt="">
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="tax" label="Chiqim" align="center" header-align="left" width="110">
            <template #default="scope">
                <p class="font-bold !pr-2 !border-r !border-gray-300 flex items-center justify-between">
                    <span>${{ scope.row.tax }}</span>
                    <span class="font-normal text-sm" :class="(+scope.row.tax / +scope.row.price) * 100 <= 1 ?
                                'text-green-500' : (+scope.row.tax / +scope.row.price) * 100 > 7 ? 'text-red-500' : ''"
                    >({{ new Intl.NumberFormat('ru-RU', {
                        minimumFractionDigits: 1,maximumFractionDigits: 1
                    }).format((+scope.row.tax / +scope.row.price) * 100) }}%)</span>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="" label="Marshrut" width="220">
            <template #default="scope">
                <div class="flex items-center justify-between gap-2">
                    <p class="leading-[12px] font-semibold">{{ scope.row.from }}</p>
                    <img src="/tabler-icons/arrow-right-circle.svg" alt="">
                    <p class="leading-[12px] font-semibold">{{ scope.row.to }}</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="weight" label="Yuk miqdori" align="center">
            <template #default="scope">
                {{ scope.row.weight }} kg
            </template>
        </el-table-column>
        <el-table-column prop="carStatus" label="Yuk mashina holati" class-name="font-medium" width="120" />
        <el-table-column prop="status" label="Holati" width="100">
            <template #default="scope">
                <el-tag :type="scope.row.status === 'ACTIVE' ? 'primary' : 'success'">{{ scope.row.status }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="" label="Reys vaqti" align="center" min-width="130">
            <template #default="scope">
                <p class="w-full flex gap-2">
                    <img src="/tabler-icons/arrow-right-circle.svg" alt="">
                    <span>Boshlanish: </span>
                    <span>{{ moment(scope.row.fligthTime[0]).format('DD.MM.YYYY') }}</span>
                </p>
                <p class="w-full flex gap-2">
                    <img src="/tabler-icons/arrow-left-circle.svg" alt="">
                    <span>Tugash: </span>
                    <span v-if="scope.row.status === 'DONE'">{{ moment(scope.row.fligthTime[1], 'DD-MM-YYYY').format('DD.MM.YYYY') }}</span>
                    <span v-else class="text-green-800 font-medium italic">Jarayonda</span>
                </p>
            </template>
        </el-table-column>
        <el-table-column label="Yuk mashinasi" width="120">
            <template #default="scope">
                <div class="flex items-center gap-2">
                    <img src="/tabler-icons/truck.svg" alt="">
                    <p>{{ scope.row.carType }}</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Kompaniya" width="150">
            <template #default="scope">
                <p class="font-bold text-[#2558b3]">{{ scope.row.company }}</p>
            </template>
        </el-table-column>
        <el-table-column label="Kontakt" min-width="130">
            <template #default="scope">
                <p class="font-bold text-[#2558b3]">{{ scope.row.contact }}</p>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import {ref} from "vue";
import moment from "moment";
import {Plus, Search} from "@element-plus/icons-vue";

const filterDateRange = ref('')
const tableData = ref([
    {
        id: 1,
        distance: '230',
        price: '5000',
        tax: '200',
        from: 'Uzbekistan',
        to: 'New Zealand',
        carType: 'ISUZU 4',
        carStatus: 'Full',
        status: 'ACTIVE',
        fligthTime: ['12-04-2026', '20-04-2026'],
        company: 'BVB Freight',
        weight: '566',
        contact: 'example@bvbfreight.com'
    },
    ...Array.from({ length: 19 }, (_, i) => {
        const id = i + 2
        return {
            id,
            distance: String(100 + id * 15),
            price: String(3000 + id * 700),
            tax: String(((id % 5) + 1)*100),
            from: ['Uzbekistan', 'Kazakhstan', 'Russia', 'China'][id % 4],
            to: ['Germany', 'Turkey', 'UAE', 'South Korea'][id % 4],
            carType: ['ISUZU 3', 'ISUZU 5', 'ISUZU 7', 'ISUZU FVR'][id % 4],
            carStatus: id % 2 === 0 ? 'Full' : 'Empty',
            status: ['ACTIVE', 'DONE'][id % 2],
            fligthTime: [
                `0${(id % 9) + 1}-04-2026`,
                `${10 + (id % 10)}-04-2026`
            ],
            company: ['BVB Freight', 'Global Cargo', 'Asia Trans', 'LogiX'][id % 4],
            weight: String(100 + id * 20),
            contact: `user${id}@logistics.com`
        }
    })
])


const tableRowStyle = ({ rowIndex }) => {
    if (rowIndex % 2 === 0) {
        return { backgroundColor: '#ffffff' }
    }
    return { backgroundColor: '#f9fafb' }
}
</script>

<style scoped>


</style>