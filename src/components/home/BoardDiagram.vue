<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// The hero's routed board: chips connected by copper traces, with a green
// pulse travelling the trace path on a loop. Animation is client-only and
// disabled for reduced-motion.

const path = ref<SVGPathElement | null>(null)
const dot = ref<SVGCircleElement | null>(null)
let raf = 0

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const p = path.value
  const d = dot.value
  if (!p || !d) return

  const len = p.getTotalLength()

  if (reduce) {
    const pt = p.getPointAtLength(len)
    d.setAttribute('cx', String(pt.x))
    d.setAttribute('cy', String(pt.y))
    return
  }

  let start = 0
  const travel = 5200
  const pause = 900
  const step = (ts: number) => {
    if (!start) start = ts
    const t = (ts - start) % (travel + pause)
    const on = Math.min(t, travel) / travel
    const pt = p.getPointAtLength(on * len)
    d.setAttribute('cx', String(pt.x))
    d.setAttribute('cy', String(pt.y))
    d.style.opacity = String(t > travel ? 1 - (t - travel) / pause : on < 0.04 ? on / 0.04 : 1)
    raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
})

onUnmounted(() => cancelAnimationFrame(raf))
</script>

<template>
  <div class="relative aspect-square" aria-hidden="true">
    <svg viewBox="0 0 300 300" class="absolute inset-0 h-full w-full overflow-visible">
      <!-- traces -->
      <path
        ref="path"
        d="M20 60 H92 V30 H150 M92 60 V150 H60 V210 H140 M150 30 H240 V120 M150 150 H210 V235 H120 V270 M240 120 V200 H190"
        fill="none"
        stroke="var(--color-accent)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.55"
      />

      <!-- chip blocks -->
      <g class="chip">
        <rect x="118" y="12" width="72" height="42" rx="3" />
        <text x="154" y="30" text-anchor="middle" class="chip-name">MCU</text>
        <text x="154" y="44" text-anchor="middle" class="chip-ref">U1 · CORE</text>
      </g>
      <g class="chip">
        <rect x="22" y="150" width="60" height="34" rx="3" />
        <text x="52" y="168" text-anchor="middle" class="chip-name">SENS</text>
        <text x="52" y="180" text-anchor="middle" class="chip-ref">U2</text>
      </g>
      <g class="chip">
        <rect x="196" y="188" width="70" height="36" rx="3" />
        <text x="231" y="207" text-anchor="middle" class="chip-name">RADIO</text>
        <text x="231" y="219" text-anchor="middle" class="chip-ref">U3 · RF</text>
      </g>

      <!-- vias + pins -->
      <circle class="via" cx="20" cy="60" r="5" />
      <circle class="via" cx="140" cy="210" r="5" />
      <circle class="via" cx="120" cy="270" r="5" />
      <circle class="via" cx="240" cy="120" r="4" />
      <circle class="pin" cx="92" cy="60" r="3" />
      <circle class="pin" cx="150" cy="150" r="3" />
      <circle class="pin" cx="210" cy="150" r="3" />

      <!-- travelling pulse -->
      <circle ref="dot" class="pin" r="4" cx="20" cy="60" />
    </svg>
  </div>
</template>

<style scoped>
.chip rect {
  fill: var(--color-surface);
  stroke: var(--color-line-2);
}
.chip-name {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  fill: var(--color-ink);
}
.chip-ref {
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: 0.06em;
  fill: var(--color-ink-3);
}
.via {
  fill: var(--color-plate-0);
  stroke: var(--color-accent);
  stroke-width: 2.4;
}
.pin {
  fill: var(--color-accent);
}
</style>
