<template>
    <el-dialog v-model="dialog" @close="close" title="Qo'shish" width="800">
        <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Rusumi" prop="name">
                        <el-input v-model="formData.name" placeholder="Kiriting"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Hajmi (kg)" prop="weight">
                        <el-input v-model="formData.weight" type="number" placeholder="Kiriting"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Ishlab chiqarilgan joyi" prop="place">
                        <el-input v-model="formData.place" placeholder="Kiriting"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Yili" prop="year">
                        <el-input v-model="formData.year" type="number" placeholder="Kiriting"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Yoqilg'i sarfi (litr/km)" prop="consumptionPer1km">
                        <el-input v-model="formData.consumptionPer1km" type="number" placeholder="Kiriting"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="w-full flex justify-end items-center !mt-2">
                <el-button class="w-30 !bg-[#577eff] !text-white " @click="save" :loading="loading" type="primary">Saqlash</el-button>
                <el-button class="w-30" @close="close" type="danger">Bekor qilish</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";


const emit = defineEmits(['save'])

const loading = ref(false)
const dialog = ref(false)
const formRef = ref(null)
const defaultFormData = () => ({
    name: null,
    weight: null,
    place: null,
    year: null,
    consumptionPer1km: null,
})
const formData = ref(defaultFormData())

const rules = reactive({
    name: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    weight: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    place: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    year: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    consumptionPer1km: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],

})

const open = (row) => {
    if (row) {
        formData.value = row
    }
    dialog.value = true
}

const close = () => {
    formData.value = defaultFormData()
    dialog.value = false
}

const save = async () => {
    formRef['value'].validate(async valid => {
        if (valid) {
            loading.value = true
            try {
                await axios.post('https://kpi-logistics-trucks-default-rtdb.firebaseio.com/trucks.json', formData.value)
                ElMessage.primary('Amal bajarildi')
            } catch {
                ElMessage.error('Amal bajarilmadi!')
            } finally {
                loading.value = false
            }
            close()
            emit('save')
        } else ElMessage.warning('Majburiy maydonlar to\'ldirilmagan')
    })
}

defineExpose({
    open,
    close,
})
</script>

<style>

</style>
