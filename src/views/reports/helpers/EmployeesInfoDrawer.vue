<template>
    <el-drawer v-model="visible" title="Xodim hisobotlari" @close="close" direction="btt" class="employee-reports-drawer" size="100%">
       <div class="w-full overflow-x-auto">
           <el-table :data="tableData" class="w-full" header-cell-class-name="!text-gray-800 !bg-gray-300" border>
               <el-table-column label="№" width="50">
                   <template #default="scope">{{ scope.$index + 1 }}</template>
               </el-table-column>
               <el-table-column label="F.I.Sh" prop="full_name" class-name="font-bold" />
               <el-table-column label="Tashkilot" prop="work_place" />
               <el-table-column label="Bo'lim" prop="work_brench" />
               <el-table-column label="Lavozim" prop="position" />
               <el-table-column label="Tizimda qachondan">
                   <template #default="scope">{{ moment(scope.row.inSystem).format('DD.MM.YYYY') }}</template>
               </el-table-column>
               <el-table-column label="Tug'ilgan sana">
                   <template #default="scope">{{ moment(scope.row.birth_date).format('DD.MM.YYYY') }}</template>
               </el-table-column>
               <el-table-column label="Pasport seriya va raqami">
                   <template #default="scope">{{ scope.row.passport_series }} {{ scope.row.passport_number }}</template>
               </el-table-column>
               <el-table-column label="JSHSHIR" prop="pinfl" />
               <el-table-column label="Jinsi">
                   <template #default="scope">{{ scope.row.gender === 'FEMALE' ? 'Ayol' : 'Erkak' }}</template>
               </el-table-column>
               <el-table-column label="Status" align="center">
                   <template #default="scope">
                       <el-tag :type="scope.row.status === 'ACTIVE' ? 'primary' : 'warning'">
                           {{ scope.row.status === 'ACTIVE' ? 'Faol' : 'Zahira' }}
                       </el-tag>
                   </template>
               </el-table-column>
               <el-table-column label="Telefon raqami" min-width="110" align="center">
                   <template #default="scope">
                       <div class="flex justify-center">
                           <p class="w-max rounded !px-2 font-medium flex items-center gap-1">
                               <el-icon><PhoneFilled /></el-icon>
                               +998 {{ scope.row.phone_number }}
                           </p>
                       </div>
                   </template>
               </el-table-column>
               <el-table-column label="Rag'batlantirish olganligi" min-width="90" align="center">
                   <template #default="scope">
                       <el-tag :type="scope.row.has_encourage === 1 ? 'success' : 'warning'">{{ scope.row.has_encourage === 1 ? 'Olgan' : 'Olmagan' }}</el-tag>
                   </template>
               </el-table-column>
               <el-table-column label="Jami topshiriqlar" align="center">
                   <template #default="scope">
                       <p class="font-bold">{{ scope.row.total_tasks }}</p>
                   </template>
               </el-table-column>
               <el-table-column label="shundan" align="center">
                   <el-table-column label="Bajarilgan topshiriqlar" align="center">
                       <template #default="scope">
                           <p class="font-bold text-blue-500">{{ scope.row.completed_tasks }}</p>
                       </template>
                   </el-table-column>
                   <el-table-column label="Bajarilmagan/muddati o'tganlar" align="center" min-width="70">
                       <template #default="scope">
                           <p class="font-bold text-red-500">{{ scope.row.total_tasks - scope.row.completed_tasks }}</p>
                       </template>
                   </el-table-column>
               </el-table-column>
               <el-table-column label="Guvohnoma amal qilish muddati" align="center">
                   <template #default="scope">
                       <p class="font-bold italic">{{ moment(scope.row.licence_end_date).format('DD.MM.YYYY') }}</p>
                   </template>
               </el-table-column>
           </el-table>
       </div>
    </el-drawer>
</template>

<script setup>
import {ref} from "vue";
import moment from "moment";
import {PhoneFilled} from "@element-plus/icons-vue";

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

<style scoped>

</style>