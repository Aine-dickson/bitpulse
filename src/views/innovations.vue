<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { sectors } from '@/data/sectors'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { breadcrumbLd, itemListLd } from '@/utils/structuredData'
import NetLabel from '@/components/ui/NetLabel.vue'

useSeoMeta({
  title: 'Sectors We Build For | Smart Cities, Health Tech, Fintech & More',
  description:
    'The same core of sensing, firmware, connectivity and data, retargeted to smarter cities, health tech, digital economies, education, developer tools and embedded systems.',
  canonical: '/innovations',
  jsonLd: [
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Sectors', path: '/innovations' },
    ]),
    itemListLd({
      name: 'Sectors BitPulse builds for',
      items: sectors.map((s) => ({ name: s.name, path: `/innovations/${s.slug}` })),
    }),
  ],
})
</script>

<template>
  <!-- HERO -->
  <section class="bg-plate-0">
    <div class="mx-auto max-w-[1120px] px-6 pb-16 pt-20">
      <NetLabel text="Where the signal lands" />
      <h1 class="mt-6 max-w-[20ch] text-[clamp(2.3rem,5.5vw,4rem)] leading-[0.98] text-ink">
        Six sectors we're already wiring up.
      </h1>
      <p class="mt-6 max-w-[54ch] text-[1.1rem] text-ink-2">
        The same core of sensing, firmware, connectivity and data, retargeted to the problems worth
        solving on the continent.
      </p>
    </div>
  </section>

  <!-- SECTOR CARDS -->
  <section class="bg-plate-1 py-16">
    <div class="mx-auto grid max-w-[1120px] gap-5 px-6 md:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="sec in sectors"
        :key="sec.id"
        :to="`/innovations/${sec.slug}`"
        class="group flex flex-col rounded-lg border border-line bg-surface p-7 shadow-[0_1px_2px_rgba(27,36,31,0.04),0_14px_34px_-22px_rgba(27,36,31,0.30)] transition-colors hover:border-accent"
      >
        <span class="font-mono text-[0.7rem] tracking-[0.1em] text-accent-deep">{{ sec.id }}</span>
        <h2 class="mt-2 text-[1.4rem] text-ink">{{ sec.name }}</h2>
        <p class="mt-3 text-[0.95rem] text-ink-2">{{ sec.detail }}</p>
        <div class="mt-5 flex flex-wrap gap-2">
          <span
            v-for="ex in sec.examples"
            :key="ex"
            class="rounded border border-line-2 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.05em] text-ink-3"
          >
            {{ ex }}
          </span>
        </div>
        <span class="mt-5 font-mono text-[0.72rem] text-accent-deep opacity-0 transition-opacity group-hover:opacity-100">
          View sector →
        </span>
      </RouterLink>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-plate-0 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-accent bg-accent-soft px-10 py-12">
        <div>
          <NetLabel text="Building in one of these?" />
          <h2 class="mt-4 max-w-[20ch] text-[clamp(1.6rem,3.4vw,2.3rem)] text-ink">
            Let's put the right system behind it.
          </h2>
        </div>
        <RouterLink to="/contacts" class="btn btn-primary">Start a build</RouterLink>
      </div>
    </div>
  </section>
</template>
