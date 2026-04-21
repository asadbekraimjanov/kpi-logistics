<template>
    <div>
        <div class="w-full flex gap-4">
            <el-card class="w-2/5">
                <div class="w-full flex flex-col items-center !p-4">
                    <img src="@/assets/images/male.png" class="rounded-lg" alt="">
                    <p class="!mt-4 uppercase font-medium text-[#00345b]">{{ employeeData.familiyasiIsmiOtasiningIsmi }}</p>
                    <div class="rounded-xl bg-red-200 text-red-500 font-medium !px-2 text-sm !mt-2">Admin</div>
                    <div class="w-full flex justify-between !mt-6">
                        <div class="flex items-center justify-between gap-3">
                            <div class="bg-[#e4ecff] rounded !p-3 flex justify-center items-center text-[#577eff] font-bold">
                                <el-icon size="24"><Check /></el-icon>
                            </div>
                            <div class="flex flex-col justify-between">
                                <p class="text-xl font-medium">{{ new Intl.NumberFormat('en-us').format(1230) }}</p>
                                <p class="text-sm text-gray-600">Bajarilgan topshiriqlar</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-between gap-3">
                            <div class="bg-[#e4ecff] rounded !p-3 flex justify-center items-center text-[#577eff] font-bold">
                                <el-icon size="24"><Document /></el-icon>
                            </div>
                            <div class="flex flex-col justify-between">
                                <p class="text-xl font-medium">{{ new Intl.NumberFormat('en-us').format(1375) }}</p>
                                <p class="text-sm text-gray-600">Jami topshiriqlar</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="font-medium text-lg text-gray-700 !mt-4">Xodim ma'lumotlari</p>
                <el-divider class="!mt-4 !mb-6" />
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    Tashkilot:
                    <span class="font-normal text-gray-600">{{ employeeData.tashkilotNomi ? employeeData.tashkilotNomi : '-' }}</span>
                </p>
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    Bo'lim:
                    <span class="font-normal text-gray-600">{{ employeeData.bolimNomi ? employeeData.bolimNomi : '-' }}</span>
                </p>
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    Lavozim:
                    <span class="font-normal text-gray-600">{{ employeeData.lavozimi ? employeeData.lavozimi : '-' }}</span>
                </p>
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    Holati:
                    <el-tag type="primary" class="font-normal text-gray-600">Active</el-tag>
                </p>
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    Rol:
                    <span class="font-normal text-gray-600">Admin</span>
                </p>
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    Login:
                    <span class="font-normal text-gray-600">example@gmail.com</span>
                </p>
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    Tug'ilgan sana:
                    <span class="font-normal text-gray-600">{{ moment(employeeData.tugilganSana).format('DD.MM.YYYY') }}</span>
                </p>
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    Pasport seriya va raqami:
                    <span class="font-normal text-gray-600">{{ employeeData.pasportSeriyasi ? employeeData.pasportSeriyasi : '-' }} {{ employeeData.pasportRaqami }}</span>
                </p>
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    JSHSHIR:
                    <span class="font-normal text-gray-600">{{ employeeData.jismoniyShaxsShaxsiyIdentifikatsiyaRaqami ? employeeData.jismoniyShaxsShaxsiyIdentifikatsiyaRaqami : '-' }}</span>
                </p>
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    Jinsi:
                    <span class="font-normal text-gray-600">{{ employeeData.jinsi ? employeeData.jinsi : '-' }}</span>
                </p>
                <p class="font-medium text-gray-700 !mt-4 leading-[10px]">
                    Telefon raqami:
                    <span class="font-normal text-gray-600">{{ employeeData.phoneNumber ? employeeData.phoneNumber : '-' }}</span>
                </p>
                <el-button type="danger" class="!mt-6" :icon="Key">Parolni yangilash</el-button>
            </el-card>
            <el-card class="w-3/5"></el-card>
        </div>
    </div>
</template>

<script setup>
import {Check, Document, Key, Refresh} from "@element-plus/icons-vue";
import moment from "moment";

const props = defineProps({
    employeeData: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>

</style>
