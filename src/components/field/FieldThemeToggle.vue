<script setup lang="ts">
// The field pages' theme control. An explicit control rather than a bare icon:
// border, fill, and a word saying what it does. A bare icon read as decoration
// and got missed on a real handset.
defineProps<{ theme: 'light' | 'dark' }>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <button
    type="button"
    class="theme-btn"
    :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
    :title="theme === 'dark' ? 'Light theme' : 'Dark theme'"
    @click="$emit('toggle')"
  >
    <svg v-if="theme === 'dark'" class="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M4.3 4.3l1.6 1.6M18.1 18.1l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.3 19.7l1.6-1.6M18.1 5.9l1.6-1.6" />
    </svg>
    <svg v-else class="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
    </svg>
    <span>{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
  </button>
</template>
