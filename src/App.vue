<template>
    <div class="h-screen grid grid-rows-[auto_1fr] bg-white dark:bg-gray-950">
        <div v-if="uiStore.modal" @click="uiStore.hideModal" class="overlay absolute z-50 top-0 pt-16 left-0 right-0 bottom-0 bg-black/65">
            <partnershipForm @click.stop v-if="uiStore.modal == 'partnershipForm'"/>
        </div>
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

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from './components/Header.vue'
import SiteFooter from './components/SiteFooter.vue'
import partnershipForm from './components/partnershipForm.vue';

import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();
</script>
