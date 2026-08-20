<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'chip'">
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M9 1.5v2.5M15 1.5v2.5M9 20v2.5M15 20v2.5M1.5 9h2.5M1.5 15h2.5M20 9h2.5M20 15h2.5" />
    </template>
    <template v-else-if="name === 'server'">
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
    </template>
    <template v-else-if="name === 'flask'">
      <path d="M9 3h6M10 3v5l-4 9a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-9V3" />
      <path d="M8 14h8" />
    </template>
    <template v-else-if="name === 'code'">
      <path d="M8 9 4 12l4 3M16 9l4 3-4 3M14 5l-4 14" />
    </template>
    <template v-else-if="name === 'layers'">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M2 8v5l10 5 10-5V8" />
    </template>
    <template v-else-if="name === 'window'">
      <rect x="2" y="4" width="14" height="11" rx="1.5" />
      <path d="M2 7.5h14" />
      <path d="M4.5 5.75h.01M6.75 5.75h.01" />
      <path d="M6 18.5h5" />
      <rect x="15" y="11" width="7" height="10.5" rx="1.5" />
      <path d="M18.2 19.4h.01" />
    </template>
    <template v-else-if="name === 'legacy'">
      <ellipse cx="8" cy="5.5" rx="5.5" ry="2.5" />
      <path d="M2.5 5.5v6c0 1.4 2.5 2.5 5.5 2.5" />
      <path d="M2.5 11.5v6c0 1.4 2.5 2.5 5.5 2.5" />
      <path d="M17 21v-8" />
      <path d="M13.5 16.5 17 13l3.5 3.5" />
    </template>
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </template>
  </svg>
</template>
