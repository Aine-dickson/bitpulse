<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeoMeta, SITE_URL } from '@/composables/useSeoMeta'
import SiteDiagram from '@/components/field/SiteDiagram.vue'
import {
  fieldContact,
  whatsappHref,
  fieldInstalls,
  fieldAudiences,
  fieldSteps,
  fieldFacts,
  fieldPhotos,
} from '@/data/field'

// Standalone landing page for the field-services side of the business. It is
// reached from business cards, stickers and shirts, never from the site nav,
// so the studio chrome is suppressed (see `standalone` in the route meta).
// The visitor has already met Aine. The page exists to prove the business is
// real and get them onto WhatsApp or the phone, nothing else.

// This page's theme is its own, independent of the studio toggle: it always
// opens light (matching the printed cards) and only this control changes it.
// The attribute is already stamped before first paint by the script in
// index.html, so a returning visitor's choice does not flash.
const FIELD_THEME_KEY = 'bitpulse-field-theme'
const fieldTheme = ref<'light' | 'dark'>('light')

function stamp(t: 'light' | 'dark') {
  document.documentElement.setAttribute('data-field-theme', t)
}

onMounted(() => {
  try {
    if (localStorage.getItem(FIELD_THEME_KEY) === 'dark') fieldTheme.value = 'dark'
  } catch {
    /* private mode or storage blocked: light is the right fallback */
  }
  stamp(fieldTheme.value)
})

function toggleTheme() {
  fieldTheme.value = fieldTheme.value === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem(FIELD_THEME_KEY, fieldTheme.value)
  } catch {
    /* choice just will not persist; the page still switches */
  }
  stamp(fieldTheme.value)
}

useSeoMeta({
  title: 'WiFi, CCTV & Hotspot Installation in Kampala | BitPulse Field Services',
  description:
    'BitPulse installs and maintains WiFi networks, CCTV cameras and hotspot billing systems for schools, hostels, offices and businesses in Kampala. Call 0777 532 858 for a site visit and a written quote.',
  canonical: '/field',
  image: '/og/field.png',
  imageAlt: 'BitPulse Field Services · WiFi, CCTV and hotspots · 0777 532 858',
  jsonLd: [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/field#localbusiness`,
      name: 'BitPulse Field Services',
      description:
        'Installation and maintenance of WiFi networks, CCTV systems and hotspot billing systems for schools, hostels, offices and businesses in Kampala, Uganda.',
      url: `${SITE_URL}/field`,
      telephone: '+256777532858',
      image: `${SITE_URL}/og/field.png`,
      areaServed: [
        { '@type': 'City', name: 'Kampala' },
        { '@type': 'Country', name: 'Uganda' },
      ],
      // TODO(owner): add the real street address before submitting to Google
      // Business Profile. Left out rather than invented, because a wrong
      // address on a LocalBusiness node is worse than a missing one.
      // address: {
      //   '@type': 'PostalAddress',
      //   streetAddress: 'TODO',
      //   addressLocality: 'Kampala',
      //   addressCountry: 'UG',
      // },
      // TODO(owner): add geo coordinates for the workshop/office once the
      // address above is filled in.
      // geo: { '@type': 'GeoCoordinates', latitude: 'TODO', longitude: 'TODO' },
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Field services',
        itemListElement: fieldInstalls.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, description: s.body },
        })),
      },
    },
  ],
})
</script>

