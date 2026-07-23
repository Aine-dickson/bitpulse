<script setup lang="ts">
import { services } from '@/data/services'
import { process } from '@/data/process'
import { useUiStore } from '@/stores/ui'
import { useSeoMeta } from '@/composables/useSeoMeta'
import NetLabel from '@/components/ui/NetLabel.vue'
import CapIcon from '@/components/ui/CapIcon.vue'

const uiStore = useUiStore()

useSeoMeta({
  title: 'Services',
  description:
    'From embedded firmware and backend systems to R&D prototyping, developer tools, training and firmware audits — the full signal path, one team.',
  canonical: '/services',
})
</script>

<template>
  <!-- HERO -->
  <section class="bg-plate-0">
    <div class="mx-auto max-w-[1120px] px-6 pb-16 pt-20">
      <NetLabel text="Capabilities" />
      <h1 class="mt-6 max-w-[18ch] text-[clamp(2.3rem,5.5vw,4rem)] leading-[0.98] text-ink">
        Explore what we can build together.
      </h1>
      <p class="mt-6 max-w-[52ch] text-[1.1rem] text-ink-2">
        From backend systems to embedded innovation, we work the full signal path — turning ideas
        into real-world hardware, firmware and software.
      </p>
    </div>
  </section>

  <!-- CAPABILITY DETAIL -->
  <section class="bg-plate-1 py-16">
    <div class="mx-auto grid max-w-[1120px] gap-5 px-6 md:grid-cols-2">
      <RouterLink
        v-for="s in services"
        :key="s.slug"
        :to="`/services/${s.slug}`"
        class="group relative flex flex-col rounded-lg border border-line bg-surface p-7 shadow-[0_1px_2px_rgba(27,36,31,0.04),0_14px_34px_-22px_rgba(27,36,31,0.30)] transition-colors hover:border-accent"
      >
        <div class="flex items-center gap-4">
          <span class="grid h-[46px] w-[46px] place-items-center rounded-md bg-accent-soft text-accent-deep">
            <CapIcon :name="s.icon" class="h-6 w-6" />
          </span>
          <div>
            <span class="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-3">{{ s.ref }} · {{ s.tag }}</span>
            <h2 class="text-[1.4rem] text-ink">{{ s.name }}</h2>
          </div>
        </div>
        <p class="mt-4 text-[0.98rem] text-ink-2">{{ s.detail }}</p>
        <ul class="mt-5 flex list-none flex-col gap-2.5 p-0">
          <li v-for="d in s.deliverables" :key="d" class="relative pl-5 text-[0.9rem] text-ink-2">
            <span class="absolute left-0 top-[8px] h-2 w-2 rounded-full border-2 border-accent" />
            {{ d }}
          </li>
        </ul>
        <span class="mt-5 font-mono text-[0.72rem] text-accent-deep opacity-0 transition-opacity group-hover:opacity-100">
          View details →
        </span>
      </RouterLink>
    </div>
  </section>

  <!-- HOW WE WORK -->
  <section class="bg-plate-0 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-12 max-w-[640px]">
        <NetLabel text="How an engagement runs" run />
        <h2 class="mt-4 text-[clamp(1.8rem,4vw,2.6rem)] text-ink">Four stages, each one gating the next.</h2>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="step in process" :key="step.n">
          <div class="mb-5 h-4 w-4 rounded-full border-2 border-accent bg-plate-0" />
          <span class="font-mono text-[0.7rem] tracking-[0.08em] text-accent-deep">{{ step.n }} · {{ step.stage }}</span>
          <h3 class="mb-2 mt-1.5 text-[1.15rem] text-ink">{{ step.title }}</h3>
          <p class="text-[0.9rem] text-ink-3">{{ step.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-plate-1 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-accent bg-accent-soft px-10 py-12">
        <div>
          <h2 class="max-w-[20ch] text-[clamp(1.6rem,3.4vw,2.3rem)] text-ink">
            Not sure which track fits your needs?
          </h2>
          <p class="mt-3 text-[1rem] text-ink-2">
            Let's figure out how BitPulse can help you build, scale, or solve the challenge in front of you.
          </p>
        </div>
        <button class="btn btn-primary" @click="uiStore.showModal('consultationForm')">Book a free consultation</button>
      </div>
    </div>
  </section>
</template>
