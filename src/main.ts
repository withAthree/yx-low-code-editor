import { pinia } from '@/stores'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
