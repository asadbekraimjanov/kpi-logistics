<template>
    <el-dialog v-model="dialog" @close="close" title="Qo'shish" width="800">
        <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Yuk" prop="load">
                        <el-select v-model="load" @change="onLoadSelected" placeholder="Tanlang" value-key="id">
                            <el-option v-for="item in loads" :value="item">
                                <div class="w-[600px] flex justify-between">
                                    <p>{{ item.from }} -> {{ item.to }}</p>
                                    <p>{{ item.weight }} kg ({{ `${moment(item.fligthTime[0]).format('DD.MM.YYYY')} - ${moment(item.fligthTime[1]).format('DD.MM.YYYY')}` }})</p>
                                </div>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Boshlanish joyi" prop="from">
                        <el-input v-model="formData.from" placeholder="Kiriting"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tugash joyi" prop="to">
                        <el-input v-model="formData.to" placeholder="Kiriting"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Jami masofa (km)" prop="total_distance">
                        <el-input v-model="formData.total_distance" type="number" placeholder="Kiriting"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Bosib o'tilgan masofa (km)" prop="distance_shot_traveled">
                        <el-input v-model="formData.distance_shot_traveled" type="number" placeholder="Kiriting"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Boshlanish vaqti" prop="startDate">
                        <el-date-picker v-model="formData.startDate" format="DD.MM.YYYY" placeholder="Tanlang" class="!w-full"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Kutilayotgan tugash vaqti" prop="expectedEndDate">
                        <el-date-picker v-model="formData.expectedEndDate" format="DD.MM.YYYY" placeholder="Tanlang" class="!w-full"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item v-if="formData.status === 'DONE'" label="Manzilga borgan vaqt" prop="endDate">
                        <el-date-picker v-model="formData.endDate" format="DD.MM.YYYY" placeholder="Tanlang" class="!w-full"></el-date-picker>
                    </el-form-item>
                    <el-form-item v-else label="Manzilga borgan vaqt">
                        <el-date-picker v-model="formData.endDate" format="DD.MM.YYYY" placeholder="Tanlang" class="!w-full"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Haydovchi" prop="driver">
                        <el-select v-model="formData.driver" placeholder="Tanlang" value-key="id">
                            <el-option v-for="item in drivers" :label="item.full_name" :value="item" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holati" prop="status">
                        <el-select v-model="formData.status" placeholder="Tanlang" value-key="id">
                            <el-option label="Aktiv" value="ACTIVE" />
                            <el-option label="Tugallangan" value="DONE" />
                            <el-option label="Rad etilgan" value="REJECTED" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="Kontakt" prop="contact">
                        <el-input v-model="formData.contact" type="email" placeholder="Kiriting" clearable></el-input>
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
import moment from "moment";


const emit = defineEmits(['save'])

const loading = ref(false)
const dialog = ref(false)
const formRef = ref(null)
const load = ref(null)
const loads = ref([])
const drivers = ref([])
const defaultFormData = () => ({
    from: null,
    to: null,
    truck_point: [67.85, 39.95],
    total_distance: null,
    distance_shot_traveled: null,
    startDate: null,
    expectedEndDate: null,
    endDate: null,
    driver: null,
    contact: null,
    status: null,
})
const formData = ref(defaultFormData())

const rules = reactive({
    from: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    to: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    truck_point: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    total_distance: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    distance_shot_traveled: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    startDate: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    expectedEndDate: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    endDate: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    driver: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    contact: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],
    status: [{required: true, message: 'Мажбурий майдон', trigger: 'change'}],

})

const onLoadSelected = () => {
    formData.value.from = load.value.from
    formData.value.to = load.value.to
    formData.value.total_distance = load.value.distance
    formData.value.startDate = load.value.fligthTime[0]
    formData.value.expectedEndDate = load.value.fligthTime[1]
    formData.value.contact = load.value.contact
}

const open = async () => {
    dialog.value = true
    try {
        const res = (await axios.get('https://kpi-logistics-trucks-default-rtdb.firebaseio.com/loads.json')).data
        loads.value = Object.entries(res).map(([id, value]) => ({id, ...value}))
        const drv = (await axios.get('http://localhost:5555/data')).data
        drivers.value = drv.filter(e => e.position === 'DRIVER')
    } catch {
        ElMessage.error('Ma\'lumot yuklashda xatolik')
    }
}

const close = () => {
    formData.value = defaultFormData()
    load.value = null
    dialog.value = false
}

const save = async () => {
    formRef['value'].validate(async valid => {
        if (valid) {
            loading.value = true
            try {
                await axios.post('https://kpi-logistics-trucks-default-rtdb.firebaseio.com/routes.json', formData.value)
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
