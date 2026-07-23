<script setup lang="ts">
import { ref } from 'vue'
import { site } from '@/data/site'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { submitLead } from '@/utils/leads'
import NetLabel from '@/components/ui/NetLabel.vue'

useSeoMeta({
  title: 'Contact',
  description:
    'Need help, looking to collaborate, or want a quote? Tell us what you are trying to build and we will get back within 24–48 hours.',
  canonical: '/contacts',
})

const topics = [
  'General inquiry',
  'Project / build discussion',
  'Quote request',
  'R&D or technical consultation',
  'Training & events',
  'Careers & collaboration',
]

const form = ref({ name: '', email: '', topic: '', message: '' })
const submitted = ref(false)
const submitting = ref(false)
const errorMsg = ref('')

async function submit() {
  submitting.value = true
  errorMsg.value = ''
  const res = await submitLead('contact', { ...form.value })
  submitting.value = false
  if (res.ok) submitted.value = true
  else errorMsg.value = 'Sorry — that could not be sent. Please email us directly at ' + site.email + '.'
}

const channels = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'WhatsApp', value: `+${site.whatsapp}`, href: site.whatsappHref },
  { label: 'Phone', value: site.phone, href: site.phoneHref },
  { label: 'Location', value: site.location, href: '' },
]
</script>

<template>
  <!-- HERO -->
  <section class="bg-plate-0">
    <div class="mx-auto max-w-[1120px] px-6 pb-12 pt-20">
      <NetLabel text="Get in touch" />
      <h1 class="mt-6 max-w-[18ch] text-[clamp(2.3rem,5.5vw,3.8rem)] leading-[0.98] text-ink">
        Tell us what you're trying to build.
      </h1>
      <p class="mt-6 max-w-[54ch] text-[1.1rem] text-ink-2">
        Need help, looking to collaborate, or after a quote? Send us the shape of the problem and
        we'll point you at the right next step — usually within 24–48 hours.
      </p>
    </div>
  </section>

  <!-- FORM + CHANNELS -->
  <section class="bg-plate-1 py-16">
    <div class="mx-auto grid max-w-[1120px] gap-6 px-6 lg:grid-cols-[1.3fr_0.7fr]">
      <!-- form -->
      <div class="rounded-lg border border-line bg-surface p-8">
        <NetLabel text="Quick consultation" />
        <form v-if="!submitted" class="mt-6 flex flex-col gap-4" @submit.prevent="submit">
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="flex flex-col gap-1.5">
              <span class="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink-3">Name</span>
              <input v-model="form.name" type="text" required class="field" placeholder="Your full name" />
            </label>
            <label class="flex flex-col gap-1.5">
              <span class="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink-3">Email</span>
              <input v-model="form.email" type="email" required class="field" placeholder="you@company.com" />
            </label>
          </div>
          <label class="flex flex-col gap-1.5">
            <span class="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink-3">Topic</span>
            <select v-model="form.topic" required class="field">
              <option value="" disabled>Select a topic</option>
              <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
            </select>
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink-3">What do you need?</span>
            <textarea v-model="form.message" required rows="5" class="field resize-none" placeholder="Briefly describe what you're trying to achieve…" />
          </label>
          <div class="flex items-center gap-3">
            <button type="submit" :disabled="submitting" class="btn btn-primary w-fit disabled:opacity-60">
              <span v-if="submitting">Sending…</span>
              <span v-else>Send request</span>
            </button>
            <p v-if="errorMsg" class="text-[0.85rem] text-red-600">{{ errorMsg }}</p>
          </div>
        </form>

        <div v-else class="mt-6 rounded-md border border-accent bg-accent-soft p-6">
          <p class="font-display text-[1.15rem] font-extrabold text-ink">Thanks for reaching out.</p>
          <p class="mt-2 text-[0.95rem] text-ink-2">
            We've got the shape of it — expect a reply within 24–48 hours. For anything urgent,
            reach us directly on the right.
          </p>
        </div>
      </div>

      <!-- direct channels -->
      <div class="flex flex-col gap-3">
        <component
          :is="c.href ? 'a' : 'div'"
          v-for="c in channels"
          :key="c.label"
          :href="c.href || undefined"
          :target="c.href.startsWith('http') ? '_blank' : undefined"
          rel="noopener"
          class="rounded-lg border border-line bg-surface p-5 transition-colors"
          :class="c.href ? 'hover:border-accent' : ''"
        >
          <div class="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-accent-deep">{{ c.label }}</div>
          <div class="mt-1 text-[0.98rem] text-ink">{{ c.value }}</div>
        </component>
        <p class="mt-1 px-1 text-[0.78rem] text-ink-3">
          Your privacy is our priority. Information you share is used solely to help you.
        </p>
      </div>
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
