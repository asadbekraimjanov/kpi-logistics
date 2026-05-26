<template>
    <el-drawer v-model="visible" title="Xodim hisobotlari" @close="close" class="employee-reports-drawer" size="50%">
        <pre>{{ tableData }}</pre>
    </el-drawer>
</template>

<script setup>
import {ref} from "vue";

const visible = ref(false)
const tableData = ref([])


const open = (item) => {
    tableData.value = item
    visible.value = true
}

const close = () => {
    visible.value = false
}

defineExpose({
    open,
    close
})
</script>

<style>
.employee-reports-drawer .el-drawer__header {
    background-color: #2558b3;
    color: white;
    font-weight: 500;
    padding: 10px 20px;
    margin-bottom: 0;
}
.employee-reports-drawer .el-drawer__header .el-drawer__title {
    font-size: 17px;
}
</style>