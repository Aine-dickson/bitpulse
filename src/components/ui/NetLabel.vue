<script setup lang="ts">
defineProps<{ text: string; run?: boolean }>()
</script>

<template>
  <span class="net">
    <span class="net-via" aria-hidden="true" />
    {{ text }}
    <span v-if="run" class="net-run" aria-hidden="true" />
  </span>
</template>
