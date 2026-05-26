<template>
    <div class="w-full h-[calc(100vh-100px)] !overflow-y-auto">
        <div class="w-full flex justify-around items-center">
            <div v-if="employeeData.length" class="w-1/3">
                <p class="text-center text-lg font-medium">Rag'bat va intizomiy jazo olganlik ko'rsatkichlari</p>
                <apexchart type="bar" height="300" :series="seriesEmployee" :options="employeeChartOptions" />
            </div>
            <div v-if="employeeData.length">
                <p class="text-center text-lg font-medium">Jinsi bo'yicha tahlil</p>
                <apexchart type="donut" height="300" :series="seriesGenderChart" :options="genderChartOptions" />
            </div>
        </div>

        <p class="text-xl font-medium text-center !mb-3 text-gray-800">Xodim ko'rsatkichlari</p>
        <table v-if="employeeData.length" class="w-full bg-white !border">
            <thead class="bg-gray-100 text-[#3b434e]">
            <tr>
                <th rowspan="2">№</th>
                <th rowspan="2">Lavozim</th>
                <th rowspan="2">Xodimlar soni</th>
                <th colspan="4">Shundan</th>
                <th rowspan="2">Rag'batlantirilgan xodimlar</th>
                <th rowspan="2">Rag'batlantirilishi kerak bo'lgan xodimlar</th>
                <th rowspan="2">Intizomiy jazo olgan xodimlar</th>
            </tr>
            <tr>
                <th>Erkak xodimlar</th>
                <th>Ayol xodimlar</th>
                <th>Topshiriqni o'z vaqtida bajaruvchi</th>
                <th>O'z vaqtida bajarmayotganlar</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Menejer</td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'MANAGER'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'MANAGER').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'MANAGER' && e.gender === 'MALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'MANAGER' && e.gender === 'MALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'MANAGER' && e.gender === 'FEMALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'MANAGER' && e.gender === 'FEMALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'MANAGER' && e.completed_tasks/e.total_tasks*100 >= 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'MANAGER' && e.completed_tasks/e.total_tasks*100 >= 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'MANAGER' && e.completed_tasks/e.total_tasks*100 < 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'MANAGER' && e.completed_tasks/e.total_tasks*100 < 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'MANAGER' && e.has_encourage === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'MANAGER' && e.has_encourage === 1).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'MANAGER' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'MANAGER' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'MANAGER' && e.has_disciplinary === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'MANAGER' && e.has_disciplinary === 1).length }}
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>Dasturchi</td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DEVELOPER'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DEVELOPER').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DEVELOPER' && e.gender === 'MALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DEVELOPER' && e.gender === 'MALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DEVELOPER' && e.gender === 'FEMALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DEVELOPER' && e.gender === 'FEMALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DEVELOPER' && e.completed_tasks/e.total_tasks*100 >= 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DEVELOPER' && e.completed_tasks/e.total_tasks*100 >= 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DEVELOPER' && e.completed_tasks/e.total_tasks*100 < 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DEVELOPER' && e.completed_tasks/e.total_tasks*100 < 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DEVELOPER' && e.has_encourage === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DEVELOPER' && e.has_encourage === 1).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DEVELOPER' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DEVELOPER' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DEVELOPER' && e.has_disciplinary === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DEVELOPER' && e.has_disciplinary === 1).length }}
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td>Operator</td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'OPERATOR'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'OPERATOR').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'OPERATOR' && e.gender === 'MALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'OPERATOR' && e.gender === 'MALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'OPERATOR' && e.gender === 'FEMALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'OPERATOR' && e.gender === 'FEMALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'OPERATOR' && e.completed_tasks/e.total_tasks*100 >= 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'OPERATOR' && e.completed_tasks/e.total_tasks*100 >= 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'OPERATOR' && e.completed_tasks/e.total_tasks*100 < 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'OPERATOR' && e.completed_tasks/e.total_tasks*100 < 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'OPERATOR' && e.has_encourage === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'OPERATOR' && e.has_encourage === 1).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'OPERATOR' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'OPERATOR' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'OPERATOR' && e.has_disciplinary === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'OPERATOR' && e.has_disciplinary === 1).length }}
                </td>
            </tr>
            <tr>
                <td>4</td>
                <td>Analitik</td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'ANALITIK'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'ANALITIK').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'ANALITIK' && e.gender === 'MALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'ANALITIK' && e.gender === 'MALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'ANALITIK' && e.gender === 'FEMALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'ANALITIK' && e.gender === 'FEMALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'ANALITIK' && e.completed_tasks/e.total_tasks*100 >= 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'ANALITIK' && e.completed_tasks/e.total_tasks*100 >= 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'ANALITIK' && e.completed_tasks/e.total_tasks*100 < 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'ANALITIK' && e.completed_tasks/e.total_tasks*100 < 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'ANALITIK' && e.has_encourage === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'ANALITIK' && e.has_encourage === 1).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'ANALITIK' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'ANALITIK' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'ANALITIK' && e.has_disciplinary === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'ANALITIK' && e.has_disciplinary === 1).length }}
                </td>
            </tr>
            <tr>
                <td>5</td>
                <td>Haydovchi</td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DRIVER'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DRIVER').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DRIVER' && e.gender === 'MALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DRIVER' && e.gender === 'MALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DRIVER' && e.gender === 'FEMALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DRIVER' && e.gender === 'FEMALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DRIVER' && e.completed_tasks/e.total_tasks*100 >= 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DRIVER' && e.completed_tasks/e.total_tasks*100 >= 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DRIVER' && e.completed_tasks/e.total_tasks*100 < 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DRIVER' && e.completed_tasks/e.total_tasks*100 < 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DRIVER' && e.has_encourage === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DRIVER' && e.has_encourage === 1).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DRIVER' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DRIVER' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'DRIVER' && e.has_disciplinary === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'DRIVER' && e.has_disciplinary === 1).length }}
                </td>
            </tr>
            <tr>
                <td>6</td>
                <td>Mutaxassis</td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'SPECIALIST'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'SPECIALIST').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'SPECIALIST' && e.gender === 'MALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'SPECIALIST' && e.gender === 'MALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'SPECIALIST' && e.gender === 'FEMALE'))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'SPECIALIST' && e.gender === 'FEMALE').length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'SPECIALIST' && e.completed_tasks/e.total_tasks*100 >= 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'SPECIALIST' && e.completed_tasks/e.total_tasks*100 >= 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'SPECIALIST' && e.completed_tasks/e.total_tasks*100 < 95 ))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'SPECIALIST' && e.completed_tasks/e.total_tasks*100 < 95 ).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'SPECIALIST' && e.has_encourage === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'SPECIALIST' && e.has_encourage === 1).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'SPECIALIST' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'SPECIALIST' && e.has_disciplinary === 0 && (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2).length }}
                </td>
                <td @click="employeesInfoRef.open(employeeData.filter(e => e.position === 'SPECIALIST' && e.has_disciplinary === 1))" class="cursor-pointer hover:bg-blue-100">
                    {{ employeeData.filter(e => e.position === 'SPECIALIST' && e.has_disciplinary === 1).length }}
                </td>
            </tr>
            </tbody>
        </table>

        <p class="text-xl font-medium text-center !mb-3 !mt-5 text-gray-800">Haydovchi xavf hisobotlari</p>
        <table v-if="routesData.length && employeeData.length" class="w-full bg-white !border overflow-x-auto">
            <thead class="bg-gray-100 text-[#3b434e]">
            <tr>
                <th>Staji</th>
                <th>Jami</th>
                <th>Marshrutdan ko‘p og‘adiganlar</th>
                <th>Tezlikni ko'p buzadigan xodimlar</th>
                <th>Haydovchilik guvohnomasi muddati kelganlar</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1 yilgacha</td>
                <td @click="employeesInfoRef.open(driversOneYear)" class="font-normal cursor-pointer hover:bg-blue-100">{{ driversOneYear.length }}</td>
                <td @click="driversInfoRef.open(routesData.filter(r => driversOneYear.some(e => r.driver.id === e.id && r.distance_shot_traveled - r.total_distance > 15)))" class="cursor-pointer hover:bg-blue-100">
                    {{ routesData.filter(r => driversOneYear.some(e => r.driver.id === e.id && r.distance_shot_traveled - r.total_distance > 15)).length }}
                </td>
                <td @click="driversInfoRef.open(routesData.filter(r => driversOneYear.some(e => r.driver.id === e.id && moment(r.expectedEndDate).diff(moment(r.endDate), 'days') >= 2)))" class="cursor-pointer hover:bg-blue-100">
                    {{ routesData.filter(r => driversOneYear.some(e => r.driver.id === e.id && moment(r.expectedEndDate).diff(moment(r.endDate), 'days') >= 2)).length }}
                </td>
                <td @click="employeesInfoRef.open(driversOneYear.filter(e => routesData.some(r => r.driver.id === e.id && moment(e.licence_end_date).diff(moment(), 'days') > 0 && moment(e.licence_end_date).diff(moment(), 'days') < 30)))" class="cursor-pointer hover:bg-blue-100">
                    {{ driversOneYear.filter(e => routesData.some(r => r.driver.id === e.id && moment(e.licence_end_date).diff(moment(), 'days') > 0 && moment(e.licence_end_date).diff(moment(), 'days') < 30)).length }}
                </td>
            </tr>

            <tr>
                <td>2 yilgacha</td>
                <td @click="employeesInfoRef.open(driversTwoYear)" class="font-normal cursor-pointer hover:bg-blue-100">{{ driversTwoYear.length }}</td>
                <td @click="driversInfoRef.open(routesData.filter(r => driversTwoYear.some(e => r.driver.id === e.id && r.distance_shot_traveled - r.total_distance > 15)))" class="cursor-pointer hover:bg-blue-100">
                    {{ routesData.filter(r => driversTwoYear.some(e => r.driver.id === e.id && r.distance_shot_traveled - r.total_distance > 15)).length }}
                </td>
                <td @click="driversInfoRef.open(routesData.filter(r => driversTwoYear.some(e => r.driver.id === e.id && moment(r.expectedEndDate).diff(moment(r.endDate), 'days') >= 2)))" class="cursor-pointer hover:bg-blue-100">
                    {{ routesData.filter(r => driversTwoYear.some(e => r.driver.id === e.id && moment(r.expectedEndDate).diff(moment(r.endDate), 'days') >= 2)).length }}
                </td>
                <td @click="employeesInfoRef.open(driversTwoYear.filter(e => routesData.some(r => r.driver.id === e.id && moment(e.licence_end_date).diff(moment(), 'days') > 0 && moment(e.licence_end_date).diff(moment(), 'days') < 30)))" class="cursor-pointer hover:bg-blue-100">
                    {{ driversTwoYear.filter(e => routesData.some(r => r.driver.id === e.id && moment(e.licence_end_date).diff(moment(), 'days') > 0 && moment(e.licence_end_date).diff(moment(), 'days') < 30)).length }}
                </td>
            </tr>

            <tr>
                <td>3 yil va undan ko'p</td>
                <td @click="employeesInfoRef.open(driversThreeYear)" class="font-normal cursor-pointer hover:bg-blue-100">{{ driversThreeYear.length }}</td>
                <td @click="driversInfoRef.open(routesData.filter(r => driversThreeYear.some(e => r.driver.id === e.id && r.distance_shot_traveled - r.total_distance > 15)))" class="cursor-pointer hover:bg-blue-100">
                    {{ routesData.filter(r => driversThreeYear.some(e => r.driver.id === e.id && r.distance_shot_traveled - r.total_distance > 15)).length }}
                </td>
                <td @click="driversInfoRef.open(routesData.filter(r => driversThreeYear.some(e => r.driver.id === e.id && moment(r.expectedEndDate).diff(moment(r.endDate), 'days') >= 2)))" class="cursor-pointer hover:bg-blue-100">
                    {{ routesData.filter(r => driversThreeYear.some(e => r.driver.id === e.id && moment(r.expectedEndDate).diff(moment(r.endDate), 'days') >= 2)).length }}
                </td>
                <td @click="employeesInfoRef.open(driversThreeYear.filter(e => routesData.some(r => r.driver.id === e.id && moment(e.licence_end_date).diff(moment(), 'days') > 0 && moment(e.licence_end_date).diff(moment(), 'days') < 30)))" class="cursor-pointer hover:bg-blue-100">
                    {{ driversThreeYear.filter(e => routesData.some(r => r.driver.id === e.id && moment(e.licence_end_date).diff(moment(), 'days') > 0 && moment(e.licence_end_date).diff(moment(), 'days') < 30)).length }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <DriversInfoDrawer ref="driversInfoRef" />
    <EmployeesInfoDrawer ref="employeesInfoRef" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import moment from "moment";
import DriversInfoDrawer from "@/views/reports/helpers/DriversInfoDrawer.vue";
import EmployeesInfoDrawer from "@/views/reports/helpers/EmployeesInfoDrawer.vue";

const employeeData = ref([])
const routesData = ref([])
const driversOneYear = ref([])
const driversTwoYear = ref([])
const driversThreeYear = ref([])
const loading = ref(false)
const driversInfoRef = ref(null)
const employeesInfoRef = ref(null)

const seriesGenderChart = ref([])
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
        name: 'Xodimlar',
        data: [
            {
                x: 'Rag\'batlantirilgan xodimlar',
                y: 0
            },
            {
                x: ['Rag\'batlantirilishi kerak', 'bo\'lgan xodimlar'],
                y: 0,
            },
            {
                x: 'Intizomiy jazo olgan xodimlar',
                y: 0
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

const getEmployeeData = async () => {
    loading.value = true

    try {
        employeeData.value = (await axios.get('http://localhost:5555/data')).data
        seriesGenderChart.value[0] = employeeData.value.filter(e => e.gender === 'MALE').length
        seriesGenderChart.value[1] = employeeData.value.filter(e => e.gender === 'FEMALE').length
        seriesEmployee.value[0].data[0].y = employeeData.value.filter(e => e.has_encourage === 1).length
        seriesEmployee.value[0].data[1].y = employeeData.value.filter(e => (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2 && e.has_disciplinary === 0).length
        seriesEmployee.value[0].data[2].y = employeeData.value.filter(e => e.has_disciplinary === 1).length
    } catch {
        ElMessage.error('Xodimlarni yuklashda xatolik')
    } finally {
        loading.value = false
    }
}

const getRoutesData = async () => {
    loading.value = true

    try {
        const res = (await axios.get('https://kpi-logistics-trucks-default-rtdb.firebaseio.com/routes.json')).data
        routesData.value = Object.entries(res).map(([id, value]) => ({id, ...value}))
    } catch {
        ElMessage.error('Marshrutlarni yuklashda xatolik')
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    await getEmployeeData()
    await getRoutesData()
    driversOneYear.value = employeeData.value.filter(e => e.position === 'DRIVER' && moment().diff(moment(e.inSystem), 'years') < 1)
    driversTwoYear.value = employeeData.value.filter(e => e.position === 'DRIVER' && moment().diff(moment(e.inSystem), 'years') >= 1 && moment().diff(moment(e.inSystem), 'years') < 2)
    driversThreeYear.value = employeeData.value.filter(e => e.position === 'DRIVER' && moment().diff(moment(e.inSystem), 'years') >= 2)
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
