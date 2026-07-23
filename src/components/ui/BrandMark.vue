<script setup lang="ts">
import { useId } from 'vue'

// BitPulse monogram: a single heartbeat ribbon — flat shelf, V-dip, tall spike,
// then the right side curls into the bowl of a "p" with a descender. Green→teal
// gradient. Height-driven; width follows the glyph's aspect.
withDefaults(defineProps<{ size?: number }>(), { size: 30 })

// Unique gradient id so multiple instances (nav + footer) don't collide.
const gid = `bp-${useId()}`
</script>

<template>
  <svg
    :height="size"
    viewBox="-4 -6 154 226"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    :style="{ width: 'auto' }"
  >
    <defs>
      <linearGradient :id="gid" x1="84" y1="6" x2="96" y2="204" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#8FE04F" />
        <stop offset="0.45" stop-color="#33CE7C" />
        <stop offset="1" stop-color="#1FC3A8" />
      </linearGradient>
    </defs>
    <g
      fill="none"
      :stroke="`url(#${gid})`"
      stroke-width="22"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <!-- shelf → V-dip → spike → stem → descender -->
      <path d="M10 88 L30 88 L56 165 L84 8 L102 86 L96 150 L79 202" />
      <!-- bowl of the p -->
      <path d="M99 82 C154 89 154 153 95 151" />
    </g>
  </svg>
</template>
