import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import './assets/main.css'
import locale from '@/components/locale/languages/UzElementLocale.js'

const app = createApp(App)

app.use(router).use(ElementPlus, {locale}).use(store)
    .mount('#app')
