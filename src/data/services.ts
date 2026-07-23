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
  /** Longer positioning line for the services page. */
  detail: string
  /** Concrete things we deliver on this track. */
  deliverables: string[]
  /** Typical situations this track is a fit for. */
  goodFor: string[]
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
    detail:
      'Design and deploy intelligent embedded systems for automation, sensing and control — built to run reliably on constrained hardware, in the field.',
    deliverables: [
      'Custom IoT solutions (smart agriculture, health monitors)',
      'Embedded firmware development in Rust',
      'Hardware simulation and bring-up (Wokwi + real boards)',
      'Low-power and performance-optimized designs',
    ],
    goodFor: ['Smart agriculture & sensing', 'Connected consumer devices', 'Industrial monitoring', 'Fleets of remote nodes'],
  },
  {
    slug: 'backend-systems',
    ref: 'R2',
    name: 'Backend & Systems',
    tag: 'Systems',
    icon: 'server',
    summary: 'Rust, C and Go services built for real-time data, hard deadlines and small footprints.',
    detail:
      'Reliable, blazing-fast backends and system-level tools — the server side of your devices, designed to keep up with them.',
    deliverables: [
      'Rust-based backend APIs (Actix, Shuttle)',
      'Custom CLI tools for automation and productivity',
      'System-level integrations for edge computing',
      'WebAssembly modules for frontend/backend use',
    ],
    goodFor: ['Device backends & telemetry', 'High-throughput data pipelines', 'Latency-sensitive services', 'Replacing a slow legacy stack'],
  },
  {
    slug: 'rnd-prototyping',
    ref: 'R3',
    name: 'R&D & Prototyping',
    tag: 'Prototype',
    icon: 'flask',
    summary: 'Schematic to working proof-of-concept — de-risk the hard part before you tool up.',
    detail:
      'Turn ideas into reality with research-driven hardware/software prototypes, so the riskiest assumption is tested first.',
    deliverables: [
      'Hardware-software co-design and integration',
      'Smart infrastructure prototyping (traffic, sensing)',
      'Custom data acquisition systems',
      'Grant-ready technical documentation and research',
    ],
    goodFor: ['Validating a new product idea', 'Grant & research deliverables', 'De-risking before tooling up', 'Hardware/software feasibility'],
  },
  {
    slug: 'developer-tools',
    ref: 'R4',
    name: 'Developer Tools & OSS',
    tag: 'Tooling',
    icon: 'code',
    summary: 'SDKs, CLIs and open frameworks that make the platform under your product usable.',
    detail:
      'Empower developers through tailored tools and community-driven platforms — the layer that makes everything above it easier to build.',
    deliverables: [
      'Custom Markdown parsers and formatting engines',
      'Tooling for Rust-based development workflows',
      'Open-source embedded libraries and contributions',
      'Developer community platforms (BitCraft)',
    ],
    goodFor: ['Platform & SDK teams', 'Internal tooling & automation', 'Open-source ecosystems', 'Improving developer experience'],
  },
  {
    slug: 'mentorship-training',
    ref: 'R5',
    name: 'Mentorship & Training',
    tag: 'Training',
    icon: 'layers',
    summary:
      'Cohort-based embedded & systems training that leaves your team able to maintain the build.',
    detail:
      'Personalized mentorship and educational programs in modern technologies — so the capability stays with your team, not just with us.',
    deliverables: [
      'Rust and embedded programming training',
      'Workshops and bootcamps for institutions',
      'Technical curriculum planning and guidance',
      'Remote/onsite mentorship on project implementation',
    ],
    goodFor: ['Upskilling an in-house team', 'Institutions & bootcamps', 'Onboarding to a new stack', 'Sustaining a delivered build'],
  },
  {
    slug: 'firmware-audit',
    ref: 'R6',
    name: 'Firmware Audit',
    tag: 'Review',
    icon: 'clock',
    summary:
      'A fixed-scope review of an existing codebase — reliability, power, security, upgrade path.',
    detail:
      'An independent, fixed-scope review of firmware you already run — where the risk is, what it costs to fix, and what to do first.',
    deliverables: [
      'Reliability & fault-tolerance review',
      'Power & memory-footprint analysis',
      'Security & update-path assessment',
      'Prioritized remediation report',
    ],
    goodFor: ['Firmware nearing production', 'Inherited / legacy codebases', 'Reliability or power concerns', 'Pre-launch security review'],
  },
]

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug)
}
