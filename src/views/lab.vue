<script setup lang="ts">
import { projects, statusMeta } from '@/data/projects'
import { useUiStore } from '@/stores/ui'
import { useSeoMeta } from '@/composables/useSeoMeta'
import NetLabel from '@/components/ui/NetLabel.vue'

const uiStore = useUiStore()

useSeoMeta({
  title: 'The Lab',
  description:
    'Products and projects BitPulse is building in the open — some live, some in beta, some still on the bench. Sign up to test what we ship next.',
  canonical: '/lab',
})
</script>

<template>
  <!-- HERO -->
  <section class="bg-plate-0">
    <div class="mx-auto max-w-[1120px] px-6 pb-12 pt-20">
      <NetLabel text="The Lab" />
      <h1 class="mt-6 max-w-[20ch] text-[clamp(2.3rem,5.5vw,3.8rem)] leading-[0.98] text-ink">
        What we're building in the open.
      </h1>
      <p class="mt-6 max-w-[56ch] text-[1.1rem] text-ink-2">
        Some of it is live, some is in beta, some is still on the bench. If a project's marked for
        early testers, you can get on the list and help shape it before launch.
      </p>
      <div class="mt-8">
        <button class="btn btn-primary" @click="uiStore.showModal('earlyAccess')">Become an early tester</button>
      </div>

      <!-- status legend -->
      <div class="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        <span v-for="(m, key) in statusMeta" :key="key" class="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink-3">
          <span class="h-2.5 w-2.5 rounded-full" :style="{ background: m.dot }" />
          {{ m.label }} — {{ m.note }}
        </span>
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section class="bg-plate-1 py-16">
    <div class="mx-auto grid max-w-[1120px] gap-5 px-6 md:grid-cols-2">
      <article
        v-for="p in projects"
        :key="p.slug"
        class="flex flex-col rounded-lg border border-line bg-surface p-7 shadow-[0_1px_2px_rgba(27,36,31,0.04),0_14px_34px_-22px_rgba(27,36,31,0.30)]"
      >
        <div class="flex items-center justify-between gap-3">
          <span class="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink-3">{{ p.category }}</span>
          <span class="inline-flex items-center gap-2 rounded-full border border-line-2 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-ink-2">
            <span class="h-2 w-2 rounded-full" :style="{ background: statusMeta[p.status].dot }" />
            {{ statusMeta[p.status].label }}
          </span>
        </div>
        <h2 class="mt-3 text-[1.4rem] text-ink">{{ p.name }}</h2>
        <p class="mt-2 text-[0.95rem] text-ink-2">{{ p.blurb }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="t in p.tags"
            :key="t"
            class="rounded border border-line-2 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.05em] text-ink-3"
          >
            {{ t }}
          </span>
        </div>
        <div v-if="p.earlyAccess" class="mt-6 border-t border-line pt-4">
          <button
            class="font-mono text-[0.76rem] text-accent-deep hover:underline"
            @click="uiStore.showModal('earlyAccess')"
          >
            Join early access →
          </button>
        </div>
      </article>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-plate-0 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-accent bg-accent-soft px-10 py-12">
        <div>
          <NetLabel text="Test before we launch" />
          <h2 class="mt-4 max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.3rem)] text-ink">
            Get early access to what we ship next.
          </h2>
        </div>
        <button class="btn btn-primary" @click="uiStore.showModal('earlyAccess')">Become an early tester</button>
      </div>
    </div>
  </section>
</template>
