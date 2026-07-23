import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import { routes } from './router'

// ViteSSG owns createApp + mount on the client, and pre-renders each route to
// its own static HTML file at build time (see ssgOptions in vite.config.ts).
// It also wires up @unhead, so useSeoMeta/useHead render into the static HTML.
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior: () => ({ top: 0 }),
  },
  ({ app, router, isClient }) => {
    const pinia = createPinia()
    // Persistence reads localStorage, so it's client-only — registering it on
    // the server would throw during pre-render (window is undefined).
    if (isClient) pinia.use(piniaPluginPersistedstate)
    app.use(pinia)

    // Title fallback for routes that don't call useSeoMeta (client-side only).
    router.afterEach((to) => {
      if (typeof document === 'undefined') return
      const title = to.meta?.title as string | undefined
      document.title = title
        ? `${title} · BitPulse`
        : 'BitPulse — Embedded, Firmware & Systems Software'
    })

    // GitHub Pages SPA deep-link restore (see public/404.html).
    if (isClient) {
      const redirect = sessionStorage.getItem('redirect')
      if (redirect) {
        sessionStorage.removeItem('redirect')
        router.replace(redirect)
      }
    }
  },
)
