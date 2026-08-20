<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { leadForms } from '@/data/leadForms'
import { submitLead } from '@/utils/leads'
import { site } from '@/data/site'

// Rendered once in App.vue and keyed by modal type, so setup re-runs (and the
// form resets) each time a different enquiry modal is opened.
const props = defineProps<{ type: string }>()
const uiStore = useUiStore()

const config = computed(() => leadForms[props.type])

// Seed order: field default, then the opening page's context. A service detail
// page already knows which service you are looking at, so it passes that in
// rather than making you pick it out of a list again. The field stays editable.
const form = reactive<Record<string, string>>({})
if (config.value) {
  const ctx = uiStore.modalContext ?? {}
  for (const f of config.value.fields) {
    const seeded = ctx[f.name]
    // Only accept context that is actually selectable, or a select silently
    // renders with no matching option and submits empty.
    const valid = f.type !== 'select' || !seeded || (f.options ?? []).includes(seeded)
    form[f.name] = (valid ? seeded : '') || f.defaultValue || ''
  }
}

const honeypot = ref('')
const submitting = ref(false)
const done = ref(false)
const failed = ref(false)

// Everything the visitor typed, so a failed send can still reach us by email
// instead of dead-ending on a red error line.
const mailtoFallback = computed(() => {
  const body = Object.entries(form)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  return `mailto:${site.email}?subject=${encodeURIComponent(config.value?.title ?? 'Enquiry')}&body=${encodeURIComponent(body)}`
})

async function onSubmit() {
  if (honeypot.value) {
    uiStore.hideModal()
    return
  }
  submitting.value = true
  failed.value = false
  const res = await submitLead(props.type, { ...form }, { form: config.value?.title })
  submitting.value = false
  if (res.ok) done.value = true
  else failed.value = true
}
</script>

<template>
  <section
    v-if="config"
    class="mx-auto w-full max-w-2xl p-4"
    role="dialog"
    aria-modal="true"
    :aria-label="config.title"
    @click.stop
  >
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
        <p class="mt-2 text-[0.95rem] text-ink-2">
          {{ config.successNote || 'We have got it. Expect a reply within 24 to 48 hours.' }}
        </p>
        <p class="mt-3 text-[0.85rem] text-ink-3">
          A copy is on its way to your inbox. If it does not arrive, check your spam folder or write
          to <a :href="`mailto:${site.email}`" class="text-accent-deep hover:underline">{{ site.email }}</a>.
        </p>
        <button type="button" class="btn btn-line mt-5" @click="uiStore.hideModal">Close</button>
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

            <span v-if="f.hint" class="text-[0.75rem] leading-snug text-ink-3">{{ f.hint }}</span>
          </label>
        </div>

        <!-- honeypot -->
        <input v-model="honeypot" type="text" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <!-- send failure: never leave the visitor with nowhere to go -->
        <div v-if="failed" class="rounded-md border border-line-2 bg-plate-1 p-4">
          <p class="text-[0.9rem] text-ink">That did not send.</p>
          <p class="mt-1 text-[0.85rem] text-ink-2">
            Your answers are still here. Try again, or
            <a :href="mailtoFallback" class="text-accent-deep hover:underline">send them by email</a>
            and we will pick it up from there. You can also reach us on
            <a :href="site.whatsappHref" target="_blank" rel="noopener" class="text-accent-deep hover:underline">WhatsApp</a>.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button type="submit" :disabled="submitting" class="btn btn-primary disabled:opacity-60">
            <span v-if="submitting">Sending…</span>
            <span v-else-if="failed">Try again</span>
            <span v-else>{{ config.submit }}</span>
          </button>
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
