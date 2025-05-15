<template>
    <div class="h-screen grid grid-rows-[auto_1fr] bg-white dark:bg-gray-950">
        <div v-if="uiStore.modal" @click="uiStore.hideModal" class="overlay absolute z-50 top-0 pt-16 left-0 right-0 bottom-0 bg-black/65">
            <partnershipForm @click.stop v-if="uiStore.modal == 'partnershipForm'"/>
            <consultationForm @click.stop v-if="uiStore.modal == 'consultationForm'"/>
            <requestQuoteForm @click.stop v-if="uiStore.modal == 'requestQuoteForm'"/>
            <customPrototypeForm @click.stop v-if="uiStore.modal == 'customPrototypeForm'"/>
            <bookSession @click.stop v-if="uiStore.modal == 'bookSessionForm'"/>
            <requestDevTool @click.stop v-if="uiStore.modal == 'devSolutionRequestForm'"/>
            <embeddeQuoteForm @click.stop v-if="uiStore.modal == 'embeddedQuoteForm'"/>
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
import consultationForm from './components/consultationForm.vue';
import requestQuoteForm from './components/requestQuoteForm.vue';
import customPrototypeForm from './components/customPrototypeForm.vue';
import bookSession from './components/bookSession.vue';
import requestDevTool from './components/requestDevTool.vue';
import embeddedQuoteForm from './components/embeddedQuoteForm.vue';

import { useUiStore } from '@/stores/ui';
import EmbeddeQuoteForm from './components/embeddedQuoteForm.vue';

const uiStore = useUiStore();
</script>
