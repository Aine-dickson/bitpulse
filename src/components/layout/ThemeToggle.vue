<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()
</script>

<template>
  <div class="toggle" role="group" aria-label="Colour theme">
    <button
      type="button"
      class="opt"
      :class="{ on: theme === 'light' }"
      :aria-pressed="theme === 'light'"
      @click="setTheme('light')"
    >
      LIGHT
    </button>
    <button
      type="button"
      class="opt"
      :class="{ on: theme === 'dark' }"
      :aria-pressed="theme === 'dark'"
      @click="setTheme('dark')"
    >
      DARK
    </button>
  </div>
</template>

<style scoped>
.toggle {
  display: inline-flex;
  border: 1px solid var(--color-line-2);
  border-radius: 5px;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
}
.opt {
  padding: 7px 10px;
  cursor: pointer;
  background: transparent;
  color: var(--color-ink-3);
  border: 0;
  transition: background 0.18s, color 0.18s;
}
.opt.on {
  background: var(--color-ink);
  color: var(--color-plate-0);
}
</style>
