<template>
    <el-dialog v-model="dialog" @close="close" :title="rowId ? 'Tahrirlash' : 'Qo\'shish'" width="800">
        <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item prop="full_name" label="Familiyasi, ismi, sharifi">
                        <el-input v-model="formData.full_name" placeholder="Kiriting" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="work_place" label="Ish joyi">
                        <el-input v-model="formData.work_place" placeholder="Kiriting" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="work_brench" label="Boshqarma/Bo'lim">
                        <el-input v-model="formData.work_brench" placeholder="Kiriting" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="position" label="Lavozim">
                        <el-select v-model="formData.position" placeholder="Kiriting" clearable>
                            <el-option label="Menejer" value="MANAGER" />
                            <el-option label="Dasturchi" value="DEVELOPER" />
                            <el-option label="Operator" value="OPERATOR" />
                            <el-option label="Analitik" value="ANALITIK" />
                            <el-option label="Haydovchi" value="DRIVER" />
                            <el-option label="Mutaxassis" value="SPECIALIST" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="birth_date" label="Tug'ilgan sanasi">
                        <el-date-picker v-model="formData.birth_date" format="DD.MM.YYYY" value-format="YYYY-MM-DD" class="!w-full" placeholder="Tanlang" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="passport_series" label="Pasport seriyasi va raqami">
                        <div class="w-full flex gap-2">
                            <el-select v-model="formData.passport_series" placeholder="AA" clearable filterable class="!w-1/4">
                                <el-option v-for="item in seriesOption" :label="item.label" :value="item.value" />
                            </el-select>
                            <el-input v-model="formData.passport_number" placeholder="1234567" maxlength="7" clearable class="!w-3/4" />
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="pinfl" label="JSHSHIR">
                        <el-input v-model="formData.pinfl" placeholder="01234567891012" maxlength="14" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="status" label="Holati">
                        <el-select v-model="formData.status" placeholder="Tanlang" clearable>
                            <el-option label="Aktiv" value="ACTIVE" />
                            <el-option label="Aktiv emas" value="INACTIVE" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="gender" label="Jinsi">
                        <el-select v-model="formData.gender" placeholder="Tanlang" clearable>
                            <el-option label="Erkak" value="MALE" />
                            <el-option label="Ayol" value="FEMALE" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="phone_number" label="Telefon raqami">
                        <el-input v-model="formData.phone_number" placeholder="123456789" maxlength="9" clearable>
                            <template #prepend>+998</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="has_encourage" label="Rag'batlantirilganligi">
                        <el-select v-model="formData.has_encourage" placeholder="Tanlang">
                            <el-option label="Mavjud" :value="1" />
                            <el-option label="Mavjud emas" :value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="has_disciplinary" label="Intizomiy olganligi">
                        <el-select v-model="formData.has_disciplinary" placeholder="Tanlang">
                            <el-option label="Olgan" :value="1" />
                            <el-option label="Olmagan" :value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="w-full flex justify-end items-center">
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
const rowId = ref(null)
const formRef = ref(null)
const defaultFormData = () => ({
    full_name: null,
    work_place: null,
    work_brench: null,
    position: null,
    birth_date: null,
    passport_series: null,
    passport_number: null,
    pinfl: null,
    status: null,
    gender: null,
    phone_number: null,
    has_encourage: null,
    has_disciplinary: null
})
const formData = ref(defaultFormData())

const seriesOption = ref([
    {
        value: 'AA',
        label: 'AA'
    },
    {
        value: 'AD',
        label: 'AD'
    },
    {
        value: 'AB',
        label: 'AB'
    },
    {
        value: 'AC',
        label: 'AC'
    },
    {
        value: 'AE',
        label: 'AE'
    },
    {
        value: 'CK',
        label: 'CK'
    },
    {
        value: 'CA',
        label: 'CA'
    },
    {
        value: 'CB',
        label: 'CB'
    },
    {
        value: 'CE',
        label: 'CE'
    },
    {
        value: 'CC',
        label: 'CC'
    },
    {
        value: 'CG',
        label: 'CG'
    },
    {
        value: 'CN',
        label: 'CN'
    },
    {
        value: 'CP',
        label: 'CP'
    },
    {
        value: 'CF',
        label: 'CF'
    },
    {
        value: 'CL',
        label: 'CL'
    },
    {
        value: 'CH',
        label: 'CH'
    },
    {
        value: 'CS',
        label: 'CS'
    },
    {
        value: 'CM',
        label: 'CM'
    },
    {
        value: 'CR',
        label: 'CR'
    },
    {
        value: 'CT',
        label: 'CT'
    },
    {
        value: 'KA',
        label: 'KA'
    }
])

const rules = reactive({
    full_name: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    work_place: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    work_brench: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    position: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    birth_date: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    passport_series: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    passport_number: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    pinfl: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    status: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    gender: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    phone_number: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    has_encourage: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
    has_disciplinary: [{required: true, message: 'Мажбурий майдон', trigger: 'blur'}],
})

const open = (row) => {
    if (row) {
        formData.value = row
        rowId.value = row.id
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
                if (rowId.value) {
                    await axios.put(`http://localhost:5555/data/${rowId.value}`, formData.value)
                } else {
                    await axios.post('http://localhost:5555/data', formData.value)
                }
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
