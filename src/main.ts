import { createApp } from 'vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

import 'vue3-toastify/dist/index.css'
import './styles/global.scss'

import App from './App.vue'
import { router } from './routes'

const app = createApp(App)

app.use(Vue3Toastify, {
  position: 'bottom-center',
} as ToastContainerOptions)

app.use(router)
app.mount('#app')
