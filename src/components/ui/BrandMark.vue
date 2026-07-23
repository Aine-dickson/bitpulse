<script setup lang="ts">
// BitPulse mark: a solid accent tile with a bold pulse waveform — legible at
// small sizes and theme-aware (accent flips with the toggle).
withDefaults(defineProps<{ size?: number }>(), { size: 32 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="30" height="30" rx="8" fill="var(--color-accent)" />
    <path
      d="M5 17 H11.5 L14.5 8 L18 24 L20.5 17 H27"
      stroke="#ffffff"
      stroke-width="2.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
