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
      'Sensor nodes, gateways and low-power firmware, from board bring-up through to fleet telemetry.',
    detail:
      'Design and deploy intelligent embedded systems for automation, sensing and control, built to run reliably on constrained hardware out in the field.',
    deliverables: [
      'Custom IoT solutions (smart agriculture, health monitors)',
      'Firmware in Rust, C and C++, matched to the silicon you are on',
      'Hardware simulation and bring-up (Wokwi plus real boards)',
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
    summary: 'Services built for real-time data, hard deadlines and small footprints.',
    detail:
      'Reliable, fast backends and system-level tools: the server side of your devices, designed to keep up with them.',
    deliverables: [
      'Backend APIs and services (Rust, Go, Node, Python)',
      'Custom CLI tools for automation and productivity',
      'System-level integrations for edge computing',
      'WebAssembly modules shared between frontend and backend',
    ],
    goodFor: ['Device backends & telemetry', 'High-throughput data pipelines', 'Latency-sensitive services', 'Replacing a slow legacy stack'],
  },
  {
    slug: 'apps-interfaces',
    ref: 'R3',
    name: 'Apps & Interfaces',
    tag: 'Product',
    icon: 'window',
    summary:
      'Web, mobile and desktop software people actually touch: dashboards, portals and field tools.',
    detail:
      'The layer your customers and your own team use every day. We build web apps, mobile interfaces and desktop tools that stay fast on modest hardware and patchy connections.',
    deliverables: [
      'Web applications, dashboards and customer portals',
      'Mobile app interfaces for Android and iOS',
      'Desktop and offline-first tools for field and lab work',
      'Design systems, component libraries and accessible UI',
    ],
    goodFor: ['Putting a UI on your device data', 'Internal ops & admin tools', 'Customer-facing portals', 'Field apps that work offline'],
  },
  {
    slug: 'legacy-modernization',
    ref: 'R4',
    name: 'Legacy Modernization',
    tag: 'Modernize',
    icon: 'legacy',
    summary:
      'Maintenance, migration and rescue for the old system your business still runs on.',
    detail:
      'Software that has been running for years is usually load-bearing. We keep it alive, make it safe to change, and move it forward in steps that never take the business offline.',
    deliverables: [
      'Assessment of an ageing codebase, with a costed upgrade path',
      'Incremental migration to a supported stack and platform',
      'Ongoing maintenance, patching and dependency upgrades',
      'Data migration, integration shims and rollback plans',
    ],
    goodFor: ['A system nobody wants to touch', 'Unsupported runtimes & frameworks', 'Vendor lock-in you want out of', 'Keeping the lights on while you rebuild'],
  },
  {
    slug: 'rnd-prototyping',
    ref: 'R5',
    name: 'R&D & Prototyping',
    tag: 'Prototype',
    icon: 'flask',
    summary: 'Schematic to working proof-of-concept, so you de-risk the hard part before you tool up.',
    detail:
      'Turn ideas into reality with research-driven hardware and software prototypes, so the riskiest assumption gets tested first.',
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
    ref: 'R6',
    name: 'Developer Tools & OSS',
    tag: 'Tooling',
    icon: 'code',
    summary: 'SDKs, CLIs and open frameworks that make the platform under your product usable.',
    detail:
      'Empower developers through tailored tools and community-driven platforms, the layer that makes everything above it easier to build.',
    deliverables: [
      'Custom parsers, formatters and build tooling',
      'SDKs and libraries for your team’s workflow',
      'Open-source embedded libraries and contributions',
      'Developer community platforms (BitCraft)',
    ],
    goodFor: ['Platform & SDK teams', 'Internal tooling & automation', 'Open-source ecosystems', 'Improving developer experience'],
  },
  {
    slug: 'mentorship-training',
    ref: 'R7',
    name: 'Mentorship & Training',
    tag: 'Training',
    icon: 'layers',
    summary:
      'Cohort-based embedded and systems training that leaves your team able to maintain the build.',
    detail:
      'Personalized mentorship and educational programs in modern technologies, so the capability stays with your team rather than only with us.',
    deliverables: [
      'Embedded, systems and modern-language training',
      'Workshops and bootcamps for institutions',
      'Technical curriculum planning and guidance',
      'Remote or onsite mentorship during implementation',
    ],
    goodFor: ['Upskilling an in-house team', 'Institutions & bootcamps', 'Onboarding to a new stack', 'Sustaining a delivered build'],
  },
  {
    slug: 'firmware-audit',
    ref: 'R8',
    name: 'Firmware Audit',
    tag: 'Review',
    icon: 'clock',
    summary:
      'A fixed-scope review of an existing codebase: reliability, power, security and upgrade path.',
    detail:
      'An independent, fixed-scope review of firmware you already run. Where the risk is, what it costs to fix, and what to do first.',
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

/** Service names, for the enquiry forms' "which track" selects. */
export const serviceNames = services.map((s) => s.name)
