// Capabilities / services — the work BitPulse takes on.
// `ref` is the mono reference-designator shown on each card (R1..Rn),
// `icon` maps to a symbol in components/ui/CapIcon.vue.

export interface Service {
  slug: string
  ref: string
  name: string
  tag: string
  icon: string
  summary: string
}

export const services: Service[] = [
  {
    slug: 'embedded-iot',
    ref: 'R1',
    name: 'Embedded & IoT',
    tag: 'Firmware',
    icon: 'chip',
    summary:
      'Sensor nodes, gateways and low-power firmware — from board bring-up to fleet telemetry.',
  },
  {
    slug: 'backend-systems',
    ref: 'R2',
    name: 'Backend & Systems',
    tag: 'Systems',
    icon: 'server',
    summary: 'Rust, C and Go services built for real-time data, hard deadlines and small footprints.',
  },
  {
    slug: 'rnd-prototyping',
    ref: 'R3',
    name: 'R&D & Prototyping',
    tag: 'Prototype',
    icon: 'flask',
    summary: 'Schematic to working proof-of-concept — de-risk the hard part before you tool up.',
  },
  {
    slug: 'developer-tools',
    ref: 'R4',
    name: 'Developer Tools & OSS',
    tag: 'Tooling',
    icon: 'code',
    summary: 'SDKs, CLIs and open frameworks that make the platform under your product usable.',
  },
  {
    slug: 'mentorship-training',
    ref: 'R5',
    name: 'Mentorship & Training',
    tag: 'Training',
    icon: 'layers',
    summary:
      'Cohort-based embedded & systems training that leaves your team able to maintain the build.',
  },
  {
    slug: 'firmware-audit',
    ref: 'R6',
    name: 'Firmware Audit',
    tag: 'Review',
    icon: 'clock',
    summary:
      'A fixed-scope review of an existing codebase — reliability, power, security, upgrade path.',
  },
]

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug)
}
