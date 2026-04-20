<template>
    <div class="w-full h-full flex">
        <div class="h-[100vh] bg-[#0c41a5] transition-all" :class="!isCollapse ? 'w-60' : ''">
            <div class="w-full flex justify-center">
                <img src="/logo.png" class="w-10 bg-[#0c41a5] !mt-4 !mb-3 cursor-pointer transition-all duration-700"
                     @click="router.push('/dashboard')" alt="" :class="isCollapse ? 'w-10' : 'w-20'">
            </div>
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
            >
                <el-menu-item v-for="(item, idx) in navigation" :index="String(idx+1)" @click="onMenuChange(item)">
                    <img :src="`/tabler-icons/${item.icon}.svg`" class="!mr-2" alt="">
                    <template #title>{{ item.title }}</template>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="w-full">
            <div class="w-full h-15 flex items-center justify-between !px-4 text-[#033695] shadow z-50" style="background-color: #F6F5FA">
                <div class="flex items-center gap-2">
                    <!--                <img :src="isCollapse ? '/tabler-icons/menu-expand.svg' : '/tabler-icons/menu-fold.svg'" @click="isCollapse = !isCollapse"-->
                    <!--                     class="!h-10" alt="">-->
                    <el-icon v-if="isCollapse" @click="isCollapse = !isCollapse" size="24"><Expand /></el-icon>
                    <el-icon v-else @click="isCollapse = !isCollapse" size="24"><Fold /></el-icon>
                    <p class="text-lg font-semibold uppercase">Ish faoliyati samaradorligini monitoring qilish platformasi</p>
                </div>
                <el-avatar class="cursor-pointer"></el-avatar>
            </div>
            <div class="w-full">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import navigation from "../../navigation.js";
import {Expand, Fold} from "@element-plus/icons-vue";
import router from "@/router/index.js";


const isCollapse = ref(false);

const onMenuChange = (item) => {
    router.push(item.path);
}

onMounted(() => {

})
</script>

<style>
.el-menu-vertical-demo {
    background-color: #0c41a5;
    color: white;
    border: none;
}
.el-menu-vertical-demo li {
    height: 40px;
}
.el-menu-item {
    color: white;
    font-weight: 500;
}
.el-menu-item.is-active {
}
.el-menu-item:hover {
    background-color: #0c41a5;
    color: #cacaca;
}
</style>