<template>
  <div class="field">
    <!-- ================= HERO =================
         Both CTAs must clear the fold on a 360px phone, so the hero stays
         short: eyebrow, headline, one sub-line, buttons. Nothing else. -->
    <section class="bg-paper">
      <div class="mx-auto grid max-w-[1000px] items-center gap-8 px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
       <div>
        <div class="flex items-center justify-between gap-3">
          <span class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-green sm:text-[0.75rem]">
            Field Services · Kampala
          </span>

          <!-- Shares the eyebrow's row so it adds no height above the fold. -->
          <button
            type="button"
            class="theme-btn"
            :aria-label="fieldTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
            :title="fieldTheme === 'dark' ? 'Light theme' : 'Dark theme'"
            @click="toggleTheme"
          >
            <svg v-if="fieldTheme === 'dark'" class="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.6v2.2M12 19.2v2.2M4.3 4.3l1.6 1.6M18.1 18.1l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.3 19.7l1.6-1.6M18.1 5.9l1.6-1.6" />
            </svg>
            <svg v-else class="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
            </svg>
            <span>{{ fieldTheme === 'dark' ? 'Light' : 'Dark' }}</span>
          </button>
        </div>

        <h1 class="mt-4 max-w-[16ch] text-[2rem] font-extrabold leading-[1.04] tracking-tight text-inkf xs:text-[2.3rem] sm:text-[3.2rem]">
          WiFi, CCTV and hotspot systems, installed properly.
        </h1>

        <p class="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-inkf sm:text-[1.12rem]">
          BitPulse installs and maintains networks and camera systems for schools, hostels, offices
          and businesses around Kampala. Site survey, installation, and support after the job is
          done.
        </p>

        <!-- Real anchors, not handlers: these must work with JS disabled. -->
        <div class="mt-6 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <a :href="whatsappHref" class="cta cta-primary" rel="noopener">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.21.89 2.39 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
            </svg>
            WhatsApp us
          </a>

          <a :href="fieldContact.primary.href" class="cta cta-secondary">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
            </svg>
            Call <span class="num">{{ fieldContact.primary.display }}</span>
          </a>
        </div>
       </div>

        <!-- Site diagram: what we actually put on your building. Ordered after
             the CTAs so it never pushes them off a 360px screen. -->
        <div class="mt-2 lg:mt-0">
          <SiteDiagram />
        </div>
      </div>
    </section>

    <!-- ================= WHAT WE INSTALL ================= -->
    <section class="border-t border-rule bg-card">
      <div class="mx-auto max-w-[1000px] px-5 py-11 sm:px-8 sm:py-16">
        <h2 class="text-[1.45rem] font-extrabold tracking-tight text-inkf sm:text-[1.9rem]">
          What we install
        </h2>

        <div class="mt-7 grid gap-4 sm:grid-cols-2">
          <article
            v-for="s in fieldInstalls"
            :key="s.id"
            class="rounded-xl border border-rule bg-paper p-5 sm:p-6"
          >
            <span class="grid h-11 w-11 place-items-center rounded-lg bg-greensoft text-green">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <template v-if="s.icon === 'wifi'">
                  <path d="M2.5 8.5a16 16 0 0 1 19 0" />
                  <path d="M5.5 12.2a11 11 0 0 1 13 0" />
                  <path d="M8.5 15.9a6 6 0 0 1 7 0" />
                  <path d="M12 19.5h.01" />
                </template>
                <template v-else-if="s.icon === 'camera'">
                  <!-- Bullet camera: sun visor, capsule body, lens ring, wall
                       bracket. The previous abstract shape did not read as a
                       camera at 24px, which is the only size it is ever seen at. -->
                  <path d="M6 5.9h10.4" />
                  <rect x="5" y="7.3" width="13" height="6.6" rx="3.3" />
                  <circle cx="14.6" cy="10.6" r="2" />
                  <path d="M9 13.9v3.3" />
                  <path d="M6.4 17.2h5.2" />
                </template>
                <template v-else-if="s.icon === 'ticket'">
                  <path d="M3 8.5V6.8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v1.7a2.2 2.2 0 0 0 0 4.4v1.7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.7a2.2 2.2 0 0 0 0-4.4Z" />
                  <path d="M9.5 9.2v.01M9.5 12v.01M9.5 14.8v.01" />
                </template>
                <template v-else>
                  <path d="M12 3 2 7.5l10 4.5 10-4.5L12 3Z" />
                  <path d="M6 10v5.2c0 1.6 2.7 2.8 6 2.8s6-1.2 6-2.8V10" />
                  <path d="M21 8v6" />
                </template>
              </svg>
            </span>
            <h3 class="mt-4 text-[1.1rem] font-bold text-inkf">{{ s.name }}</h3>
            <p class="mt-2 text-[0.96rem] leading-relaxed text-inkf">{{ s.body }}</p>
          </article>
        </div>

        <!-- Straight into the priced kits: they have just read what we
             install, so this is the moment they want a number. -->
        <RouterLink
          to="/kits"
          class="mt-6 flex items-center gap-4 rounded-xl border border-rule bg-paper p-5 no-underline sm:p-6"
        >
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-greensoft text-green">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 9h18M8 13h8M8 16.5h5" />
            </svg>
          </span>
          <span class="flex-1">
            <span class="block text-[1.05rem] font-bold text-inkf">Build a kit and see the price</span>
            <span class="mt-1 block text-[0.9rem] leading-relaxed text-muted">
              Pick your cameras, access points or lab seats and the total updates as you go.
            </span>
          </span>
          <span class="shrink-0 text-[1.1rem] font-semibold text-green" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>

    <!-- ================= WHO WE WORK WITH ================= -->
    <section class="border-t border-rule bg-paper">
      <div class="mx-auto max-w-[1000px] px-5 py-9 sm:px-8 sm:py-12">
        <h2 class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
          Who we work with
        </h2>
        <ul class="mt-4 flex list-none flex-wrap gap-2 p-0">
          <li
            v-for="a in fieldAudiences"
            :key="a"
            class="rounded-full border border-rule bg-card px-3.5 py-1.5 text-[0.88rem] text-inkf"
          >
            {{ a }}
          </li>
        </ul>
      </div>
    </section>

    <!-- ================= HOW IT WORKS =================
         Genuinely sequential, so the numbers carry meaning here. -->
    <section class="border-t border-rule bg-card">
      <div class="mx-auto max-w-[1000px] px-5 py-11 sm:px-8 sm:py-16">
        <h2 class="text-[1.45rem] font-extrabold tracking-tight text-inkf sm:text-[1.9rem]">
          How it works
        </h2>

        <ol class="mt-7 grid list-none gap-4 p-0 sm:grid-cols-3">
          <li
            v-for="(step, i) in fieldSteps"
            :key="step.name"
            class="rounded-xl border border-rule bg-paper p-5 sm:p-6"
          >
            <span class="num grid h-9 w-9 place-items-center rounded-full bg-green text-[0.95rem] font-semibold text-white">
              {{ i + 1 }}
            </span>
            <h3 class="mt-4 text-[1.06rem] font-bold text-inkf">{{ step.name }}</h3>
            <p class="mt-2 text-[0.94rem] leading-relaxed text-inkf">{{ step.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ================= TRUST =================
         Real photos of real jobs, plus three checkable facts. Deliberately no
         testimonials, no client logos and no statistics: this visitor has met
         Aine and can verify everything here, so anything invented would be
         caught and would cost the sale. -->
    <section class="border-t border-rule bg-paper">
      <div class="mx-auto max-w-[1000px] px-5 py-11 sm:px-8 sm:py-16">
        <h2 class="text-[1.45rem] font-extrabold tracking-tight text-inkf sm:text-[1.9rem]">
          Our work
        </h2>

        <div class="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          <figure v-for="p in fieldPhotos" :key="p.src" class="m-0">
            <!-- width/height are set on both the real image and the placeholder
                 so the 4:3 box is reserved before anything loads. -->
            <img
              v-if="p.ready"
              :src="p.src"
              :alt="p.caption"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full rounded-lg border border-rule object-cover"
            />
            <div
              v-else
              class="grid aspect-[4/3] w-full place-items-center rounded-lg border border-dashed border-rule bg-card px-2 text-center"
              aria-hidden="true"
            >
              <span class="num text-[0.6rem] leading-tight text-muted sm:text-[0.68rem]">
                {{ p.src.replace('/field/', '') }}
              </span>
            </div>
            <figcaption class="mt-2 text-[0.8rem] leading-snug text-muted sm:text-[0.85rem]">
              {{ p.caption }}
            </figcaption>
          </figure>
        </div>

        <ul class="mt-9 grid list-none gap-3 p-0 sm:grid-cols-3">
          <li
            v-for="f in fieldFacts"
            :key="f"
            class="rounded-xl border border-rule bg-card p-5 text-[0.96rem] leading-relaxed text-inkf"
          >
            {{ f }}
          </li>
        </ul>
      </div>
    </section>

    <!-- ================= COVERAGE ================= -->
    <section class="border-t border-rule bg-card">
      <div class="mx-auto max-w-[1000px] px-5 py-8 sm:px-8 sm:py-10">
        <h2 class="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">Coverage</h2>
        <p class="mt-3 text-[1.02rem] text-inkf sm:text-[1.1rem]">
          Kampala and surrounding areas. Outside Kampala by arrangement.
        </p>
      </div>
    </section>

    <!-- ================= FINAL CTA =================
         The photo prompt is the real conversion lever: it turns "I should get
         a quote sometime" into a message that can be sent in ten seconds. -->
    <section class="border-t border-rule bg-panel">
      <div class="mx-auto max-w-[1000px] px-5 py-12 sm:px-8 sm:py-16">
        <h2 class="max-w-[18ch] text-[1.6rem] font-extrabold leading-tight tracking-tight text-panel-ink sm:text-[2.2rem]">
          Get a quote for your building.
        </h2>
        <p class="mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-panel-muted sm:text-[1.08rem]">
          Send a photo of the building or the room and we can give you a rough idea before we visit.
        </p>

        <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a :href="whatsappHref" class="cta cta-primary" rel="noopener">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.21.89 2.39 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
            </svg>
            WhatsApp us
          </a>
          <a :href="fieldContact.primary.href" class="cta cta-onink">
            Call <span class="num">{{ fieldContact.primary.display }}</span>
          </a>
          <a :href="fieldContact.secondary.href" class="cta cta-onink">
            Or <span class="num">{{ fieldContact.secondary.display }}</span>
          </a>
        </div>

        <p class="mt-6 text-[0.9rem] text-panel-muted">
          Ask for {{ fieldContact.person }} · {{ fieldContact.location }}
        </p>
      </div>
    </section>

    <!-- ================= FOOTER =================
         One link home. The studio nav would only pull attention off the call. -->
    <footer class="border-t border-rule bg-paper pb-[calc(76px+env(safe-area-inset-bottom))] md:pb-0">
      <div class="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-3 px-5 py-7 sm:px-8">
        <RouterLink to="/" class="text-[0.9rem] font-semibold text-inkf underline underline-offset-4">
          BitPulse
        </RouterLink>
        <span class="text-[0.8rem] text-muted">© {{ new Date().getFullYear() }} BitPulse</span>
      </div>
    </footer>

    <!-- ================= STICKY MOBILE ACTION BAR =================
         The highest-impact element on the page. Whatever the visitor is
         reading, calling is always one thumb-reach away. Hidden from md up,
         where the inline CTAs are already reachable. -->
    <div
      class="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-rule bg-card px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden"
    >
      <a :href="whatsappHref" class="cta cta-primary cta-bar" rel="noopener">
        <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm4.52 12.15c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.21.89 2.39 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
        </svg>
        WhatsApp
      </a>
      <a :href="fieldContact.primary.href" class="cta cta-secondary cta-bar">
        <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
        </svg>
        Call
      </a>
    </div>
  </div>
</template>

<style scoped>
/* The field design system now lives in src/assets/field.css, shared with the
   /kits pages. Nothing page-specific is left here. */
</style>
