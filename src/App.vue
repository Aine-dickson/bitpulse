<script setup lang="ts">
    import { RouterView } from 'vue-router'
    import SiteHeader from './components/Header.vue'
    import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
    <div class="h-screen grid grid-rows-[auto_1fr] bg-white dark:bg-gray-950">
        <header>
            <SiteHeader />
        </header>
        <div class="h-full overflow-y-scroll">
            <main>
                <RouterView />
            </main>
            <footer>
                <SiteFooter />
            </footer>
        </div>
    </div>
</template>
