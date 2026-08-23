<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useSeoMeta, SITE_URL } from '@/composables/useSeoMeta'
import { useFieldTheme } from '@/composables/useFieldTheme'
import FieldThemeToggle from '@/components/field/FieldThemeToggle.vue'
import KitIcon from '@/components/field/KitIcon.vue'
import { fieldContact } from '@/data/field'
import {
  getKitBySlug,
  defaultConfig,
  priceKit,
  formatUGX,
  kitWhatsappHref,
  kits,
  type KitConfig,
} from '@/data/kits'

// Live kit configurator. Every control writes into `config`; the quote is a
// computed, so the total moves as fast as the visitor taps. This gets used
// one-handed on a phone in someone's compound, so targets are large and the
// running total is always on screen.

const route = useRoute()
const { theme, toggle } = useFieldTheme()

const kit = computed(() => getKitBySlug(route.params.slug as string) ?? null)

// Reactive config seeded from the kit's defaults. Re-seeded if the route
// changes to another kit without unmounting.
const config = reactive<KitConfig>(kit.value ? defaultConfig(kit.value) : {})
watch(
  () => kit.value?.slug,
  () => {
    if (!kit.value) return
    for (const k of Object.keys(config)) delete config[k]
    Object.assign(config, defaultConfig(kit.value))
  },
)

const quote = computed(() => (kit.value ? priceKit(kit.value, config) : null))
const waHref = computed(() =>
  kit.value && quote.value ? kitWhatsappHref(kit.value, config, quote.value) : '#',
)

const showBreakdown = ref(false)
const others = computed(() => kits.filter((k) => k.slug !== kit.value?.slug))

function bump(fieldId: string, delta: number, min: number, max: number) {
  const next = Number(config[fieldId]) + delta
  config[fieldId] = Math.min(max, Math.max(min, next))
}

useSeoMeta({
  title: kit.value
    ? `${kit.value.name} Price & Configurator | BitPulse Kampala`
    : 'Kit',
  description: kit.value
    ? `${kit.value.summary} Configure it and see an indicative Kampala price, then get a written quote after a site visit.`
    : undefined,
  canonical: kit.value ? `/kits/${kit.value.slug}` : '/kits',
  noindex: !kit.value,
  image: '/og/field.png',
  jsonLd: kit.value
    ? [
        {
          '@type': 'Product',
          '@id': `${SITE_URL}/kits/${kit.value.slug}#product`,
          name: kit.value.name,
          description: kit.value.summary,
          category: kit.value.category,
          brand: { '@type': 'Brand', name: 'BitPulse Field Services' },
          // Deliberately no `offers` node. The figure on this page is a
          // configurable estimate, not a fixed price, and marking it up as an
          // Offer would put a number in search results that we have not
          // committed to.
          areaServed: { '@type': 'City', name: 'Kampala' },
        },
      ]
    : [],
})
</script>

