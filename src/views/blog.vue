<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { breadcrumbLd, itemListLd } from '@/utils/structuredData'
import allPosts from '@/content/posts.json'
import NetLabel from '@/components/ui/NetLabel.vue'

useSeoMeta({
  title: 'Embedded Systems & Firmware Engineering Blog',
  description:
    'Insights, guides and case studies from the BitPulse team on embedded systems, firmware, bare-metal development, prototyping and open hardware.',
  canonical: '/blogs',
  jsonLd: [
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blogs' },
    ]),
    {
      '@type': 'Blog',
      '@id': 'https://bitpulse.dev/blogs#blog',
      name: 'BitPulse Field Notes',
      description:
        'Embedded systems, firmware and systems-software engineering notes from the BitPulse studio.',
      url: 'https://bitpulse.dev/blogs',
      inLanguage: 'en',
    },
    itemListLd({
      name: 'BitPulse articles',
      items: (allPosts as { title: string; slug: string }[]).map((p) => ({
        name: p.title,
        path: `/blogs/${p.slug}`,
      })),
    }),
  ],
})

const blogStore = useBlogStore()
const isSearch = ref(false)
const searchTarget = ref('')

const tags = [
  'Embedded Systems',
  'IoT',
  'Prototyping',
  'Open Source',
  'Hardware Design',
  'Software Development',
  'Case Studies',
  'Tech Insights',
]

function searchWord() {
  blogStore.toggleFilterBySearch(searchTarget.value.trim().length > 0)
}
function toggleSearch() {
  isSearch.value = !isSearch.value
}
function switchFilter(tag: string) {
  if (blogStore.tags.find((t) => t === tag)) blogStore.rmTagFilter(tag)
  else blogStore.addTagFilter(tag)
}

const featured = computed(() => {
  const id = blogStore.featuredBlogPost
  return id ? (blogStore.posts.find((p) => p.id === id) ?? null) : null
})

const posts = computed(() => {
  const hasSearch = blogStore.filterBySearch && searchTarget.value.trim().length > 0
  if (hasSearch) return blogStore.getPostsBySearch(searchTarget.value)
  if (blogStore.tags.length > 0) return blogStore.getPostsByTags()
  return blogStore.posts
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Newsletter (Supabase edge function).
const subscriberEmail = ref('')
const isSubscribing = ref(false)
const subscribeSuccess = ref(false)
const subscribeError = ref('')
const honeypot = ref('')
const EDGE_SUBSCRIBE_URL = 'https://bxgleraqtomxwqhykvel.supabase.co/functions/v1/resend-email'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

async function handleSubscribe() {
  subscribeError.value = ''
  if (honeypot.value) {
    subscribeError.value = 'Something went wrong.'
    return
  }
  if (!validateEmail(subscriberEmail.value)) {
    subscribeError.value = 'Please enter a valid email address.'
    return
  }
  isSubscribing.value = true
  try {
    const res = await fetch(EDGE_SUBSCRIBE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email: subscriberEmail.value }),
    })
    if (!res.ok) {
      subscribeError.value = 'Subscription failed. Please try again later.'
      return
    }
    subscribeSuccess.value = true
  } catch {
    subscribeError.value = 'Network error. Please retry.'
  } finally {
    isSubscribing.value = false
  }
}
</script>

