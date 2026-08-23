<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSeoMeta, SITE_URL } from '@/composables/useSeoMeta'
import { useFieldTheme } from '@/composables/useFieldTheme'
import FieldThemeToggle from '@/components/field/FieldThemeToggle.vue'
import KitIcon from '@/components/field/KitIcon.vue'
import { kits, kitFromPrice, formatUGX } from '@/data/kits'
import { fieldContact, whatsappHref } from '@/data/field'

// Index of the configurable kits. Standalone chrome, same as /field: this is a
// sales surface for the field business, not a studio page.
const { theme, toggle } = useFieldTheme()

useSeoMeta({
  title: 'CCTV, WiFi & Computer Lab Kits with Prices | BitPulse Kampala',
  description:
    'Build your own CCTV, WiFi, hotspot or computer lab kit and see the price update as you choose. Indicative Kampala pricing, then a written quote after a site visit.',
  canonical: '/kits',
  image: '/og/field.png',
  imageAlt: 'BitPulse Field Services kits · CCTV, WiFi, hotspots and computer labs',
  jsonLd: [
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/kits#kits`,
      name: 'BitPulse field service kits',
      itemListElement: kits.map((k, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: k.name,
        url: `${SITE_URL}/kits/${k.slug}`,
      })),
    },
  ],
})
</script>

<template>
  <div class="field">
    <!-- HERO -->
    <section class="bg-paper">
      <div class="mx-auto max-w-[1000px] px-5 pb-9 pt-8 sm:px-8 sm:pb-12 sm:pt-12">
        <div class="flex items-center justify-between gap-3">
          <RouterLink
            to="/field"
            class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-green sm:text-[0.75rem]"
          >
            ← Field Services
          </RouterLink>
          <FieldThemeToggle :theme="theme" @toggle="toggle" />
        </div>

        <h1 class="mt-4 max-w-[18ch] text-[2rem] font-extrabold leading-[1.04] tracking-tight text-inkf xs:text-[2.3rem] sm:text-[3rem]">
          Build your kit, see the price.
        </h1>

        <p class="mt-4 max-w-[54ch] text-[1rem] leading-relaxed text-inkf sm:text-[1.1rem]">
          Pick the cameras, access points or seats you actually need and the total updates as you
          go. These are indicative prices for planning, not a quote. The real figure comes after we
          walk your site.
        </p>
      </div>
    </section>

    <!-- KIT CARDS -->
    <section class="border-t border-rule bg-card">
      <div class="mx-auto max-w-[1000px] px-5 py-10 sm:px-8 sm:py-14">
        <div class="grid gap-4 sm:grid-cols-2">
          <RouterLink
            v-for="k in kits"
            :key="k.slug"
            :to="`/kits/${k.slug}`"
            class="group flex flex-col rounded-xl border border-rule bg-paper p-5 no-underline sm:p-6"
          >
            <div class="flex items-start justify-between gap-3">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-greensoft text-green">
                <KitIcon :name="k.icon" class="h-6 w-6" />
              </span>
              <span class="text-right">
                <span class="block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted">
                  From
                </span>
                <span class="num block text-[0.95rem] font-semibold text-inkf">
                  {{ formatUGX(kitFromPrice(k)) }}
                </span>
              </span>
            </div>

            <h2 class="mt-4 text-[1.15rem] font-bold text-inkf">{{ k.name }}</h2>
            <p class="mt-2 text-[0.94rem] leading-relaxed text-inkf">{{ k.summary }}</p>
            <p class="mt-3 text-[0.85rem] leading-relaxed text-muted">{{ k.goodFor }}</p>

            <span class="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-green">
              Configure and price
              <span aria-hidden="true">→</span>
            </span>
          </RouterLink>
        </div>

        <p class="mt-8 rounded-xl border border-rule bg-paper p-5 text-[0.9rem] leading-relaxed text-muted">
          Prices are indicative and move with the exchange rate and supplier stock. Equipment and
          labour are always quoted separately, so you can see exactly what you are paying for.
          Nothing here is a commitment until we have walked the site and written it down.
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="border-t border-rule bg-panel">
      <div class="mx-auto max-w-[1000px] px-5 py-11 sm:px-8 sm:py-14">
        <h2 class="max-w-[20ch] text-[1.5rem] font-extrabold leading-tight tracking-tight text-panel-ink sm:text-[2rem]">
          Not sure which kit fits?
        </h2>
        <p class="mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-panel-muted sm:text-[1.05rem]">
          Send a photo of the building or the room and we can point you at the right one before we
          visit.
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a :href="whatsappHref" class="cta cta-primary" rel="noopener">WhatsApp us</a>
          <a :href="fieldContact.primary.href" class="cta cta-onink">
            Call <span class="num">{{ fieldContact.primary.display }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-rule bg-paper">
      <div class="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-3 px-5 py-7 sm:px-8">
        <RouterLink to="/field" class="text-[0.9rem] font-semibold text-inkf underline underline-offset-4">
          Field services
        </RouterLink>
        <RouterLink to="/" class="text-[0.8rem] text-muted underline underline-offset-4">BitPulse</RouterLink>
      </div>
    </footer>
  </div>
</template>
