import { createApp } from 'vue'
// import './style.css'
// import 'normalize.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/styles/common.scss'
import { useLazyImg } from '@/directives'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


app.use(useLazyImg)
app.use(router)
app.use(pinia)
app.mount('#app')
