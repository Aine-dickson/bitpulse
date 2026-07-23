<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

// BitPulse wordmark (transparent PNG). Two arts: "dark" = dark letters for
// light backgrounds, "light" = white letters for dark backgrounds.
//   variant="auto"  → follows the active theme (light theme → dark art).
//   variant="light" → force the white-letter art (e.g. the always-dark footer).
//   variant="dark"  → force the dark-letter art.
const props = withDefaults(
  defineProps<{ height?: number; variant?: 'auto' | 'light' | 'dark' }>(),
  { height: 40, variant: 'auto' },
)

const { theme } = useTheme()

const useLightArt = computed(
  () => props.variant === 'light' || (props.variant === 'auto' && theme.value === 'dark'),
)
const src = computed(() =>
  useLightArt.value ? '/bitpulse_logo-light.png' : '/bitpulse_logo-dark.png',
)
</script>

<template>
  <img :src="src" alt="BitPulse" :style="{ height: `${height}px` }" class="block w-auto" />
</template>
