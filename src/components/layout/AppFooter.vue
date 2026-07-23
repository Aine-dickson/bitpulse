<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { site, footerNav } from '@/data/site'
import BrandMark from '@/components/ui/BrandMark.vue'

const year = ref(new Date().getFullYear())
</script>

<template>
  <footer class="bg-footer text-footer-ink">
    <div class="mx-auto max-w-[1120px] px-6 pb-8 pt-14">
      <div class="flex flex-wrap justify-between gap-9 border-b border-footer-line pb-8">
        <div class="max-w-[34ch]">
          <div class="flex items-center gap-3">
            <BrandMark :size="30" tone="#ffffff" />
            <span class="font-display text-2xl font-extrabold text-white">
              Bit<span class="text-accent">Pulse</span>
            </span>
          </div>
          <p class="mt-3 text-[0.92rem] opacity-85">{{ site.blurb }}</p>
        </div>

        <div class="flex flex-wrap gap-x-14 gap-y-8">
          <div v-for="col in footerNav" :key="col.heading">
            <h5 class="mb-3.5 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-[#8f9b8c]">
              {{ col.heading }}
            </h5>
            <RouterLink
              v-for="link in col.links"
              :key="link.label"
              :to="link.to"
              class="mb-2 block text-[0.92rem] opacity-90 transition-colors hover:text-accent"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap justify-between gap-2.5 pt-6 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-[#8f9b8c]">
        <span>© {{ year }} {{ site.legalName }}</span>
        <span>{{ site.location }} — {{ site.timezone }}</span>
        <span>The Trace · v2</span>
      </div>
    </div>
  </footer>
</template>
