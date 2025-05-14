import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)

const redirect = sessionStorage.redirect;
if (redirect) {
  sessionStorage.removeItem("redirect");
  router.replace(redirect);
}

app.mount('#app')
