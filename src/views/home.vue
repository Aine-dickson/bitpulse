<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { sectors } from '@/data/sectors'
import { programs } from '@/data/programs'
import { process } from '@/data/process'
import { differentiators } from '@/data/why'
import { projects, statusMeta } from '@/data/projects'
import { useUiStore } from '@/stores/ui'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { itemListLd } from '@/utils/structuredData'
import NetLabel from '@/components/ui/NetLabel.vue'
import CapIcon from '@/components/ui/CapIcon.vue'
import BoardDiagram from '@/components/home/BoardDiagram.vue'

const uiStore = useUiStore()
const labPreview = projects.filter((p) => p.earlyAccess).slice(0, 3)

useSeoMeta({
  title: 'BitPulse | Embedded, Firmware & Systems Software Studio',
  description: site.description,
  canonical: '/',
  jsonLd: [
    itemListLd({
      name: 'BitPulse engineering services',
      items: services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })),
    }),
  ],
})
</script>

<template>
  <!-- HERO -->
  <section class="bg-plate-0">
    <div class="mx-auto grid max-w-[1120px] items-center gap-11 px-6 pb-20 pt-20 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <NetLabel text="Embedded · Firmware · Systems" />
        <h1 class="mt-6 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.97] text-ink">
          We route ideas from bare metal to <span class="text-accent-deep">working</span> systems.
        </h1>
        <p class="mt-6 max-w-[40ch] text-[1.14rem] leading-relaxed text-ink-2">
          {{ site.description }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/contacts" class="btn btn-primary">Start a build →</RouterLink>
          <a href="#capabilities" class="btn btn-line">See what we build</a>
        </div>
        <div class="mt-12 flex flex-wrap gap-10 border-t border-line pt-6">
          <div v-for="s in site.stats" :key="s.label">
            <b class="block font-display text-[1.7rem] font-extrabold text-ink">{{ s.value }}</b>
            <span class="font-mono text-[0.64rem] uppercase tracking-[0.09em] text-ink-3">{{ s.label }}</span>
          </div>
        </div>
      </div>
      <BoardDiagram />
    </div>
  </section>

  <!-- CAPABILITIES -->
  <section id="capabilities" class="bg-plate-1 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-12 max-w-[640px]">
        <NetLabel text="What we build" run />
        <h2 class="mt-4 text-[clamp(1.9rem,4vw,2.85rem)] text-ink">
          One team across the whole signal path, sensor to server.
        </h2>
        <p class="mt-4 text-[1.06rem] text-ink-2">
          Most shops stop at the driver or start at the API. We work the full path, so firmware,
          protocol and backend are designed to agree with each other.
        </p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="s in services"
          :key="s.slug"
          :to="`/services/${s.slug}`"
          class="cap group relative flex min-h-[230px] flex-col rounded-lg border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(27,36,31,0.04),0_14px_34px_-22px_rgba(27,36,31,0.30)] transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-accent"
        >
          <span class="absolute -top-[5px] left-6 h-2.5 w-2.5 rounded-full border-2 border-line-2 bg-plate-1 transition-colors group-hover:border-accent group-hover:bg-accent" />
          <span class="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-ink-3">{{ s.ref }} · CAP</span>
          <span class="mt-4 mb-4 grid h-[42px] w-[42px] place-items-center rounded-md bg-accent-soft text-accent-deep">
            <CapIcon :name="s.icon" class="h-[22px] w-[22px]" />
          </span>
          <h3 class="text-[1.24rem] text-ink">{{ s.name }}</h3>
          <p class="mt-2 text-[0.93rem] text-ink-3">{{ s.summary }}</p>
          <div class="mt-auto flex items-center justify-between pt-4">
            <span class="font-mono text-[0.62rem] uppercase tracking-[0.06em] text-ink-3">{{ s.tag }}</span>
            <span class="font-mono text-[0.72rem] text-accent-deep opacity-0 transition-opacity group-hover:opacity-100">View →</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- SECTORS -->
  <section class="bg-plate-0 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-12 max-w-[640px]">
        <NetLabel text="Where the signal lands" run />
        <h2 class="mt-4 text-[clamp(1.9rem,4vw,2.85rem)] text-ink">Six sectors we're already wiring up.</h2>
        <p class="mt-4 text-[1.06rem] text-ink-2">
          The same core of sensing, firmware, connectivity and data, retargeted to the problems worth
          solving on the continent.
        </p>
      </div>
      <div class="grid gap-x-14 md:grid-cols-2">
        <RouterLink
          v-for="sec in sectors"
          :key="sec.id"
          :to="`/innovations/${sec.slug}`"
          class="group flex items-baseline gap-4 border-b border-line py-5"
        >
          <span class="w-11 shrink-0 font-mono text-[0.72rem] text-accent-deep">{{ sec.id }}</span>
          <h4 class="text-[1.28rem] text-ink transition-colors group-hover:text-accent-deep">{{ sec.name }}</h4>
          <p class="ml-auto max-w-[44%] text-right text-[0.92rem] text-ink-3">{{ sec.blurb }}</p>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- PROGRAMS -->
  <section class="bg-plate-2 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-12 max-w-[640px]">
        <NetLabel text="Productized programs" run />
        <h2 class="mt-4 text-[clamp(1.9rem,4vw,2.85rem)] text-ink">
          Fixed scope, priced up front. No blank quotes.
        </h2>
        <p class="mt-4 text-[1.06rem] text-ink-2">
          Engagements packaged so you know what you're getting, and roughly what to budget, before
          the first call.
        </p>
      </div>
      <div class="grid gap-5 md:grid-cols-3">
        <article
          v-for="p in programs"
          :key="p.slug"
          class="flex flex-col rounded-[9px] border bg-surface p-7 shadow-[0_1px_2px_rgba(27,36,31,0.04),0_14px_34px_-22px_rgba(27,36,31,0.30)]"
          :class="p.featured ? 'border-accent' : 'border-line'"
        >
          <span class="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent-deep">{{ p.type }}</span>
          <h3 class="mt-3 mb-1 text-[1.42rem] text-ink">{{ p.name }}</h3>
          <div class="mb-4 font-mono text-[0.78rem] text-ink-3">{{ p.price }}</div>
          <ul class="mb-5 flex list-none flex-col gap-2.5 p-0">
            <li v-for="pt in p.points" :key="pt" class="relative pl-5 text-[0.92rem] text-ink-2">
              <span class="absolute left-0 top-[9px] h-2.5 w-2.5 rounded-full border-2 border-accent" />
              {{ pt }}
            </li>
          </ul>
          <RouterLink to="/contacts" class="mt-auto border-t border-line pt-4 font-mono text-[0.76rem] text-accent-deep">
            {{ p.cta }} →
          </RouterLink>
        </article>
      </div>
    </div>
  </section>

  <!-- WHY BITPULSE -->
  <section class="bg-plate-1 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div class="max-w-[640px]">
          <NetLabel text="Why BitPulse" run />
          <h2 class="mt-4 text-[clamp(1.9rem,4vw,2.85rem)] text-ink">Not just building tech. Redefining what it can do.</h2>
        </div>
        <RouterLink to="/why-bitpulse" class="font-mono text-[0.8rem] text-accent-deep hover:underline">
          More on our approach →
        </RouterLink>
      </div>
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="d in differentiators" :key="d.title" class="rounded-lg border border-line bg-surface p-6">
          <h3 class="text-[1.16rem] text-ink">{{ d.title }}</h3>
          <p class="mt-2.5 text-[0.92rem] text-ink-3">{{ d.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FROM THE LAB -->
  <section class="bg-plate-2 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div class="max-w-[640px]">
          <NetLabel text="From the Lab" run />
          <h2 class="mt-4 text-[clamp(1.9rem,4vw,2.85rem)] text-ink">Products &amp; projects you can help shape.</h2>
          <p class="mt-4 text-[1.06rem] text-ink-2">
            We build some things in the open. If one's marked for early testers, you can get on the
            list before it ships.
          </p>
        </div>
        <RouterLink to="/lab" class="font-mono text-[0.8rem] text-accent-deep hover:underline">
          Visit the Lab →
        </RouterLink>
      </div>
      <div class="grid gap-5 md:grid-cols-3">
        <article
          v-for="p in labPreview"
          :key="p.slug"
          class="flex flex-col rounded-lg border border-line bg-surface p-6"
        >
          <div class="flex items-center justify-between gap-3">
            <span class="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-3">{{ p.category }}</span>
            <span class="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.06em] text-ink-2">
              <span class="h-2 w-2 rounded-full" :style="{ background: statusMeta[p.status].dot }" />
              {{ statusMeta[p.status].label }}
            </span>
          </div>
          <h3 class="mt-3 text-[1.2rem] text-ink">{{ p.name }}</h3>
          <p class="mt-2 text-[0.9rem] text-ink-3">{{ p.blurb }}</p>
          <button
            class="mt-auto pt-5 text-left font-mono text-[0.74rem] text-accent-deep hover:underline"
            @click="uiStore.showModal('earlyAccess')"
          >
            Join early access →
          </button>
        </article>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="bg-plate-1 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="mb-12 max-w-[640px]">
        <NetLabel text="The path a build takes" run />
        <h2 class="mt-4 text-[clamp(1.9rem,4vw,2.85rem)] text-ink">Four stages, each one gating the next.</h2>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="step in process" :key="step.n">
          <div class="mb-5 h-4 w-4 rounded-full border-2 border-accent bg-plate-1" />
          <span class="font-mono text-[0.7rem] tracking-[0.08em] text-accent-deep">{{ step.n }} · {{ step.stage }}</span>
          <h3 class="mb-2 mt-1.5 text-[1.2rem] text-ink">{{ step.title }}</h3>
          <p class="text-[0.9rem] text-ink-3">{{ step.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-plate-0 py-20">
    <div class="mx-auto max-w-[1120px] px-6">
      <div class="flex flex-wrap items-center justify-between gap-9 rounded-xl border border-accent bg-accent-soft px-12 py-12">
        <div>
          <NetLabel text="Get a build scoped" />
          <h2 class="mt-4 max-w-[16ch] text-[clamp(1.8rem,3.6vw,2.6rem)] text-ink">
            Tell us what you're trying to build.
          </h2>
          <p class="mt-3 font-mono text-[0.82rem] text-ink-2">
            Free scoping call · Kampala &amp; remote · reply within 2 working days
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <RouterLink to="/contacts" class="btn btn-primary">Start a build</RouterLink>
          <a :href="site.whatsappHref" target="_blank" rel="noopener" class="btn btn-line">Message on WhatsApp</a>
        </div>
      </div>
    </div>
  </section>
</template>
