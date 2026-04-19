import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login-page/Login.vue'
import navigation from "../../navigation.js";

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

export default router
