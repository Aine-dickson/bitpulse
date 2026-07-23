<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNav from './components/layout/AppNav.vue'
import AppFooter from './components/layout/AppFooter.vue'

// Legacy modal forms — kept mounted so existing pages that call
// uiStore.showModal(...) keep working until the forms pass reworks them.
import partnershipForm from './components/partnershipForm.vue'
import consultationForm from './components/consultationForm.vue'
import requestQuoteForm from './components/requestQuoteForm.vue'
import customPrototypeForm from './components/customPrototypeForm.vue'
import bookSession from './components/bookSession.vue'
import requestDevTool from './components/requestDevTool.vue'
import embeddedQuoteForm from './components/embeddedQuoteForm.vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-plate-0 text-ink">
    <AppNav />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />

    <!-- legacy modal overlay -->
    <div
      v-if="uiStore.modal"
      class="fixed inset-0 z-[60] overflow-auto bg-black/65 pt-16"
      @click="uiStore.hideModal"
    >
      <partnershipForm v-if="uiStore.modal == 'partnershipForm'" @click.stop />
      <consultationForm v-if="uiStore.modal == 'consultationForm'" @click.stop />
      <requestQuoteForm v-if="uiStore.modal == 'requestQuoteForm'" @click.stop />
      <customPrototypeForm v-if="uiStore.modal == 'customPrototypeForm'" @click.stop />
      <bookSession v-if="uiStore.modal == 'bookSessionForm'" @click.stop />
      <requestDevTool v-if="uiStore.modal == 'devSolutionRequestForm'" @click.stop />
      <embeddedQuoteForm v-if="uiStore.modal == 'embeddedQuoteForm'" @click.stop />
    </div>
  </div>
</template>