<template>
  <!-- HERO -->
  <section class="bg-plate-0">
    <div class="mx-auto max-w-[1120px] px-6 pb-12 pt-20">
      <NetLabel text="Insights & Resources" />
      <h1 class="mt-6 max-w-[20ch] text-[clamp(2.3rem,5.5vw,3.8rem)] leading-[0.98] text-ink">
        Notes from the workbench.
      </h1>
      <p class="mt-6 max-w-[54ch] text-[1.1rem] text-ink-2">
        Thoughts, guides and case studies from the BitPulse team on embedded systems, firmware,
        prototyping and open hardware.
      </p>
    </div>
  </section>

  <section class="bg-plate-1 py-16">
    <div class="mx-auto max-w-[1120px] px-6">
      <!-- Featured -->
      <RouterLink
        v-if="featured"
        :to="{ name: 'blog_post', params: { slug: featured.slug } }"
        class="group mb-12 grid gap-6 overflow-hidden rounded-xl border border-line bg-surface md:grid-cols-2"
        @click="blogStore.previewPost(featured.id)"
      >
        <img
          :src="`/${featured.image}`"
          :alt="featured.title"
          width="1200"
          height="630"
          fetchpriority="high"
          decoding="async"
          class="h-64 w-full object-cover md:h-full"
        />
        <div class="flex flex-col justify-center p-8">
          <span class="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-accent-deep">Featured</span>
          <h2 class="mt-3 text-[1.6rem] text-ink">{{ featured.title }}</h2>
          <p class="mt-3 text-[0.98rem] text-ink-2">{{ featured.excerpt }}</p>
          <span class="mt-5 font-mono text-[0.8rem] text-accent-deep group-hover:underline">Read more →</span>
        </div>
      </RouterLink>

      <!-- Filters -->
      <div class="mb-8 flex flex-wrap items-center gap-3">
        <button
          v-if="!isSearch"
          aria-label="Search posts"
          class="grid h-10 w-10 place-items-center rounded-md bg-accent text-white"
          @click="toggleSearch"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-3.5-3.5" stroke-linecap="round" />
          </svg>
        </button>
        <div v-else class="flex flex-1 items-center gap-2">
          <input
            v-model="searchTarget"
            type="search"
            class="min-w-0 flex-1 rounded-md border border-line-2 bg-surface px-4 py-2.5 text-[0.95rem] text-ink focus:border-accent focus:outline-none"
            placeholder="Search posts…"
            @input="searchWord"
          />
          <button class="btn btn-line" @click="toggleSearch">Close</button>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in tags"
            :key="tag"
            class="rounded-full border px-3.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.04em] transition-colors"
            :class="blogStore.tags.includes(tag)
              ? 'border-accent bg-accent-soft text-accent-deep'
              : 'border-line-2 text-ink-3 hover:border-accent'"
            @click="switchFilter(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Grid -->
      <div v-if="!posts.length" class="rounded-lg border border-line bg-surface p-10 text-center text-ink-3">
        No matching posts found. Please check back later.
      </div>
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="post in posts"
          :key="post.slug"
          :to="{ name: 'blog_post', params: { slug: post.slug } }"
          class="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-accent"
          @click="blogStore.previewPost(post.id)"
        >
          <img
            :src="`/${post.image}`"
            :alt="post.title"
            width="1200"
            height="630"
            loading="lazy"
            decoding="async"
            class="h-44 w-full object-cover"
          />
          <div class="flex flex-1 flex-col p-5">
            <span class="font-mono text-[0.66rem] text-ink-3">{{ formatDate(post.date) }}</span>
            <h3 class="mt-1.5 text-[1.12rem] text-ink">{{ post.title }}</h3>
            <p class="mt-2 line-clamp-3 text-[0.9rem] text-ink-3">{{ post.excerpt }}</p>
            <span class="mt-4 font-mono text-[0.74rem] text-accent-deep opacity-0 transition-opacity group-hover:opacity-100">
              Continue reading →
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Newsletter -->
  <section class="bg-plate-0 py-20">
    <div class="mx-auto max-w-[640px] px-6">
      <div class="rounded-xl border border-line bg-surface p-8 text-center">
        <NetLabel text="Stay in the loop" />
        <h2 class="mx-auto mt-4 max-w-[22ch] text-[clamp(1.5rem,3vw,2rem)] text-ink">
          The latest from the workbench, no spam.
        </h2>
        <form class="mt-6 flex flex-col gap-3 sm:flex-row" novalidate @submit.prevent="handleSubscribe">
          <input
            v-model.trim="subscriberEmail"
            type="email"
            inputmode="email"
            autocomplete="email"
            :disabled="isSubscribing || subscribeSuccess"
            placeholder="you@example.com"
            class="min-w-0 flex-1 rounded-md border border-line-2 bg-plate-0 px-4 py-3 text-[0.95rem] text-ink focus:border-accent focus:outline-none disabled:opacity-60"
          />
          <input v-model="honeypot" type="text" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <button type="submit" :disabled="isSubscribing || subscribeSuccess" class="btn btn-primary justify-center">
            <span v-if="isSubscribing">Subscribing…</span>
            <span v-else-if="subscribeSuccess">Subscribed ✓</span>
            <span v-else>Subscribe</span>
          </button>
        </form>
        <p v-if="subscribeError" class="mt-3 text-[0.85rem] text-red-600">{{ subscribeError }}</p>
        <p v-else-if="subscribeSuccess" class="mt-3 text-[0.85rem] text-accent-deep">
          Subscription successful. Check your inbox.
        </p>
      </div>
    </div>
  </section>
</template>
