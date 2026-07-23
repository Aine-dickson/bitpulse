<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { navLinks } from '@/data/site'
import ThemeToggle from './ThemeToggle.vue'

const open = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-plate-0/85 backdrop-blur-md">
    <div class="mx-auto flex h-[70px] max-w-[1120px] items-center gap-5 px-6">
      <!-- brand -->
      <RouterLink to="/" class="flex items-center gap-3 text-ink" @click="open = false">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <rect x="4.5" y="4.5" width="21" height="21" rx="4" stroke="var(--color-accent)" stroke-width="2" />
          <path d="M8 15h4l2-5 3 10 2-5h3" stroke="var(--color-accent-deep)" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <circle cx="25.5" cy="15" r="1.6" fill="var(--color-accent)" />
        </svg>
        <span class="font-display text-[1.34rem] font-extrabold tracking-tight">
          Bit<span class="text-accent-deep">Pulse</span>
        </span>
      </RouterLink>

      <!-- desktop links -->
      <nav class="ml-3 hidden items-center gap-6 md:flex">
        <RouterLink
          v-for="l in navLinks"
          :key="l.to"
          :to="l.to"
          class="navlink text-[0.95rem] text-ink-2 transition-colors hover:text-ink"
          active-class="text-ink"
        >
          {{ l.label }}
        </RouterLink>
      </nav>

      <div class="ml-auto flex items-center gap-3">
        <ThemeToggle class="hidden xs:inline-flex" />
        <RouterLink to="/contacts" class="btn btn-primary hidden sm:inline-flex">Start a build</RouterLink>
        <button
          type="button"
          class="text-ink md:hidden"
          :aria-expanded="open"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <svg v-if="!open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
      </div>
    </div>

    <!-- mobile menu -->
    <Transition name="fade">
      <div v-if="open" class="border-t border-line bg-plate-0 px-6 py-5 md:hidden">
        <nav class="flex flex-col gap-4">
          <RouterLink
            v-for="l in navLinks"
            :key="l.to"
            :to="l.to"
            class="text-base text-ink-2"
            active-class="text-ink"
            @click="open = false"
          >
            {{ l.label }}
          </RouterLink>
        </nav>
        <div class="mt-5 flex items-center justify-between gap-3">
          <ThemeToggle />
          <RouterLink to="/contacts" class="btn btn-primary" @click="open = false">Start a build</RouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navlink {
  position: relative;
  padding: 5px 0;
}
.navlink::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1.5px;
  width: 0;
  background: var(--color-accent);
  transition: width 0.2s;
}
.navlink:hover::after {
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
