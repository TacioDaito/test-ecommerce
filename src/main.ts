import '@/assets/main.css'

import { createApp } from 'vue'
import App from '@/views/App.vue'
import { router } from '@/router/index.ts'

const app = createApp(App)

app.use(router)

app.mount('#app')
