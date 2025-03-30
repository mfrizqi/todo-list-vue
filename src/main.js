import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import withUUID from "vue-uuid";

const pinia = createPinia()
const app = createApp(App)

app.use(withUUID)
app.use(pinia)
app.mount('#app')
