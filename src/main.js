import '../src/assets/all.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap/dist/js/bootstrap.js"
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios,axios)

app.mount('#app')
