<template>
    <div class="w-full">
        <div class="w-full h-[100vh] flex justify-end relative overflow-hidden">
            <img src="@/assets/images/bg-login-pIMRvgh6.png" class="absolute w-full h-full -translate-y-40 -z-10" alt="">
            <div class="w-[40%] h-full absolute bg-white opacity-60">

            </div>
            <div class="w-[40%] h-full !pt-24 !px-20 z-50">
                <p class="text-4xl text-slate-800">Tizimga kirish</p>
                <p class="!mt-3 text-slate-500">Logistika kompaniyalari uchun ijro intizomi va hodimlar ish faoliyati samaradorligini monitoring qilish platformasi</p>
                <el-form class="!mt-20" :model="formData">
                    <el-form-item label="Email" prop="email" label-position="top">
                        <el-input class="h-12 bg-slate-500 login-input" v-model="formData.email" type="email" placeholder="Foydalanuvchi logini" clearable />
                    </el-form-item>
                    <el-form-item label="Parol" prop="password" class="!-mt-2" label-position="top">
                        <el-input class="h-12 bg-slate-500 login-input" v-model="formData.password" type="password" placeholder="Foydalanuvchi paroli" show-password />
                    </el-form-item>
                </el-form>
                <el-button @click="login" type="primary" class="w-full !h-12 !rounded-none !bg-[#034BA9] hover:!bg-[#396bae] !border-0 !font-normal !mt-2">Tizimga kirish</el-button>
                <p class="text-slate-500 text-sm text-center !mt-40">Copyright © 2026 Asadbek Raimjonov</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const formData = ref({
    email: null,
    password: null,
})


const login = async () => {
    await router.push("/main");
}
</script>

<style>
.login-input .el-input__wrapper {
    background-color: #ECEEF4;
    border-radius: 0;
    padding: 0 20px;
}

.el-input__wrapper .el-input__inner::placeholder {
    color: gray;
}
</style>
