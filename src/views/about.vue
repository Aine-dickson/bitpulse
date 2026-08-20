<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSeoMeta } from '@/composables/useSeoMeta'
import NetLabel from '@/components/ui/NetLabel.vue'

useSeoMeta({
  title: 'About',
  description:
    'BitPulse engineers purposeful technology, from smart cities to next-gen developer tools. Small team, big builds, local ideas with global impact.',
  canonical: '/about',
})

const values = [
  {
    title: 'Driven by Innovation',
    body: "We don't just follow trends. We engineer tomorrow's breakthroughs from the ground up.",
  },
  {
    title: 'Full-Stack Expertise',
    body: 'From hardware schematics to scalable cloud systems, we craft seamless end-to-end solutions.',
  },
  {
    title: 'Community-Focused',
    body: 'We build with and for people. Our open approach invites collaboration, learning and shared success.',
  },
]

const milestones = [
  { year: '2023', body: 'BitPulse vision conceived and research started.' },
  { year: '2024', body: 'BitCraft launched as the open innovation community arm.' },
  { year: '2025', body: 'Public launch and pilot projects underway.' },
]
</script>

<template>
  <!-- HERO -->
  <section class="bg-plate-0">
    <div class="mx-auto max-w-[1120px] px-6 pb-14 pt-20">
      <NetLabel text="About BitPulse" />
      <h1 class="mt-6 max-w-[20ch] text-[clamp(2.3rem,5.5vw,4rem)] leading-[0.98] text-ink">
        Because ideas deserve to be built, beautifully and boldly.
      </h1>
      <p class="mt-6 max-w-[60ch] text-[1.1rem] text-ink-2">
        BitPulse was born out of the desire to craft practical, transformative tech that creates
        tangible impact, from smart cities to next-gen developer tools. We began with a vision to
        not just build products, but to empower industries and communities.
      </p>
    </div>
  </section>

  <!-- MISSION / VISION -->
  <section class="bg-plate-1 py-16">
    <div class="mx-auto grid max-w-[1120px] gap-6 px-6 md:grid-cols-2">
      <div class="rounded-lg border border-line bg-surface p-8">
        <NetLabel text="Our Mission" />
        <p class="mt-4 text-[1.05rem] text-ink-2">
          To engineer purposeful technology that solves real-world problems and uplifts people and
          industries.
        </p>
      </div>
      <div class="rounded-lg border border-line bg-surface p-8">
        <NetLabel text="Our Vision" />
        <p class="mt-4 text-[1.05rem] text-ink-2">
          A world where tech works in harmony with human potential, building smarter cities, better
          health systems and inclusive digital futures.
        </p>
      </div>
    </div>
  </section>

  <!-- VALUES -->
  <section class="bg-plate-0 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-10 max-w-[640px]">
        <NetLabel text="What drives us" run />
        <h2 class="mt-4 text-[clamp(1.8rem,4vw,2.6rem)] text-ink">Small team. Big builds.</h2>
      </div>
      <div class="grid gap-5 md:grid-cols-3">
        <div
          v-for="v in values"
          :key="v.title"
          class="rounded-lg border border-line bg-surface p-7"
        >
          <h3 class="text-[1.2rem] text-ink">{{ v.title }}</h3>
          <p class="mt-3 text-[0.95rem] text-ink-3">{{ v.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- MILESTONES -->
  <section class="bg-plate-1 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-10 max-w-[640px]">
        <NetLabel text="Milestones" run />
        <h2 class="mt-4 text-[clamp(1.8rem,4vw,2.6rem)] text-ink">How we got here.</h2>
      </div>
      <ul class="ml-1 flex list-none flex-col gap-8 border-l-2 border-line-2 pl-7">
        <li v-for="m in milestones" :key="m.year" class="relative">
          <span class="absolute -left-[35px] top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-plate-1" />
          <div class="font-mono text-[0.8rem] font-semibold tracking-[0.06em] text-accent-deep">{{ m.year }}</div>
          <p class="mt-1 text-[1rem] text-ink-2">{{ m.body }}</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- MANIFESTO -->
  <section class="bg-plate-0 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="rounded-xl border border-line bg-surface px-10 py-14 text-center">
        <NetLabel text="The BitPulse manifesto" />
        <p class="mx-auto mt-6 max-w-[46ch] text-[clamp(1.15rem,2.4vw,1.5rem)] leading-snug text-ink">
          We believe in purposeful technology. In small teams that build big things. In local ideas
          with global impact. In tech that respects people, that educates, that amplifies what makes
          us human.
        </p>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-plate-1 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-accent bg-accent-soft px-10 py-12">
        <h2 class="max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.3rem)] text-ink">
          Let's build something that matters.
        </h2>
        <RouterLink to="/contacts" class="btn btn-primary">Connect with us</RouterLink>
      </div>
    </div>
  </section>
</template>
