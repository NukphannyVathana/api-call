import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/style.css' // Make sure Tailwind directives (@tailwind base; etc.) are here

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')