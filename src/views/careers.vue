<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { site } from '@/data/site'
import { useSeoMeta } from '@/composables/useSeoMeta'
import NetLabel from '@/components/ui/NetLabel.vue'

useSeoMeta({
  title: 'Careers',
  description:
    'Careers at BitPulse. The full roles board is on its way. In the meantime, tell us how you want to build with us.',
  canonical: '/careers',
})

const roadmap = [
  'Career philosophy & team culture',
  'Open roles listing with filtering',
  'Application form with resume upload',
  'Life at BitPulse: benefits and values',
]
</script>

<template>
  <section class="bg-plate-0">
    <div class="mx-auto max-w-[1120px] px-6 pb-14 pt-20">
      <NetLabel text="Careers" />
      <h1 class="mt-6 max-w-[18ch] text-[clamp(2.3rem,5.5vw,3.8rem)] leading-[0.98] text-ink">
        Come build the hard stuff with us.
      </h1>
      <p class="mt-6 max-w-[54ch] text-[1.1rem] text-ink-2">
        Our full roles board is still on the bench. If you love firmware, systems software or
        turning research into working hardware, we'd still like to hear from you now.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink to="/contacts" class="btn btn-primary">Introduce yourself</RouterLink>
        <a :href="`mailto:${site.email}`" class="btn btn-line">{{ site.email }}</a>
      </div>
    </div>
  </section>

  <section class="bg-plate-1 py-16">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-8 max-w-[640px]">
        <NetLabel text="On the way" run />
        <h2 class="mt-4 text-[clamp(1.7rem,3.6vw,2.4rem)] text-ink">What's coming to this page.</h2>
      </div>
      <ul class="grid gap-3 sm:grid-cols-2">
        <li
          v-for="item in roadmap"
          :key="item"
          class="flex items-center gap-3 rounded-lg border border-line bg-surface px-5 py-4 text-[0.98rem] text-ink-2"
        >
          <span class="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-accent" />
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>