<template>
  <div class="field">
    <!-- Not found -->
    <section v-if="!kit" class="bg-paper">
      <div class="mx-auto max-w-[640px] px-5 py-24 text-center">
        <h1 class="text-[1.6rem] font-extrabold text-inkf">Kit not found</h1>
        <p class="mt-3">
          <RouterLink to="/kits" class="text-green underline underline-offset-4">See all kits</RouterLink>
        </p>
      </div>
    </section>

    <template v-else>
      <!-- HERO -->
      <section class="bg-paper">
        <div class="mx-auto max-w-[1000px] px-5 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-12">
          <div class="flex items-center justify-between gap-3">
            <RouterLink
              to="/kits"
              class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-green sm:text-[0.75rem]"
            >
              ← All kits
            </RouterLink>
            <FieldThemeToggle :theme="theme" @toggle="toggle" />
          </div>

          <div class="mt-5 flex items-start gap-4">
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-greensoft text-green">
              <KitIcon :name="kit.icon" class="h-7 w-7" />
            </span>
            <div>
              <h1 class="text-[1.65rem] font-extrabold leading-[1.08] tracking-tight text-inkf sm:text-[2.4rem]">
                {{ kit.name }}
              </h1>
              <p class="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
                {{ kit.category }}
              </p>
            </div>
          </div>

          <p class="mt-4 max-w-[54ch] text-[1rem] leading-relaxed text-inkf">{{ kit.summary }}</p>
        </div>
      </section>

      <!-- CONFIGURATOR + RUNNING TOTAL -->
      <section class="border-t border-rule bg-card">
        <div class="mx-auto grid max-w-[1000px] gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <!-- controls -->
          <div class="flex flex-col gap-7">
            <div v-for="f in kit.fields" :key="f.id">
              <label class="block text-[1rem] font-bold text-inkf" :for="`f-${f.id}`">
                {{ f.label }}
              </label>
              <p v-if="f.help" class="mt-1 text-[0.85rem] leading-relaxed text-muted">{{ f.help }}</p>

              <!-- count: stepper plus a real number input for big jumps -->
              <div v-if="f.kind === 'count'" class="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  class="step-btn"
                  :disabled="Number(config[f.id]) <= f.min"
                  :aria-label="`Fewer ${f.unitLabel}`"
                  @click="bump(f.id, -1, f.min, f.max)"
                >
                  −
                </button>
                <input
                  :id="`f-${f.id}`"
                  v-model.number="config[f.id]"
                  type="number"
                  class="fld num max-w-[110px] text-center"
                  :min="f.min"
                  :max="f.max"
                  inputmode="numeric"
                />
                <button
                  type="button"
                  class="step-btn"
                  :disabled="Number(config[f.id]) >= f.max"
                  :aria-label="`More ${f.unitLabel}`"
                  @click="bump(f.id, 1, f.min, f.max)"
                >
                  +
                </button>
                <span class="text-[0.9rem] text-muted">{{ f.unitLabel }}</span>
              </div>

              <!-- choice: radio group styled as tappable rows -->
              <div v-else-if="f.kind === 'choice'" class="mt-3 grid gap-2">
                <label
                  v-for="c in f.choices"
                  :key="c.id"
                  class="seg"
                  :class="{ 'seg-on': config[f.id] === c.id }"
                >
                  <input
                    v-model="config[f.id]"
                    type="radio"
                    :name="f.id"
                    :value="c.id"
                  />
                  <span class="flex-1">
                    <span class="block text-[0.96rem] font-semibold text-inkf">{{ c.label }}</span>
                    <span v-if="c.note" class="block text-[0.8rem] text-muted">{{ c.note }}</span>
                  </span>
                  <span class="num shrink-0 text-[0.85rem] font-semibold text-muted">
                    <template v-if="c.price > 0">
                      +{{ c.price.toLocaleString('en-US') }}<template v-if="f.multiplyBy">/ea</template>
                    </template>
                    <template v-else>included</template>
                  </span>
                </label>
              </div>

              <!-- toggle -->
              <div v-else class="mt-3">
                <label class="seg" :class="{ 'seg-on': config[f.id] === true }">
                  <input v-model="config[f.id]" type="checkbox" />
                  <span class="flex-1 text-[0.96rem] font-semibold text-inkf">
                    {{ config[f.id] ? 'Included' : 'Not included' }}
                  </span>
                  <span class="num shrink-0 text-[0.85rem] font-semibold text-muted">
                    +{{ f.price.toLocaleString('en-US') }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <!-- running total: sticks on desktop so the number never scrolls away -->
          <aside class="lg:sticky lg:top-6">
            <div class="rounded-xl border border-rule bg-paper p-5 sm:p-6">
              <p class="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Estimated total
              </p>
              <p class="num mt-1 text-[1.9rem] font-extrabold leading-none text-inkf sm:text-[2.2rem]">
                {{ formatUGX(quote!.total) }}
              </p>

              <p v-if="quote!.discountPercent > 0" class="mt-2 text-[0.85rem] font-semibold text-green">
                {{ quote!.discountPercent }}% volume discount applied
                <span class="num">({{ formatUGX(quote!.discountAmount) }} off)</span>
              </p>
              <p v-else-if="quote!.nextTier" class="mt-2 text-[0.82rem] leading-relaxed text-muted">
                <span class="num">{{ formatUGX(quote!.nextTier.gap) }}</span> more reaches the
                {{ quote!.nextTier.percent }}% volume discount.
              </p>

              <!-- hardware limits: warn, never silently "correct" the choice -->
              <ul
                v-if="quote!.warnings.length"
                class="mt-4 flex list-none flex-col gap-2 rounded-lg border border-rule bg-card p-3 text-[0.85rem] leading-relaxed text-inkf"
              >
                <li v-for="w in quote!.warnings" :key="w" class="flex gap-2">
                  <span class="text-green" aria-hidden="true">!</span>
                  <span>{{ w }}</span>
                </li>
              </ul>

              <button
                type="button"
                class="mt-4 text-[0.85rem] font-semibold text-green underline underline-offset-4"
                @click="showBreakdown = !showBreakdown"
              >
                {{ showBreakdown ? 'Hide' : 'Show' }} the breakdown
              </button>

              <div v-if="showBreakdown" class="mt-3 border-t border-rule pt-3">
                <table class="w-full text-[0.83rem]">
                  <tbody>
                    <tr v-for="(l, i) in quote!.lines" :key="i" class="align-top">
                      <td class="py-1.5 pr-2 text-inkf">
                        {{ l.label }}
                        <span v-if="l.detail" class="block text-muted">{{ l.detail }}</span>
                        <span v-if="l.qty > 1" class="num block text-muted">
                          {{ l.qty }} × {{ l.unit.toLocaleString('en-US') }}
                        </span>
                      </td>
                      <td class="num whitespace-nowrap py-1.5 text-right text-inkf">
                        {{ l.total.toLocaleString('en-US') }}
                      </td>
                    </tr>
                    <tr class="border-t border-rule">
                      <td class="py-2 font-semibold text-inkf">Subtotal</td>
                      <td class="num py-2 text-right font-semibold text-inkf">
                        {{ quote!.subtotal.toLocaleString('en-US') }}
                      </td>
                    </tr>
                    <tr v-if="quote!.discountAmount > 0">
                      <td class="py-1 text-green">Volume discount</td>
                      <td class="num py-1 text-right text-green">
                        −{{ quote!.discountAmount.toLocaleString('en-US') }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- The message carries the exact configuration, so the chat opens
                   on a shared spec instead of "how much for cameras?". -->
              <a :href="waHref" class="cta cta-primary mt-5 w-full" rel="noopener">
                <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm4.52 12.15c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.21.89 2.39 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
                </svg>
                Send this setup on WhatsApp
              </a>
              <a :href="fieldContact.primary.href" class="cta cta-secondary mt-2 w-full">
                Call <span class="num">{{ fieldContact.primary.display }}</span>
              </a>

              <p class="mt-4 text-[0.78rem] leading-relaxed text-muted">
                Indicative only. Equipment and labour are quoted separately and confirmed in writing
                after a site visit.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <!-- NOTES -->
      <section class="border-t border-rule bg-paper">
        <div class="mx-auto max-w-[1000px] px-5 py-9 sm:px-8 sm:py-12">
          <h2 class="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
            Worth knowing
          </h2>
          <ul class="mt-4 flex list-none flex-col gap-3 p-0">
            <li
              v-for="n in kit.notes"
              :key="n"
              class="relative pl-5 text-[0.95rem] leading-relaxed text-inkf"
            >
              <span class="absolute left-0 top-[9px] h-2 w-2 rounded-full bg-green" />
              {{ n }}
            </li>
            <li class="relative pl-5 text-[0.95rem] leading-relaxed text-inkf">
              <span class="absolute left-0 top-[9px] h-2 w-2 rounded-full bg-green" />
              {{ kit.goodFor }}
            </li>
          </ul>
        </div>
      </section>

      <!-- OTHER KITS -->
      <section class="border-t border-rule bg-card">
        <div class="mx-auto max-w-[1000px] px-5 py-10 sm:px-8 sm:py-12">
          <h2 class="text-[1.25rem] font-extrabold tracking-tight text-inkf">Other kits</h2>
          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <RouterLink
              v-for="o in others"
              :key="o.slug"
              :to="`/kits/${o.slug}`"
              class="flex items-center gap-3 rounded-xl border border-rule bg-paper p-4 no-underline"
            >
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-greensoft text-green">
                <KitIcon :name="o.icon" class="h-5 w-5" />
              </span>
              <span class="text-[0.98rem] font-semibold text-inkf">{{ o.name }}</span>
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="border-t border-rule bg-paper pb-[calc(76px+env(safe-area-inset-bottom))] md:pb-0">
        <div class="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-3 px-5 py-7 sm:px-8">
          <RouterLink to="/field" class="text-[0.9rem] font-semibold text-inkf underline underline-offset-4">
            Field services
          </RouterLink>
          <RouterLink to="/" class="text-[0.8rem] text-muted underline underline-offset-4">BitPulse</RouterLink>
        </div>
      </footer>

      <!-- STICKY TOTAL + ACTION, mobile only. The number and the way to send it
           are always within thumb reach while scrolling the options. -->
      <div
        class="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-rule bg-card px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden"
      >
        <div class="min-w-0 flex-1">
          <p class="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted">Estimate</p>
          <p class="num truncate text-[1.05rem] font-extrabold leading-tight text-inkf">
            {{ formatUGX(quote!.total) }}
          </p>
        </div>
        <a :href="waHref" class="cta cta-primary cta-bar shrink-0" rel="noopener">
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm4.52 12.15c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.21.89 2.39 1.01 2.55.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
          </svg>
          Send
        </a>
      </div>
    </template>
  </div>
</template>
