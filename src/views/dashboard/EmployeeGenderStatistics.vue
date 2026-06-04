<template>
    <div>
        <apexchart type="donut" height="220" :series="seriesGenderChart" :options="genderChartOptions" />
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";


const props = defineProps({
    employeeData: {
        type: Array,
        required: true
    }
})

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

onMounted(() => {
    seriesGenderChart.value[0] = props.employeeData.filter(e => e.gender === 'MALE').length
    seriesGenderChart.value[1] = props.employeeData.filter(e => e.gender === 'FEMALE').length
})
</script>

<style scoped>

</style>