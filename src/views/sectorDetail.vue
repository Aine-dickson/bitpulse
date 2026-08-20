<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { sectors, getSectorBySlug } from '@/data/sectors'
import { services } from '@/data/services'
import { useUiStore } from '@/stores/ui'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { breadcrumbLd, serviceLd } from '@/utils/structuredData'
import NetLabel from '@/components/ui/NetLabel.vue'
import CapIcon from '@/components/ui/CapIcon.vue'

const route = useRoute()
const uiStore = useUiStore()

const sector = computed(() => getSectorBySlug(route.params.slug as string) ?? null)
const relevantServices = computed(() =>
  sector.value ? services.filter((s) => sector.value!.services.includes(s.slug)) : [],
)
const others = computed(() => sectors.filter((s) => s.slug !== sector.value?.slug))

// Forms open knowing both the sector and the service that leads here, so the
// enquiry arrives already routed instead of as another blank "general" message.
const ctx = () => ({
  sector: sector.value?.name ?? '',
  service: relevantServices.value[0]?.name ?? '',
})
const openQuote = () => uiStore.showModal('requestQuoteForm', ctx())
const openConsultation = () => uiStore.showModal('consultationForm', ctx())

useSeoMeta({
  title: sector.value ? `${sector.value.name} | Embedded & Systems Engineering` : 'Sector',
  description: sector.value?.detail,
  canonical: sector.value ? `/innovations/${sector.value.slug}` : '/innovations',
  noindex: !sector.value,
  jsonLd: sector.value
    ? [
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Sectors', path: '/innovations' },
          { name: sector.value.name, path: `/innovations/${sector.value.slug}` },
        ]),
        serviceLd({
          name: `${sector.value.name} engineering`,
          description: sector.value.detail,
          path: `/innovations/${sector.value.slug}`,
          serviceType: sector.value.name,
          deliverables: [...sector.value.examples],
        }),
      ]
    : [],
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
          <button class="btn btn-primary" @click="openQuote">Start a build here</button>
          <button class="btn btn-line" @click="openConsultation">Book a free consultation</button>
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

    <!-- SIGNAL READOUT: the numbers we design against, as an instrument strip -->
    <section class="border-y border-line bg-plate-2">
      <div class="mx-auto grid max-w-[1120px] gap-px bg-line px-0 sm:grid-cols-3">
        <div v-for="s in sector.signals" :key="s.label" class="bg-plate-2 px-6 py-7">
          <div class="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-3">
            {{ s.label }}
          </div>
          <div class="mt-2 font-display text-[1.6rem] font-extrabold leading-none text-accent-deep">
            {{ s.value }}
          </div>
        </div>
      </div>
    </section>

    <!-- FIELD CONDITIONS: what actually makes this sector hard -->
    <section class="bg-plate-1 py-16">
      <div class="mx-auto max-w-[1120px] px-6">
        <div class="mb-9 max-w-[680px]">
          <NetLabel text="Field conditions" run />
          <h2 class="mt-4 text-[clamp(1.6rem,3.4vw,2.2rem)] text-ink">
            What makes this hard, and how we design around it.
          </h2>
          <p class="mt-4 text-[1.02rem] text-ink-2">
            Every sector fails in its own way. These are the conditions that decide the design here,
            long before anyone picks a framework.
          </p>
        </div>

        <div class="grid gap-4 lg:grid-cols-3">
          <article
            v-for="(c, i) in sector.constraints"
            :key="c.title"
            class="flex flex-col rounded-lg border border-line bg-surface p-7"
          >
            <span class="font-mono text-[0.66rem] tracking-[0.12em] text-accent-deep">
              C-{{ String(i + 1).padStart(2, '0') }}
            </span>
            <h3 class="mt-3 text-[1.12rem] leading-snug text-ink">{{ c.title }}</h3>
            <p class="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{{ c.problem }}</p>

            <div class="mt-5 border-t border-line pt-5">
              <span class="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent-deep">
                Our answer
              </span>
              <p class="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{{ c.response }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- HOW WE HELP -->
    <section class="bg-plate-0 py-16">
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

    <!-- OUTCOMES + STACK -->
    <section class="bg-plate-1 py-16">
      <div class="mx-auto grid max-w-[1120px] gap-6 px-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div class="rounded-lg border border-line bg-surface p-8">
          <NetLabel text="What good looks like" run />
          <h3 class="mt-4 text-[1.25rem] text-ink">How a build here gets judged.</h3>
          <ul class="mt-5 flex list-none flex-col gap-3 p-0">
            <li v-for="o in sector.outcomes" :key="o" class="relative pl-5 text-[0.98rem] text-ink-2">
              <span class="absolute left-0 top-[9px] h-2 w-2 rounded-full border-2 border-accent" />
              {{ o }}
            </li>
          </ul>
        </div>

        <div class="rounded-lg border border-line bg-surface p-8">
          <NetLabel text="Typical stack" run />
          <h3 class="mt-4 text-[1.25rem] text-ink">What we reach for.</h3>
          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="t in sector.stack"
              :key="t"
              class="rounded border border-line-2 bg-plate-0 px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.03em] text-ink-2"
            >
              {{ t }}
            </span>
          </div>
          <p class="mt-5 text-[0.86rem] leading-relaxed text-ink-3">
            A starting point, not a template. The right choice depends on what your deployment
            actually has to survive.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-plate-2 py-16">
      <div class="mx-auto max-w-[1120px] px-6">
        <div class="rounded-lg border border-line bg-surface p-8 sm:p-10">
          <NetLabel text="Next step" run />
          <h2 class="mt-4 max-w-[24ch] text-[clamp(1.5rem,3.2vw,2.1rem)] text-ink">
            Building something in {{ sector.name.toLowerCase() }}?
          </h2>
          <p class="mt-4 max-w-[56ch] text-[1.02rem] text-ink-2">
            Tell us what the deployment has to survive and we will come back with scope, timeline
            and a price. Your enquiry arrives tagged to this sector, so it lands with whoever knows
            the work.
          </p>
          <div class="mt-7 flex flex-wrap items-center gap-3">
            <button class="btn btn-primary" @click="openQuote">Request a quote</button>
            <button class="btn btn-line" @click="openConsultation">Book a free consultation</button>
          </div>
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
