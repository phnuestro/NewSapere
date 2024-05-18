//import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import App from './App.vue'

import "./index.css"

import router from './router'

const pinia = createPinia();

pinia.use(({store}) => {
    store.router = markRaw(router);
});

const app = createApp(App)

app.use(pinia)

app.use(router)

app.mount('#app')
