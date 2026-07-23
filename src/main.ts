import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const head = createHead()

app.use(pinia)
app.use(router)
app.use(head)

// GitHub Pages SPA deep-link restore (see public/404.html).
const redirect = sessionStorage.redirect
if (redirect) {
  sessionStorage.removeItem('redirect')
  router.replace(redirect)
}

app.mount('#app')
