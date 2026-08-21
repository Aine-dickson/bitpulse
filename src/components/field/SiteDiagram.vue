<script setup lang="ts">
// Hero visual for /field. The studio hero draws a routed PCB; this draws the
// thing this audience actually owns: a compound with a router cabinet, an
// access point throwing coverage, and a camera watching the yard.
//
// Deliberately static. The home diagram animates a pulse along its traces, but
// this visitor is verifying a business before calling, not being entertained,
// and movement here would only compete with the CTAs sitting beside it.
//
// Pure inline SVG: no image request, no layout shift, and it inherits the
// --f-* tokens from the .field wrapper so it follows light and dark with the
// rest of the page.
</script>

<template>
  <div class="relative" aria-hidden="true">
    <svg viewBox="0 0 320 240" class="h-auto w-full" role="presentation">
      <!-- ground -->
      <line class="rule" x1="8" y1="206" x2="312" y2="206" />

      <!-- camera field of view, drawn under the buildings so it reads as light
           falling across the yard rather than a shape sitting on top -->
      <path class="fov" d="M238 130 L150 206 L205 206 Z" />
      <path class="fov-edge" d="M238 130 L150 206" />
      <path class="fov-edge" d="M238 130 L205 206" />

      <!-- main building -->
      <rect class="wall" x="28" y="64" width="146" height="142" />
      <line class="rule" x1="22" y1="64" x2="180" y2="64" />
      <rect class="pane" x="46" y="86" width="24" height="18" />
      <rect class="pane" x="84" y="86" width="24" height="18" />
      <rect class="pane" x="122" y="86" width="24" height="18" />
      <rect class="pane" x="46" y="124" width="24" height="18" />
      <rect class="pane" x="84" y="124" width="24" height="18" />
      <rect class="pane" x="122" y="124" width="24" height="18" />
      <rect class="pane" x="84" y="166" width="26" height="40" />

      <!-- outbuilding / gate house -->
      <rect class="wall" x="214" y="146" width="74" height="60" />
      <line class="rule" x1="208" y1="146" x2="294" y2="146" />

      <!-- cable runs: cabinet to access point, cabinet to camera -->
      <path class="cable" d="M148 160 V101 H174" />
      <path class="cable" d="M168 171 H230 V136 H244" />
      <circle class="node" cx="148" cy="101" r="2.6" />
      <circle class="node" cx="230" cy="171" r="2.6" />
      <circle class="node" cx="230" cy="136" r="2.6" />

      <!-- router cabinet -->
      <rect class="box" x="128" y="160" width="40" height="22" rx="2" />
      <text class="tag" x="148" y="174" text-anchor="middle">RTR-0</text>

      <!-- access point, with coverage -->
      <g>
        <path class="wave" d="M198 89 A 14 14 0 0 1 198 113" />
        <path class="wave" d="M206 81 A 24 24 0 0 1 206 121" />
        <path class="wave" d="M214 73 A 34 34 0 0 1 214 129" />
        <rect class="box" x="174" y="95" width="16" height="12" rx="2" />
        <text class="tag" x="182" y="90" text-anchor="middle">AP-1</text>
      </g>

      <!-- camera on the gate house, looking back over the yard -->
      <g>
        <line class="rule" x1="252" y1="146" x2="252" y2="136" />
        <rect class="box" x="244" y="124" width="26" height="12" rx="2" />
        <path class="box" d="M244 127 L237 129 L237 133 L244 135 Z" />
        <text class="tag" x="257" y="119" text-anchor="middle">CAM-1</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* Tokens are inherited from .field, so this follows the page's light/dark. */
.wall {
  fill: var(--f-card);
  stroke: var(--f-rule);
  stroke-width: 1.6;
}
.pane {
  fill: var(--f-paper);
  stroke: var(--f-rule);
  stroke-width: 1.2;
}
.rule {
  stroke: var(--f-rule);
  stroke-width: 1.6;
  stroke-linecap: round;
}
.box {
  fill: var(--f-card);
  stroke: var(--f-green);
  stroke-width: 1.8;
  stroke-linejoin: round;
}
.cable {
  fill: none;
  stroke: var(--f-green);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.node {
  fill: var(--f-green);
}
.wave {
  fill: none;
  stroke: var(--f-green);
  stroke-width: 1.8;
  stroke-linecap: round;
  opacity: 0.55;
}
.fov {
  fill: var(--f-green);
  opacity: 0.07;
}
.fov-edge {
  fill: none;
  stroke: var(--f-green);
  stroke-width: 1.2;
  stroke-dasharray: 4 4;
  opacity: 0.45;
}
.tag {
  font-family: var(--font-mono);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.08em;
  fill: var(--f-muted);
}
</style>
