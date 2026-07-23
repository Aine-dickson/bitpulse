<script setup lang="ts">
// BitPulse monogram: BP lettering with the signal pulse running through it.
// Theme-aware — letters take `tone` (defaults to the ink token so they flip
// with the theme), the pulse uses the accent token. Pass tone="#fff" on dark
// grounds (e.g. the footer).
withDefaults(defineProps<{ size?: number; tone?: string }>(), {
  size: 34,
  tone: 'var(--color-ink)',
})
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <!-- B -->
    <path
      d="M15 16 V48 M15 16 H23 a8 8 0 0 1 0 16 H15 M15 32 H25 a8 8 0 0 1 0 16 H15"
      :stroke="tone"
      stroke-width="5.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- P -->
    <path
      d="M40 16 V48 M40 16 H48 a8.5 8.5 0 0 1 0 17 H40"
      :stroke="tone"
      stroke-width="5.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- pulse -->
    <path
      d="M6 40 H20 L25 29 L30 51 L34 40 H58"
      stroke="var(--color-accent)"
      stroke-width="3.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
