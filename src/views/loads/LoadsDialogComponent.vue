<template>
    <el-dialog v-model="dialog" @close="close" title="Qo'shish" width="800">
        <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Masofa (km)" prop="distance">
                        <el-input v-model="formData.distance" type="number" placeholder="Kiriting" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Bahosi ($ da)" prop="price">
                        <el-input v-model="formData.price" type="number" placeholder="Kiriting" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Chiqim ($ da)" prop="tax">
                        <el-input v-model="formData.tax" type="number" placeholder="Kiriting" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Boshlanish joyi" prop="from">
                        <el-input v-model="formData.from" placeholder="Kiriting" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tugash joyi" prop="to">
                        <el-input v-model="formData.to" placeholder="Kiriting" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Yuk miqdori (kg)" prop="weight">
                        <el-input v-model="formData.weight" :placeholder="`Kiriting (maks: ${formData.carType ? formData.carType.weight : '0'})`" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Reys vaqti" prop="fligthTime">
                        <el-date-picker type="daterange" v-model="formData.fligthTime" start-placeholder="dan" end-placeholder="gacha" clearable></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Yuk mashinasi" prop="carType">
                        <el-select v-model="formData.carType" placeholder="Kiriting" value-key="id" clearable>
                            <el-option v-for="item in trucks" :label="item.name" :value="item" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holati" prop="status">
                        <el-select v-model="formData.status" placeholder="Kiriting" clearable>
                            <el-option label="Aktiv" value="ACTIVE"></el-option>
                            <el-option label="Bajarilgan" value="DONE"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Kompaniya" prop="company">
                        <el-input v-model="formData.company" placeholder="Kiriting" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Kontakt" prop="contact">
                        <el-input v-model="formData.contact" placeholder="Kiriting" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Mashina holati" prop="carStatus">
                        <el-select v-model="formData.carStatus" placeholder="Kiriting" clearable>
                            <el-option label="To'lgan" value="FULL"></el-option>
                            <el-option label="To'lmagan" value="EMPTY"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="w-full flex justify-end items-center !mt-2">
                <el-button class="w-30 !bg-[#577eff] !text-white " @click="save" :loading="loading" type="primary">Saqlash</el-button>
                <el-button class="w-30" @click="close" type="danger">Bekor qilish</el-button>
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
const trucks = ref([])
const defaultFormData = () => ({
    distance: null,
    price: null,
    tax: null,
    from: null,
    to: null,
    carType: null,
    status: null,
    fligthTime: null,
    company: null,
    weight: null,
    contact: null,
    carStatus: null,
})
const formData = ref(defaultFormData())

const rules = reactive({
    distance: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    price: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    tax: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    from: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    to: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    carType: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    status: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    fligthTime: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    company: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    weight: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    contact: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    carStatus: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
})

const open = async () => {
    try {
        const res = (await axios.get('https://kpi-logistics-trucks-default-rtdb.firebaseio.com/trucks.json')).data
        trucks.value = Object.entries(res).map(([id, value]) => ({id, ...value}))
    } catch {
        ElMessage.error('Ma\'lumot yuklashda xatolik')
    } finally {
        dialog.value = true
    }
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
                await axios.post('https://kpi-logistics-trucks-default-rtdb.firebaseio.com/loads.json', formData.value)
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
