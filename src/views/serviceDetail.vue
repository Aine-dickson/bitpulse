<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { services, getServiceBySlug } from '@/data/services'
import { useUiStore } from '@/stores/ui'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { breadcrumbLd, serviceLd } from '@/utils/structuredData'
import NetLabel from '@/components/ui/NetLabel.vue'
import CapIcon from '@/components/ui/CapIcon.vue'

const route = useRoute()
const uiStore = useUiStore()

const service = computed(() => getServiceBySlug(route.params.slug as string) ?? null)
const others = computed(() => services.filter((s) => s.slug !== service.value?.slug))

// The page already knows which track you are on, so the forms open with the
// service selected rather than asking you to say it again.
const ctx = () => ({ service: service.value?.name ?? '' })
const openQuote = () => uiStore.showModal('requestQuoteForm', ctx())
const openConsultation = () => uiStore.showModal('consultationForm', ctx())

useSeoMeta({
  // Title carries the service *and* the category — "Embedded & IoT" alone
  // matches no query anyone actually types.
  title: service.value ? `${service.value.name} Engineering Services` : 'Service',
  description: service.value?.detail,
  canonical: service.value ? `/services/${service.value.slug}` : '/services',
  // Per-service share card, so a link to one track no longer looks identical
  // to a link to the home page. Regenerate with: bun scripts/generate-og.ts
  image: service.value ? `/og/services/${service.value.slug}.png` : undefined,
  imageAlt: service.value ? `${service.value.name} · ${service.value.summary}` : undefined,
  noindex: !service.value,
  jsonLd: service.value
    ? [
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.value.name, path: `/services/${service.value.slug}` },
        ]),
        serviceLd({
          name: service.value.name,
          description: service.value.detail,
          path: `/services/${service.value.slug}`,
          serviceType: service.value.tag,
          deliverables: [...service.value.deliverables],
        }),
      ]
    : [],
})
</script>

<template>
  <!-- Not found -->
  <section v-if="!service" class="mx-auto max-w-[640px] px-6 py-28 text-center">
    <h1 class="text-[1.6rem] text-ink">Service not found</h1>
    <p class="mt-2 text-ink-3">
      <RouterLink to="/services" class="text-accent-deep hover:underline">See all services</RouterLink>
    </p>
  </section>

  <template v-else>
    <!-- HERO -->
    <section class="bg-plate-0">
      <div class="mx-auto max-w-[1120px] px-6 pb-14 pt-20">
        <RouterLink to="/services" class="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent-deep hover:underline">
          ← All services
        </RouterLink>
        <div class="mt-6 flex items-center gap-4">
          <span class="grid h-[52px] w-[52px] place-items-center rounded-lg bg-accent-soft text-accent-deep">
            <CapIcon :name="service.icon" class="h-7 w-7" />
          </span>
          <NetLabel :text="`${service.ref} · ${service.tag}`" />
        </div>
        <h1 class="mt-5 max-w-[20ch] text-[clamp(2.3rem,5.5vw,3.8rem)] leading-[0.98] text-ink">
          {{ service.name }}
        </h1>
        <p class="mt-6 max-w-[58ch] text-[1.14rem] text-ink-2">{{ service.detail }}</p>
        <!--
          Both CTAs open a form that already knows which service you are on.
          "Request a quote" used to bounce to /contacts and its general
          consultation box, which is where quote requests went to die.
        -->
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <button class="btn btn-primary" @click="openQuote">Request a quote</button>
          <button class="btn btn-line" @click="openConsultation">Book a free consultation</button>
        </div>
        <p class="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-3">
          {{ service.name }} pre-filled · reply within 1 working day
        </p>
      </div>
    </section>

    <!-- DELIVERABLES + GOOD FOR -->
    <section class="bg-plate-1 py-16">
      <div class="mx-auto grid max-w-[1120px] gap-6 px-6 md:grid-cols-2">
        <div class="rounded-lg border border-line bg-surface p-8">
          <NetLabel text="What we deliver" run />
          <ul class="mt-5 flex list-none flex-col gap-3 p-0">
            <li v-for="d in service.deliverables" :key="d" class="relative pl-5 text-[0.98rem] text-ink-2">
              <span class="absolute left-0 top-[9px] h-2 w-2 rounded-full border-2 border-accent" />
              {{ d }}
            </li>
          </ul>
        </div>
        <div class="rounded-lg border border-line bg-surface p-8">
          <NetLabel text="Good for" run />
          <ul class="mt-5 flex list-none flex-col gap-3 p-0">
            <li v-for="g in service.goodFor" :key="g" class="relative pl-5 text-[0.98rem] text-ink-2">
              <span class="absolute left-0 top-[9px] h-2 w-2 rounded-full bg-line-2" />
              {{ g }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA: catch anyone who read to the bottom without scrolling back up -->
    <section class="bg-plate-2 py-16">
      <div class="mx-auto max-w-[1120px] px-6">
        <div class="rounded-lg border border-line bg-surface p-8 sm:p-10">
          <NetLabel text="Next step" run />
          <h2 class="mt-4 max-w-[22ch] text-[clamp(1.5rem,3.2vw,2.1rem)] text-ink">
            Tell us what you are building.
          </h2>
          <p class="mt-4 max-w-[56ch] text-[1.02rem] text-ink-2">
            Send us the shape of the problem and we will come back with scope, timeline and a price.
            If you would rather talk it through first, the consultation is free and there is no
            obligation at the end of it.
          </p>
          <div class="mt-7 flex flex-wrap items-center gap-3">
            <button class="btn btn-primary" @click="openQuote">Request a quote</button>
            <button class="btn btn-line" @click="openConsultation">Book a free consultation</button>
          </div>
        </div>
      </div>
    </section>

    <!-- OTHER SERVICES -->
    <section class="bg-plate-0 py-16">
      <div class="mx-auto max-w-[1120px] px-6">
        <div class="mb-8 max-w-[640px]">
          <NetLabel text="Explore more" run />
          <h2 class="mt-4 text-[clamp(1.6rem,3.4vw,2.2rem)] text-ink">Other things we build.</h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="o in others"
            :key="o.slug"
            :to="`/services/${o.slug}`"
            class="group flex items-center gap-4 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
          >
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent-soft text-accent-deep">
              <CapIcon :name="o.icon" class="h-5 w-5" />
            </span>
            <span>
              <span class="block text-[1.02rem] text-ink">{{ o.name }}</span>
              <span class="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-3">{{ o.tag }}</span>
            </span>
            <span class="ml-auto font-mono text-[0.9rem] text-accent-deep opacity-0 transition-opacity group-hover:opacity-100">→</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </template>
</template>
