<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { differentiators as values, notList } from '@/data/why'
import NetLabel from '@/components/ui/NetLabel.vue'

useSeoMeta({
  title: 'Why BitPulse',
  description:
    "We're not just building tech. We're redefining what it can do, with innovation, full-stack expertise, community focus and practical impact.",
  canonical: '/why-bitpulse',
})
</script>

<template>
  <section class="bg-plate-0">
    <div class="mx-auto max-w-[1120px] px-6 pb-14 pt-20">
      <NetLabel text="Why BitPulse" />
      <h1 class="mt-6 max-w-[20ch] text-[clamp(2.3rem,5.5vw,3.8rem)] leading-[0.98] text-ink">
        Redefining what technology can do.
      </h1>
      <p class="mt-6 max-w-[54ch] text-[1.1rem] text-ink-2">
        We're not just building tech. We're building the rugged, reliable systems the real world
        actually runs on.
      </p>
    </div>
  </section>

  <section class="bg-plate-1 py-16">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-10 max-w-[640px]">
        <NetLabel text="What sets us apart" run />
        <h2 class="mt-4 text-[clamp(1.7rem,3.6vw,2.4rem)] text-ink">Five things we hold to.</h2>
      </div>
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="v in values" :key="v.title" class="rounded-lg border border-line bg-surface p-7">
          <h3 class="text-[1.2rem] text-ink">{{ v.title }}</h3>
          <p class="mt-3 text-[0.95rem] text-ink-3">{{ v.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-plate-0 py-16">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-8 max-w-[640px]">
        <NetLabel text="What we're not" run />
        <h2 class="mt-4 text-[clamp(1.7rem,3.6vw,2.4rem)] text-ink">Just as clear on the opposite.</h2>
      </div>
      <ul class="flex flex-col gap-3">
        <li
          v-for="n in notList"
          :key="n"
          class="flex items-start gap-3 rounded-lg border border-line bg-surface px-6 py-5 text-[1rem] text-ink-2"
        >
          <span class="mt-2 h-2 w-4 shrink-0 rounded-full bg-line-2" />
          {{ n }}
        </li>
      </ul>
    </div>
  </section>

  <section class="bg-plate-1 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-accent bg-accent-soft px-10 py-12">
        <h2 class="max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.3rem)] text-ink">
          Experience the BitPulse difference.
        </h2>
        <div class="flex flex-wrap gap-3">
          <RouterLink to="/services" class="btn btn-primary">Explore our services</RouterLink>
          <RouterLink to="/partner" class="btn btn-line">Partner with us</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
