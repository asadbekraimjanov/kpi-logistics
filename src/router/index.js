import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login-page/Login.vue'
import navigation from "../../navigation.js";
import store from "@/store/index.js";
import {ElMessage} from "element-plus";

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/main',
        redirect: '/dashboard',
        name: 'Main',
        component: () => import('@/views/Main.vue'),
        children: navigation
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const isAuthenticated = !!userData

    if (!isAuthenticated && to.name !== 'Login') {
        return { name: 'Login', replace: true }
    }

    if (isAuthenticated && userData.role === 'user' && to.name !== 'Loads' && to.name !== 'Login') {
        return { name: 'Loads', replace: true }
    }

    return true
})

export default router
