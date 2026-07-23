<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { sectors, getSectorBySlug } from '@/data/sectors'
import { services } from '@/data/services'
import { useUiStore } from '@/stores/ui'
import { useSeoMeta } from '@/composables/useSeoMeta'
import NetLabel from '@/components/ui/NetLabel.vue'
import CapIcon from '@/components/ui/CapIcon.vue'

const route = useRoute()
const uiStore = useUiStore()

const sector = computed(() => getSectorBySlug(route.params.slug as string) ?? null)
const relevantServices = computed(() =>
  sector.value ? services.filter((s) => sector.value!.services.includes(s.slug)) : [],
)
const others = computed(() => sectors.filter((s) => s.slug !== sector.value?.slug))

useSeoMeta({
  title: sector.value ? sector.value.name : 'Sector',
  description: sector.value?.detail,
  canonical: sector.value ? `/innovations/${sector.value.slug}` : '/innovations',
})
</script>

<template>
  <section v-if="!sector" class="mx-auto max-w-[640px] px-6 py-28 text-center">
    <h1 class="text-[1.6rem] text-ink">Sector not found</h1>
    <p class="mt-2 text-ink-3">
      <RouterLink to="/innovations" class="text-accent-deep hover:underline">See all sectors</RouterLink>
    </p>
  </section>

  <template v-else>
    <!-- HERO -->
    <section class="bg-plate-0">
      <div class="mx-auto max-w-[1120px] px-6 pb-14 pt-20">
        <RouterLink to="/innovations" class="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent-deep hover:underline">
          ← All sectors
        </RouterLink>
        <div class="mt-6">
          <NetLabel :text="sector.id" />
        </div>
        <h1 class="mt-5 max-w-[20ch] text-[clamp(2.3rem,5.5vw,3.8rem)] leading-[0.98] text-ink">
          {{ sector.name }}
        </h1>
        <p class="mt-6 max-w-[58ch] text-[1.14rem] text-ink-2">{{ sector.detail }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <button class="btn btn-primary" @click="uiStore.showModal('consultationForm')">Start a build here</button>
          <RouterLink to="/contacts" class="btn btn-line">Talk to us</RouterLink>
        </div>
        <div class="mt-8 flex flex-wrap gap-2">
          <span
            v-for="ex in sector.examples"
            :key="ex"
            class="rounded border border-line-2 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.05em] text-ink-3"
          >
            {{ ex }}
          </span>
        </div>
      </div>
    </section>

    <!-- HOW WE HELP -->
    <section class="bg-plate-1 py-16">
      <div class="mx-auto max-w-[1120px] px-6">
        <div class="mb-8 max-w-[640px]">
          <NetLabel text="How we help here" run />
          <h2 class="mt-4 text-[clamp(1.6rem,3.4vw,2.2rem)] text-ink">The capabilities we bring to this sector.</h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="s in relevantServices"
            :key="s.slug"
            :to="`/services/${s.slug}`"
            class="group flex items-center gap-4 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
          >
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent-soft text-accent-deep">
              <CapIcon :name="s.icon" class="h-5 w-5" />
            </span>
            <span>
              <span class="block text-[1.02rem] text-ink">{{ s.name }}</span>
              <span class="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-3">{{ s.tag }}</span>
            </span>
            <span class="ml-auto font-mono text-[0.9rem] text-accent-deep opacity-0 transition-opacity group-hover:opacity-100">→</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- OTHER SECTORS -->
    <section class="bg-plate-0 py-16">
      <div class="mx-auto max-w-[1120px] px-6">
        <div class="mb-8 max-w-[640px]">
          <NetLabel text="Explore more" run />
          <h2 class="mt-4 text-[clamp(1.6rem,3.4vw,2.2rem)] text-ink">Other sectors we're wiring up.</h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="o in others"
            :key="o.slug"
            :to="`/innovations/${o.slug}`"
            class="group rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
          >
            <span class="font-mono text-[0.66rem] tracking-[0.1em] text-accent-deep">{{ o.id }}</span>
            <span class="mt-1 block text-[1.06rem] text-ink">{{ o.name }}</span>
            <span class="mt-1 block text-[0.86rem] text-ink-3">{{ o.blurb }}</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </template>
</template>
