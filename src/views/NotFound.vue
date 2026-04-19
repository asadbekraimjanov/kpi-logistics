<template>
    <div class="w-full h-screen flex items-center justify-center bg-slate-100">
        <div class="text-center">
            <p class="text-6xl text-slate-700 font-bold">404</p>
            <p class="text-xl mt-4 text-slate-600">Sahifa topilmadi</p>

            <el-button type="text"
                class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg"
                @click="router.go(-1)"
            >
                Orqaga qaytish
            </el-button>
        </div>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>
