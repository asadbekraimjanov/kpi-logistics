<template>
    <div class="w-full h-[calc(100vh-4.6rem)] !p-4 overflow-y-auto">
        <div class="w-full flex justify-between items-center !border-b !border-slate-300 !pb-2">
            <div class="flex items-center gap-3">
                <p class="text-gray-800 text-xl font-medium">Jami marshrutlar: <span class="text-xl !ml-1 text-blue-700 font-bold">{{ tableData.length }}</span></p>
                <p class="text-gray-800 text-xl font-medium !mx-10">Aktiv marshrutlar:
                        <span class="text-xl !ml-1 text-green-600 font-bold">{{ tableData.filter(e => e.status === 'ACTIVE').length }}</span></p>
            </div>
            <div class="flex items-center gap-3">
                <el-select v-model="selectedRoute" @change="onRouteChange" class="!w-44" placeholder="Marshrutni tanlang" clearable>
                    <el-option v-for="item in tableData" :label="item.drayver" :value="item.drayver" />
                </el-select>
                <el-select v-model="selectedStatus" @change="onStatusChanged" class="!w-40" >
                    <el-option label="Barchasi" value="ALL" />
                    <el-option label="Aktiv" value="ACTIVE" />
                    <el-option label="Yakunlangan" value="DONE" />
                </el-select>
                <el-button :icon="isDark ? Moon : Sunny" @click="isDark = !isDark" type="primary" :class="isDark ? '!bg-[#2050a6]' : '!bg-[#FE9E02]'"
                           class="!border-none !w-10 !h-10 !text-lg" round></el-button>
            </div>
        </div>

        <div class="!mt-1 flex justify-between">
            <el-table @cell-click="onRowClicked" :data="tableData" :row-style="tableRowStyle" :style="tableDraw ? 'height: 25rem' : 'height: 11.4rem'">
                <el-table-column label="Masofa" align="center" width="100">
                    <template #default="scope">
                        <p>{{ scope.row.jami_masofa }} km</p>
                    </template>
                </el-table-column>
                <el-table-column label="Bosib o'tilgan masofa" align="center" width="130">
                    <template #default="scope">
                        <p>{{ scope.row.bosib_otilgan_masofa }} km</p>
                    </template>
                </el-table-column>
                <el-table-column label="Marshrut og'ish masofasi" align="center">
                    <template #default="scope">
                        <p class="font-bold" :class="scope.row.bosib_otilgan_masofa - scope.row.jami_masofa > 15 ? 'text-red-500' : scope.row.bosib_otilgan_masofa - scope.row.jami_masofa < 0 ? 'text-green-600' : ''">
                            {{ scope.row.bosib_otilgan_masofa - scope.row.jami_masofa }} km
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="Boshlanish vaqti">
                    <template #default="scope">
                        {{ moment(scope.row.boshlanish_vaqti).format('DD.MM.YYYY') }}
                    </template>
                </el-table-column>
                <el-table-column label="Tugash vaqti">
                    <template #default="scope">
                        {{ moment(scope.row.tugash_vaqti).format('DD.MM.YYYY') }}
                    </template>
                </el-table-column>
                <el-table-column label="Kutilayotgan tugash vaqti">
                    <template #default="scope">
                        {{ moment(scope.row.kutilayotgan_tugash_vaqti).format('DD.MM.YYYY') }}
                    </template>
                </el-table-column>
                <el-table-column label="Kechikish vaqti">
                    <template #default="scope">
                        <p class="font-medium" >
                            {{ moment(scope.row.kutilayotgan_tugash_vaqti).diff(moment(scope.row.tugash_vaqti), 'days') > 0 ? moment(scope.row.kutilayotgan_tugash_vaqti)
                            .diff(moment(scope.row.tugash_vaqti), 'days') + ' kun erta kelgan' : moment(scope.row.kutilayotgan_tugash_vaqti)
                            .diff(moment(scope.row.tugash_vaqti), 'days') === 0 ? 'vaqtida kelgan' : moment(scope.row.kutilayotgan_tugash_vaqti)
                            .diff(moment(scope.row.tugash_vaqti), 'days')*-1 + ' kun' }}
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
                <el-table-column prop="status" label="Holati" width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.status === 'ACTIVE' ? 'primary' : 'success'">{{ scope.row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Kontakt" class="">
                    <template #default="scope">
                        <p class="font-bold text-[#2558b3]">{{ scope.row.drayver }}</p>
                    </template>
                </el-table-column>
            </el-table>
            <div class="h-full flex items-end">
                <el-button @click="tableDraw = !tableDraw" :icon="tableDraw ? ArrowUpBold : ArrowDownBold" type="primary" round class="!w-8"></el-button>
            </div>
        </div>

        <div class="w-full h-[70%]">
            <RouteMapComponent :dark="isDark" :from="rowData.from" :to="rowData.to" :truck-point="rowData.truck_point" />
        </div>
    </div>
</template>

<script setup>
import RouteMapComponent from "@/views/routes/RouteMapComponent.vue";
import {ArrowDownBold, ArrowUpBold, Moon, Sunny} from "@element-plus/icons-vue";
import {ref} from "vue";
import moment from "moment";


