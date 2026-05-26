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

</style>