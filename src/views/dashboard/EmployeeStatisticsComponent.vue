<template>
    <div class="w-full">
        <apexchart type="bar" height="220" :series="seriesEmployee" :options="employeeChartOptions" />
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";


const props = defineProps({
    employeeData: {
        required: true
    }
})

const loading = ref(false)

const seriesEmployee = ref([
    {
        name: 'Soni',
        data: [
            {
                x: 'Menejer',
                y: 1
            },
            {
                x: 'Operator',
                y: 3,
            },
            {
                x: 'Dasturchi',
                y: 2
            },
            {
                x: 'Analitik',
                y: 2
            },
            {
                x: 'Haydovchi',
                y: 5
            },
            {
                x: 'Mutaxassis',
                y: 4
            },
        ]
    }
])
const employeeChartOptions = ref({
    chart: {
        type: 'bar',
        toolbar: { show: false }
    },

    legend: {
        show: false
    },

    colors: ['#2b8e82', '#2b778e', '#8e2b3d', '#8e862b', '#2b778e', '#2b8e82'],

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
    seriesEmployee.value[0].data[0].y = props.employeeData.filter(e => (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2 && e.has_disciplinary === 0 && e.position === 'MANAGER').length
    seriesEmployee.value[0].data[1].y = props.employeeData.filter(e => (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2 && e.has_disciplinary === 0 && e.position === 'OPERATOR').length
    seriesEmployee.value[0].data[2].y = props.employeeData.filter(e => (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2 && e.has_disciplinary === 0 && e.position === 'DEVELOPER').length
    seriesEmployee.value[0].data[3].y = props.employeeData.filter(e => (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2 && e.has_disciplinary === 0 && e.position === 'ANALITIK').length
    seriesEmployee.value[0].data[4].y = props.employeeData.filter(e => (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2 && e.has_disciplinary === 0 && e.position === 'DRIVER').length
    seriesEmployee.value[0].data[5].y = props.employeeData.filter(e => (Date.now() - new Date(e.inSystem)) > 1000 * 60 * 60 * 24 * 365 * 2 && e.has_disciplinary === 0 && e.position === 'SPECIALIST').length
}

onMounted(async () => {
    await getEmployeeData()
})
</script>

<style scoped>

</style>