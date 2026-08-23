<script setup lang="ts">
// Hero visual for /field. The studio hero draws a routed PCB; this draws the
// thing this audience actually owns: a compound with a router, an access point
// throwing coverage, and a camera sweeping the yard.
//
// Two motions, both pure CSS so they cost no JavaScript and stop dead under
// prefers-reduced-motion:
//
//   1. The access point's waves grow outward. The innermost appears, then the
//      second on top of it, then the third, then all three clear and it starts
//      again. Staggered opacity on three arcs, one shared 3.2s cycle.
//
//   2. The camera pans horizontally across the yard and back. This is a side-on
//      elevation, so a pan shows up as the coverage cone's ground footprint
//      sliding left and right; the body follows through a much smaller angle,
//      because rotating it as far as the cone would read as tilting up and
//      down instead. Both share one pivot and one timing, so the cone stays
//      welded to the lens.
//
// The sweep is clamped to the outward half-plane. The camera sits on the gate
// house looking out across the yard and never rotates back through its own
// structure, which would be nonsense on a real install.
</script>

<template>
  <div class="relative" aria-hidden="true">
    <svg viewBox="0 0 320 240" class="h-auto w-full" role="presentation">
      <!-- ground -->
      <line class="rule" x1="8" y1="206" x2="312" y2="206" />

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

      <!-- cable runs: router to access point, router to camera -->
      <path class="cable" d="M148 158 V101 H172" />
      <path class="cable" d="M170 172 H250 V146" />
      <circle class="node" cx="148" cy="101" r="2.6" />
      <circle class="node" cx="250" cy="172" r="2.6" />

      <!-- ROUTER: body, status LEDs, and a raised antenna -->
      <g>
        <path class="cable" d="M138 162 V152" />
        <path class="cable" d="M138 152 a5 5 0 0 1 8 0" />
        <rect class="box" x="124" y="162" width="48" height="19" rx="4" />
        <circle class="led" cx="133" cy="175" r="1.7" />
        <circle class="led" cx="140" cy="175" r="1.7" />
        <circle class="led" cx="147" cy="175" r="1.7" />
        <path class="port" d="M156 171.5 h10" />
        <text class="tag" x="148" y="192" text-anchor="middle">RTR-0</text>
      </g>

      <!-- ACCESS POINT: waves grow outward on a loop -->
      <g>
        <path class="wave wave-1" d="M196 91 A 13 13 0 0 1 196 111" />
        <path class="wave wave-2" d="M204 83 A 23 23 0 0 1 204 119" />
        <path class="wave wave-3" d="M212 75 A 33 33 0 0 1 212 127" />
        <rect class="box" x="172" y="95" width="17" height="12" rx="2.5" />
        <circle class="led" cx="180.5" cy="101" r="1.6" />
        <text class="tag" x="180" y="90" text-anchor="middle">AP-1</text>
      </g>

      <!-- CAMERA: bracket is fixed, the head and its cone sweep together.
           transform-box:view-box lets transform-origin use viewBox units. -->
      <g>
        <!-- bracket is fixed to the wall; only the head above it pans -->
        <line class="rule" x1="250" y1="146" x2="250" y2="139" />
        <text class="tag" x="252" y="118" text-anchor="middle">CAM-1</text>

        <!-- Coverage sweeps first and furthest: in a side-on elevation, a
             horizontal pan reads as the cone's ground footprint sliding along
             the yard, so that is what carries the motion. -->
        <g class="cam-cone">
          <path class="fov" d="M235 134 L168 206 L206 206 Z" />
          <path class="fov-edge" d="M235 134 L168 206" />
          <path class="fov-edge" d="M235 134 L206 206" />
        </g>

        <!-- The body follows through a much smaller angle. Rotating it as far
             as the cone would read as the camera tilting up and down, which is
             not what a pan looks like. -->
        <g class="cam-body">
          <path class="rule" d="M234 125 h22" />
          <rect class="box" x="232" y="127" width="26" height="11" rx="5.5" />
          <circle class="lens" cx="237" cy="132.5" r="2.6" />
        </g>
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
  fill: none;
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
.node,
.led {
  fill: var(--f-green);
}
.led {
  opacity: 0.75;
}
.port {
  stroke: var(--f-green);
  stroke-width: 1.6;
  stroke-linecap: round;
  opacity: 0.6;
}
.lens {
  fill: var(--f-green);
  opacity: 0.85;
}
.fov {
  fill: var(--f-green);
  opacity: 0.08;
}
.fov-edge {
  fill: none;
  stroke: var(--f-green);
  stroke-width: 1.2;
  stroke-dasharray: 4 4;
  opacity: 0.4;
}
.tag {
  font-family: var(--font-mono);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.08em;
  fill: var(--f-muted);
}

/* --- access point: waves grow outward, then all clear together --- */
.wave {
  fill: none;
  stroke: var(--f-green);
  stroke-width: 1.8;
  stroke-linecap: round;
  opacity: 0;
  animation: wave-grow 3.2s linear infinite;
}
.wave-1 {
  animation-delay: 0s;
}
.wave-2 {
  animation-delay: 0.42s;
}
.wave-3 {
  animation-delay: 0.84s;
}

/* Each arc fades in on its turn and holds until the shared clear at 78%, so
   they stack up one on top of the other before all three vanish together. */
@keyframes wave-grow {
  0% {
    opacity: 0;
  }
  8% {
    opacity: 0.75;
  }
  70% {
    opacity: 0.75;
  }
  78% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

/* --- camera: a horizontal pan across the yard ---
   Both groups pivot on the lens and share one timing, so the cone stays welded
   to the camera. The range is clamped to the outward half-plane: the footprint
   sweeps the open ground and never crosses back under the gate house the
   camera is mounted on. */
.cam-cone,
.cam-body {
  transform-box: view-box;
  transform-origin: 237px 133px;
  animation-duration: 8s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.cam-cone {
  animation-name: cam-pan-cone;
}
.cam-body {
  animation-name: cam-pan-body;
}
@keyframes cam-pan-cone {
  from {
    transform: rotate(-14deg);
  }
  to {
    transform: rotate(6deg);
  }
}
@keyframes cam-pan-body {
  from {
    transform: rotate(-4deg);
  }
  to {
    transform: rotate(2deg);
  }
}

/* Calm is the brief. If the visitor has asked the OS to stop moving things,
   everything parks in a sensible resting state. */
@media (prefers-reduced-motion: reduce) {
  .wave {
    animation: none;
    opacity: 0.55;
  }
  .cam-cone {
    animation: none;
    transform: rotate(-4deg);
  }
  .cam-body {
    animation: none;
    transform: none;
  }
}
</style>
