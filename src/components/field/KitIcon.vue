<script setup lang="ts">
// Icons for the field kits. Drawn to be legible at 24px, which is the only size
// they are ever seen at on a phone.
defineProps<{ name: string }>()
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- Bullet camera: sun visor, capsule body, lens ring, wall bracket -->
    <template v-if="name === 'camera'">
      <path d="M6 5.9h10.4" />
      <rect x="5" y="7.3" width="13" height="6.6" rx="3.3" />
      <circle cx="14.6" cy="10.6" r="2" />
      <path d="M9 13.9v3.3" />
      <path d="M6.4 17.2h5.2" />
    </template>

    <!-- Access point / WiFi -->
    <template v-else-if="name === 'wifi'">
      <path d="M2.5 8.5a16 16 0 0 1 19 0" />
      <path d="M5.5 12.2a11 11 0 0 1 13 0" />
      <path d="M8.5 15.9a6 6 0 0 1 7 0" />
      <path d="M12 19.5h.01" />
    </template>

    <!-- Voucher ticket -->
    <template v-else-if="name === 'ticket'">
      <path d="M3 8.5V6.8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v1.7a2.2 2.2 0 0 0 0 4.4v1.7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.7a2.2 2.2 0 0 0 0-4.4Z" />
      <path d="M9.5 9.2v.01M9.5 12v.01M9.5 14.8v.01" />
    </template>

    <!-- Server + terminals -->
    <template v-else-if="name === 'lab'">
      <rect x="3" y="3" width="8" height="7" rx="1.2" />
      <path d="M5.2 5.4h.01M5.2 7.6h.01" />
      <rect x="14" y="4.5" width="7" height="5" rx="1" />
      <rect x="14" y="14.5" width="7" height="5" rx="1" />
      <rect x="3" y="14.5" width="7" height="5" rx="1" />
      <path d="M7 10v4.5M11.5 7h2.5M11.5 17h2.5" />
    </template>

    <!-- Desktop workstation -->
    <template v-else-if="name === 'desktop'">
      <rect x="2.5" y="4" width="19" height="12" rx="1.5" />
      <path d="M8.5 19.5h7" />
      <path d="M12 16v3.5" />
    </template>
  </svg>
</template>
