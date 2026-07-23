<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { leadForms } from '@/data/leadForms'
import { submitLead } from '@/utils/leads'

// Rendered once in App.vue and keyed by modal type, so setup re-runs (and the
// form resets) each time a different enquiry modal is opened.
const props = defineProps<{ type: string }>()
const uiStore = useUiStore()

const config = computed(() => leadForms[props.type])

const form = reactive<Record<string, string>>({})
if (config.value) for (const f of config.value.fields) form[f.name] = ''

const honeypot = ref('')
const submitting = ref(false)
const done = ref(false)
const errorMsg = ref('')

async function onSubmit() {
  if (honeypot.value) {
    uiStore.hideModal()
    return
  }
  submitting.value = true
  errorMsg.value = ''
  const res = await submitLead(props.type, { ...form })
  submitting.value = false
  if (res.ok) {
    done.value = true
    setTimeout(() => uiStore.hideModal(), 2200)
  } else {
    errorMsg.value = 'Sorry — that could not be sent. Please try again, or email contact@bitpulse.dev.'
  }
}
</script>

<template>
  <section v-if="config" class="mx-auto w-full max-w-2xl p-4" @click.stop>
    <div class="rounded-xl border border-line bg-surface p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] sm:p-7">
      <!-- header -->
      <div class="mb-5 flex items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <h3 class="text-[1.3rem] text-ink">{{ config.title }}</h3>
          <p v-if="config.subtitle" class="mt-1 text-[0.9rem] text-ink-3">{{ config.subtitle }}</p>
        </div>
        <button
          type="button"
          class="grid h-8 w-8 shrink-0 place-items-center rounded-md text-ink-3 hover:bg-plate-1 hover:text-ink"
          aria-label="Close"
          @click="uiStore.hideModal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <!-- success -->
      <div v-if="done" class="rounded-md border border-accent bg-accent-soft p-6">
        <p class="font-display text-[1.15rem] font-extrabold text-ink">Thanks for reaching out.</p>
        <p class="mt-2 text-[0.95rem] text-ink-2">We've got it — expect a reply within 24–48 hours.</p>
      </div>

      <!-- form -->
      <form v-else class="flex flex-col gap-4" @submit.prevent="onSubmit">
        <div class="grid gap-4 sm:grid-cols-2">
          <label
            v-for="f in config.fields"
            :key="f.name"
            class="flex flex-col gap-1.5"
            :class="{ 'sm:col-span-2': f.full || f.type === 'textarea' }"
          >
            <span class="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink-3">
              {{ f.label }}<span v-if="!f.required" class="normal-case tracking-normal text-ink-3/70"> (optional)</span>
            </span>

            <textarea
              v-if="f.type === 'textarea'"
              v-model="form[f.name]"
              :required="f.required"
              rows="4"
              class="field resize-none"
              :placeholder="f.placeholder"
            />
            <select v-else-if="f.type === 'select'" v-model="form[f.name]" :required="f.required" class="field">
              <option value="" disabled>Select an option</option>
              <option v-for="o in f.options" :key="o" :value="o">{{ o }}</option>
            </select>
            <input
              v-else
              v-model="form[f.name]"
              :type="f.type"
              :required="f.required"
              class="field"
              :placeholder="f.placeholder"
            />
          </label>
        </div>

        <!-- honeypot -->
        <input v-model="honeypot" type="text" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <div class="flex items-center gap-3">
          <button type="submit" :disabled="submitting" class="btn btn-primary disabled:opacity-60">
            <span v-if="submitting">Sending…</span>
            <span v-else>{{ config.submit }}</span>
          </button>
          <p v-if="errorMsg" class="text-[0.85rem] text-red-600">{{ errorMsg }}</p>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";
.field {
  @apply w-full rounded-md border border-line-2 bg-plate-0 px-3.5 py-2.5 text-[0.95rem] text-ink;
  @apply focus:border-accent focus:outline-none;
}
.field::placeholder {
  color: var(--color-ink-3);
}
</style>