const isDark = ref(true)
const tableDraw = ref(false)
const selectedStatus = ref('ALL')
const tableData = ref([
    {
        id: 1,
        from: "Tashkent, Uzbekistan",
        to: "Samarkand, Uzbekistan",
        truck_point: [67.85, 39.95],
        jami_masofa: 230,
        bosib_otilgan_masofa: 120,
        boshlanish_vaqti: "2026-04-11",
        kutilayotgan_tugash_vaqti: "2026-04-21",
        tugash_vaqti: "2026-04-21",
        drayver: "driver1@gmail.com",
        status: "ACTIVE"
    },
    {
        id: 2,
        from: "Tashkent, Uzbekistan",
        to: "Bukhara, Uzbekistan",
        truck_point: [66.95, 40.10],
        jami_masofa: 600,
        bosib_otilgan_masofa: 340,
        boshlanish_vaqti: "2026-04-10",
        kutilayotgan_tugash_vaqti: "2026-04-20",
        tugash_vaqti: "2026-04-22",
        drayver: "driver2@gmail.com",
        status: "ACTIVE"
    },
    {
        id: 3,
        from: "Samarkand, Uzbekistan",
        to: "Khiva, Uzbekistan",
        truck_point: [63.75, 41.10],
        jami_masofa: 850,
        bosib_otilgan_masofa: 500,
        boshlanish_vaqti: "2026-04-09",
        kutilayotgan_tugash_vaqti: "2026-04-22",
        tugash_vaqti: "2026-04-20",
        drayver: "driver3@gmail.com",
        status: "ACTIVE"
    },
    {
        id: 4,
        from: "Andijan, Uzbekistan",
        to: "Tashkent, Uzbekistan",
        truck_point: [70.55, 40.82],
        jami_masofa: 300,
        bosib_otilgan_masofa: 280,
        boshlanish_vaqti: "2026-04-08",
        kutilayotgan_tugash_vaqti: "2026-04-09",
        tugash_vaqti: "2026-04-09",
        drayver: "driver4@gmail.com",
        status: "DONE"
    },
    {
        id: 5,
        from: "Namangan, Uzbekistan",
        to: "Samarkand, Uzbekistan",
        truck_point: [68.95, 40.55],
        jami_masofa: 400,
        bosib_otilgan_masofa: 200,
        boshlanish_vaqti: "2026-04-12",
        kutilayotgan_tugash_vaqti: "2026-04-18",
        tugash_vaqti: "2026-04-22",
        drayver: "driver5@gmail.com",
        status: "ACTIVE"
    },
    {
        id: 6,
        from: "Tashkent, Uzbekistan",
        to: "Fergana, Uzbekistan",
        truck_point: [70.35, 40.72],
        jami_masofa: 350,
        bosib_otilgan_masofa: 180,
        boshlanish_vaqti: "2026-04-13",
        kutilayotgan_tugash_vaqti: "2026-04-17",
        tugash_vaqti: "2026-04-17",
        drayver: "driver6@gmail.com",
        status: "ACTIVE"
    },
    {
        id: 7,
        from: "Bukhara, Uzbekistan",
        to: "Nukus, Uzbekistan",
        truck_point: [61.85, 42.20],
        jami_masofa: 700,
        bosib_otilgan_masofa: 420,
        boshlanish_vaqti: "2026-04-07",
        kutilayotgan_tugash_vaqti: "2026-04-19",
        tugash_vaqti: "2026-04-21",
        drayver: "driver7@gmail.com",
        status: "ACTIVE"
    },
    {
        id: 8,
        from: "Khiva, Uzbekistan",
        to: "Tashkent, Uzbekistan",
        truck_point: [65.25, 41.05],
        jami_masofa: 900,
        bosib_otilgan_masofa: 900,
        boshlanish_vaqti: "2026-04-01",
        kutilayotgan_tugash_vaqti: "2026-04-10",
        tugash_vaqti: "2026-04-10",
        drayver: "driver8@gmail.com",
        status: "DONE"
    },
    {
        id: 9,
        from: "Samarkand, Uzbekistan",
        to: "Andijan, Uzbekistan",
        truck_point: [69.85, 40.98],
        jami_masofa: 500,
        bosib_otilgan_masofa: 250,
        boshlanish_vaqti: "2026-04-14",
        kutilayotgan_tugash_vaqti: "2026-04-20",
        tugash_vaqti: "2026-04-21",
        drayver: "driver9@gmail.com",
        status: "ACTIVE"
    },
    {
        id: 10,
        from: "Tashkent, Uzbekistan",
        to: "Termez, Uzbekistan",
        truck_point: [67.55, 38.55],
        jami_masofa: 700,
        bosib_otilgan_masofa: 300,
        boshlanish_vaqti: "2026-04-15",
        kutilayotgan_tugash_vaqti: "2026-04-25",
        tugash_vaqti: "2026-04-21",
        drayver: "driver10@gmail.com",
        status: "ACTIVE"
    }
])
const stateTableData = ref(tableData.value)
const rowData = ref(tableData.value[0])
const selectedRoute = ref(rowData.value.drayver)

const tableRowStyle = ({ rowIndex }) => {
    if (rowIndex % 2 === 0) {
        return { backgroundColor: '#ffffff' }
    }
    return { backgroundColor: '#f9fafb' }
}

const onRouteChange = () => {
    rowData.value = tableData.value.filter(e => e.drayver === selectedRoute.value)[0]
}

const onStatusChanged = () => {
    switch (selectedStatus.value) {
        case 'ALL': {
            tableData.value = stateTableData.value;break;
        }
        case 'ACTIVE': {
            tableData.value = stateTableData.value.filter(e => e.status === selectedStatus.value);break;
        }
        case 'DONE': {
            tableData.value = stateTableData.value.filter(e => e.status === selectedStatus.value);break;
        }
    }
}

const onRowClicked = (row) => {
    rowData.value = row
    selectedRoute.value = row.drayver
}
</script>

<style>
.truck-marker {
    width: 40px;
    height: 40px;
    background-image: url('/truck-on-map.png');
    background-size: 84px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #9dc3ff;
    border-radius: 50%;
}

a.mapboxgl-ctrl-logo {
    background-image: none;
}
.mapboxgl-ctrl-attrib-inner {
    display: none;
}
</style>