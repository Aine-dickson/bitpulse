<script setup lang="ts">
import { useId } from 'vue'

// BitPulse monogram: the pulse-shaped "p" from the wordmark — a stem+bowl "p"
// with a heartbeat running through it, in the brand green→teal gradient.
// Height-driven; width follows the glyph's aspect.
withDefaults(defineProps<{ size?: number }>(), { size: 30 })

// Unique gradient id so multiple instances (nav + footer) don't collide.
const gid = `bp-${useId()}`
</script>

<template>
  <svg
    :height="size"
    viewBox="0 0 100 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    :style="{ width: 'auto' }"
  >
    <defs>
      <linearGradient :id="gid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#41B86F" />
        <stop offset="1" stop-color="#1FC6A6" />
      </linearGradient>
    </defs>
    <!-- stem + descender -->
    <rect x="39" y="40" width="15" height="84" rx="7.5" :fill="`url(#${gid})`" />
    <!-- bowl -->
    <circle cx="64" cy="66" r="16" fill="none" :stroke="`url(#${gid})`" stroke-width="14" />
    <!-- heartbeat through the stem -->
    <path
      d="M22 50 H40 L46 30 L54 78 L60 50 H70"
      fill="none"
      :stroke="`url(#${gid})`"
      stroke-width="7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
