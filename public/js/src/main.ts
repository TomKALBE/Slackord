import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import { FontAwesomeIcon } from "@/tools/fontawesome";

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
