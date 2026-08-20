<script setup lang="ts">
import { defineAsyncComponent, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppNav from './components/layout/AppNav.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { useUiStore } from '@/stores/ui'
import { leadForms } from '@/data/leadForms'

// Lazy — keeps supabase-js (pulled in via submitLead) out of the main bundle
// until a visitor actually opens an enquiry form.
const LeadModal = defineAsyncComponent(() => import('./components/LeadModal.vue'))

const uiStore = useUiStore()
const route = useRoute()

// Deep-linkable enquiry modals, e.g. /services?enquiry=consultationForm.
// `service` and `sector` ride along so a campaign or email link can land
// someone on an already-filled form: ?enquiry=requestQuoteForm&service=Apps%20%26%20Interfaces
function openFromQuery(value: unknown) {
  if (typeof value !== 'string' || !leadForms[value]) return
  const ctx: Record<string, string> = {}
  for (const k of ['service', 'sector'] as const) {
    const v = route.query[k]
    if (typeof v === 'string' && v) ctx[k] = v
  }
  uiStore.showModal(value, ctx)
}
onMounted(() => openFromQuery(route.query.enquiry))
watch(() => route.query.enquiry, openFromQuery)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-plate-0 text-ink">
    <AppNav />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />

    <!-- Enquiry modal overlay (config-driven, one component for every form) -->
    <Transition name="overlay">
      <div
        v-if="uiStore.modal"
        class="fixed inset-0 z-[60] flex items-start justify-center overflow-auto bg-black/60 py-10 backdrop-blur-sm"
        @click="uiStore.hideModal"
      >
        <LeadModal :key="uiStore.modal" :type="uiStore.modal" />
      </div>
    </Transition>
  </div>
</template>

<style>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.18s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
