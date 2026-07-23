/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { services } from './src/data/services'
import { sectors } from './src/data/sectors'
import posts from './src/content/posts.json'

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss()
    ],
    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    ssgOptions: {
        script: 'async',
        formatting: 'minify',
        // Expand dynamic routes so every service, sector and blog post gets its
        // own pre-rendered HTML file (static params can't be crawled otherwise).
        includedRoutes(paths) {
            const staticPaths = paths.filter((p) => !p.includes(':'))
            const serviceRoutes = services.map((s) => `/services/${s.slug}`)
            const sectorRoutes = sectors.map((s) => `/innovations/${s.slug}`)
            const blogRoutes = (posts as { slug: string }[]).map((p) => `/blogs/${p.slug}`)
            return [...staticPaths, ...serviceRoutes, ...sectorRoutes, ...blogRoutes]
        },
    },
})
