<template>
    <div class="w-full h-[calc(100vh-4.6rem)] !p-4 overflow-y-auto">
        <div class="w-full flex justify-between items-center !border-b !border-slate-300 !pb-2">
            <div class="flex items-center gap-3">
                <p class="text-gray-800 text-xl font-medium">Jami marshrutlar: <span class="text-xl !ml-1 text-blue-700 font-bold">{{ tableData.length }}</span></p>
                <p class="text-gray-800 text-xl font-medium !mx-10">Aktiv marshrutlar:
                        <span class="text-xl !ml-1 text-green-600 font-bold">{{ tableData.filter(e => e.status === 'ACTIVE').length }}</span></p>
            </div>
            <div class="flex items-center gap-3">
                <el-select v-model="selectedRoute" @change="onRouteChange" class="!w-44" value-key="contact" placeholder="Marshrutni tanlang">
                    <el-option v-for="item in tableData" :label="item.contact" :value="item.contact" />
                </el-select>
                <el-select v-model="selectedStatus" @change="onStatusChanged" class="!w-40" >
                    <el-option label="Barchasi" value="ALL" />
                    <el-option label="Aktiv" value="ACTIVE" />
                    <el-option label="Yakunlangan" value="DONE" />
                    <el-option label="Rad etilgan" value="REJECTED" />
                </el-select>
                <el-button @click="dialog.open()" :icon="Plus" type="primary">Yaratish</el-button>
                <el-button :icon="isDark ? Moon : Sunny" @click="isDark = !isDark" type="primary" :class="isDark ? '!bg-[#2050a6]' : '!bg-[#FE9E02]'"
                           class="!border-none !w-10 !h-10 !text-lg" round></el-button>
            </div>
        </div>

        <div class="!mt-1 flex justify-between">
            <el-table v-loading="loading" @cell-click="onRowClicked" :data="tableData" :row-style="tableRowStyle" :style="tableDraw ? 'height: 25rem' : 'height: 11.4rem'">
                <el-table-column label="Masofa" align="center" width="100">
                    <template #default="scope">
                        <p>{{ scope.row.total_distance }} km</p>
                    </template>
                </el-table-column>
                <el-table-column label="Bosib o'tilgan masofa" align="center" width="130">
                    <template #default="scope">
                        <p>{{ scope.row.distance_shot_traveled }} km</p>
                    </template>
                </el-table-column>
                <el-table-column label="Marshrut og'ish masofasi" align="center">
                    <template #default="scope">
                        <p class="font-bold" :class="scope.row.distance_shot_traveled - scope.row.total_distance > 15 ? 'text-red-500' : scope.row.distance_shot_traveled - scope.row.total_distance < 0 ? 'text-green-600' : ''">
                            {{ scope.row.distance_shot_traveled - scope.row.total_distance }} km
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="Boshlanish vaqti">
                    <template #default="scope">
                        {{ moment(scope.row.startDate).format('DD.MM.YYYY') }}
                    </template>
                </el-table-column>
                <el-table-column label="Tugash vaqti">
                    <template #default="scope">
                        {{ moment(scope.row.endDate).format('DD.MM.YYYY') }}
                    </template>
                </el-table-column>
                <el-table-column label="Kutilayotgan tugash vaqti">
                    <template #default="scope">
                        {{ moment(scope.row.expectedEndDate).format('DD.MM.YYYY') }}
                    </template>
                </el-table-column>
                <el-table-column label="Kechikish vaqti">
                    <template #default="scope">
                        <p class="font-medium" >
                            {{ moment(scope.row.expectedEndDate).diff(moment(scope.row.endDate), 'days') > 0 ? moment(scope.row.expectedEndDate)
                            .diff(moment(scope.row.endDate), 'days') + ' kun erta kelgan' : moment(scope.row.expectedEndDate)
                            .diff(moment(scope.row.endDate), 'days') === 0 ? 'vaqtida kelgan' : moment(scope.row.expectedEndDate)
                            .diff(moment(scope.row.endDate), 'days')*-1 + ' kun' }}
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
                <el-table-column label="Haydovchi">
                    <template #default="scope">{{ scope.row.driver.full_name }}</template>
                </el-table-column>
                <el-table-column prop="status" label="Holati" width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.status === 'ACTIVE' ? 'primary' : scope.row.status === 'DONE' ? 'success' : 'danger'" >{{ scope.row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Kontakt">
                    <template #default="scope">
                        <p class="font-bold text-[#2558b3]">{{ scope.row.contact }}</p>
                    </template>
                </el-table-column>
            </el-table>
            <div class="h-full flex items-end">
                <el-button @click="tableDraw = !tableDraw" :icon="tableDraw ? ArrowUpBold : ArrowDownBold" type="primary" round class="!w-8"></el-button>
            </div>
        </div>

        <div class="w-full h-[70%]">
            <RouteMapComponent :dark="isDark" :from="rowData?.from" :to="rowData?.to" :truck-point="rowData?.truck_point" />
        </div>

        <RoutesDialogComponent @save="save" ref="dialog" />
    </div>
</template>

<script setup>
import RouteMapComponent from "@/views/routes/RouteMapComponent.vue";
import {ArrowDownBold, ArrowUpBold, Moon, Plus, Sunny} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import moment from "moment";
import RoutesDialogComponent from "@/views/routes/RoutesDialogComponent.vue";
import TransportDialogComponent from "@/views/transport/TransportDialogComponent.vue";
import axios from "axios";
import {ElMessage} from "element-plus";


const isDark = ref(true)
const tableDraw = ref(false)
const loading = ref(false)
const dialog = ref(null)
const selectedStatus = ref('ALL')
const tableData = ref([])
const stateTableData = ref([])
const rowData = ref()
const selectedRoute = ref()

const tableRowStyle = ({ rowIndex }) => {
    if (rowIndex % 2 === 0) {
        return { backgroundColor: '#ffffff' }
    }
    return { backgroundColor: '#f9fafb' }
}

const onRouteChange = () => {
    if (selectedRoute.value) {
        rowData.value = tableData.value.filter(e => e.contact === selectedRoute.value)[0]
    } else {
        rowData.value = tableData.value[0]
    }
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
        case 'REJECTED': {
            tableData.value = stateTableData.value.filter(e => e.status === selectedStatus.value);break;
        }
    }
}

const save = async () => {
    await getTableData()
}

const onRowClicked = (row) => {
    rowData.value = row
    selectedRoute.value = row.driver
}

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

onMounted(async () => {
    await getTableData()
    stateTableData.value = tableData.value
    rowData.value = tableData?.value[0]
    selectedRoute.value = rowData.value.contact
})


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