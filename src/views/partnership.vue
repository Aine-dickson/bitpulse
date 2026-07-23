<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useSeoMeta } from '@/composables/useSeoMeta'
import NetLabel from '@/components/ui/NetLabel.vue'

useSeoMeta({
  title: 'Partnership',
  description:
    'Partner with BitPulse — co-create in embedded systems, software, R&D and community tech. From co-development to strategic alliances.',
  canonical: '/partner',
})

const uiStore = useUiStore()

const benefits = [
  {
    title: 'Innovative Engineering',
    text: 'Access cutting-edge embedded and software development to power real-world impact.',
  },
  {
    title: 'Flexible Collaboration',
    text: 'From joint ventures to white-label R&D, we tailor collaboration to your vision.',
  },
  {
    title: 'Driven by Purpose',
    text: 'We care about meaningful tech — from local needs to scalable systems.',
  },
]

const types = [
  'Product co-development & technical integration',
  'Custom hardware & IoT research collaborations',
  'Government & NGO technology partnerships',
  'Academic & technical training partnerships',
  'Beta testing or early-adopter programs',
  'Funding or strategic tech alliances',
]
</script>

<template>
  <section class="bg-plate-0">
    <div class="mx-auto max-w-[1120px] px-6 pb-14 pt-20">
      <NetLabel text="Partner with BitPulse" />
      <h1 class="mt-6 max-w-[20ch] text-[clamp(2.3rem,5.5vw,3.8rem)] leading-[0.98] text-ink">
        Let's co-create something worth building.
      </h1>
      <p class="mt-6 max-w-[58ch] text-[1.1rem] text-ink-2">
        Whether you're a startup, an organization or a visionary, we'd love to explore how we can
        work together across embedded systems, software, R&amp;D and community tech.
      </p>
    </div>
  </section>

  <section class="bg-plate-1 py-16">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-10 max-w-[640px]">
        <NetLabel text="Why partner with us" run />
        <h2 class="mt-4 text-[clamp(1.7rem,3.6vw,2.4rem)] text-ink">Built around your vision.</h2>
      </div>
      <div class="grid gap-5 md:grid-cols-3">
        <div v-for="b in benefits" :key="b.title" class="rounded-lg border border-line bg-surface p-7">
          <h3 class="text-[1.2rem] text-ink">{{ b.title }}</h3>
          <p class="mt-3 text-[0.95rem] text-ink-3">{{ b.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-plate-0 py-16">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-10 max-w-[640px]">
        <NetLabel text="Ways we can work together" run />
        <h2 class="mt-4 text-[clamp(1.7rem,3.6vw,2.4rem)] text-ink">Pick the shape that fits.</h2>
      </div>
      <ul class="grid gap-3 md:grid-cols-2">
        <li
          v-for="t in types"
          :key="t"
          class="flex items-center gap-3 rounded-lg border border-line bg-surface px-5 py-4 text-[0.98rem] text-ink-2"
        >
          <span class="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-accent" />
          {{ t }}
        </li>
      </ul>
    </div>
  </section>

  <section class="bg-plate-1 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-accent bg-accent-soft px-10 py-12">
        <div>
          <h2 class="max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.3rem)] text-ink">
            Let's build something powerful together.
          </h2>
          <p class="mt-3 text-[1rem] text-ink-2">Pitch an idea or schedule a call — we'll take it from there.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <button class="btn btn-primary" @click="uiStore.showModal('partnershipForm')">Submit proposal</button>
          <RouterLink to="/contacts" class="btn btn-line">Book a call</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
