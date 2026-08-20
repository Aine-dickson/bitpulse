// The Lab — BitPulse's product hub. Each entry gets its own prerendered page at
// /lab/<slug> with SoftwareApplication schema, so products are individually
// indexable and can rank on their own name.
//
// IMPORTANT: `detail`, `features` and `keywords` are the fields that actually
// earn rankings. Entries marked TODO(owner) below carry placeholder copy — they
// must be replaced with real descriptions before they're worth indexing.

export type ProjectStatus = 'Live' | 'Beta' | 'Building' | 'Concept'

export interface Project {
  slug: string
  name: string
  category: string
  /** One-line card blurb. */
  blurb: string
  status: ProjectStatus
  tags: string[]
  /** Invite early testers to sign up for this one. */
  earlyAccess?: boolean

  // --- Fields below drive the /lab/<slug> page and its structured data ---

  /** 2–4 sentences. Becomes the meta description + page intro. */
  detail?: string
  /** Concrete capabilities. Rendered as a list; also feeds featureList schema. */
  features?: string[]
  /** Who it's for / what problem it solves. */
  goodFor?: string[]
  /** schema.org applicationCategory, e.g. 'DeveloperApplication'. */
  appCategory?: string
  /** Where the product actually lives, if off-site (e.g. the BitCraft subdomain). */
  externalUrl?: string
  /** Label for the external link button. */
  externalLabel?: string
  /** Search terms this page should target. Used for keyword copy, not stuffed. */
  keywords?: string[]
  /** Set false to keep an unfinished entry out of the index + sitemap. */
  indexable?: boolean
}

export const statusMeta: Record<ProjectStatus, { label: string; dot: string; note: string }> = {
  Live: { label: 'Live', dot: '#12924E', note: 'Available now' },
  Beta: { label: 'Beta', dot: '#C98A2B', note: 'Open to early testers' },
  Building: { label: 'Building', dot: '#2D6BFF', note: 'In active development' },
  Concept: { label: 'Concept', dot: '#7A827B', note: 'On the drawing board' },
}

export const projects: Project[] = [
  {
    // TODO(owner): replace every field below with the real Rux positioning.
    // Placeholder copy is NOT indexable — flip `indexable` once it's real.
    slug: 'rux',
    name: 'Rux',
    category: 'Developer tool',
    blurb: 'TODO(owner): one-line description of Rux.',
    detail:
      'TODO(owner): 2–4 sentences on what Rux is, what problem it solves, who it is for, and what it is built with.',
    status: 'Building',
    tags: ['Rust', 'Developer tools'],
    features: ['TODO(owner): capability 1', 'TODO(owner): capability 2'],
    goodFor: ['TODO(owner): audience 1'],
    appCategory: 'DeveloperApplication',
    keywords: ['rux', 'rux bitpulse'],
    indexable: false,
    earlyAccess: true,
  },
  {
    // TODO(owner): Mava is described as an "ecosystem" — if it is several
    // products, split it into one entry per product; hubs rank worse than
    // specific pages.
    slug: 'mava',
    name: 'Mava',
    category: 'Platform',
    blurb: 'TODO(owner): one-line description of the Mava ecosystem.',
    detail:
      'TODO(owner): what Mava is, the components in the ecosystem, and the problem it solves.',
    status: 'Building',
    tags: ['Platform'],
    features: ['TODO(owner): component 1', 'TODO(owner): component 2'],
    goodFor: ['TODO(owner): audience 1'],
    appCategory: 'BusinessApplication',
    keywords: ['mava', 'mava ecosystem'],
    indexable: false,
    earlyAccess: true,
  },
  {
    // TODO(owner): "SMS" is ambiguous — it collides with the messaging protocol,
    // which is unrankable as a bare term. A distinct product name, or a
    // qualified one ("BitPulse SMS Gateway"), is strongly recommended.
    slug: 'sms',
    name: 'SMS',
    category: 'Messaging',
    blurb: 'TODO(owner): one-line description of the SMS product.',
    detail: 'TODO(owner): what it does, who it serves, and how it is deployed.',
    status: 'Building',
    tags: ['Messaging'],
    features: ['TODO(owner): capability 1'],
    goodFor: ['TODO(owner): audience 1'],
    appCategory: 'BusinessApplication',
    keywords: ['bitpulse sms'],
    indexable: false,
    earlyAccess: true,
  },
  {
    slug: 'bitcraft',
    name: 'BitCraft',
    category: 'Academy',
    blurb:
      'The BitPulse academy: hands-on embedded, firmware and systems training for African engineers.',
    detail:
      'BitCraft is the academy branch of BitPulse: practical, project-led training in embedded systems, firmware and systems programming. It exists to close the gap between computer-science theory and the bare-metal skills African hardware teams actually hire for.',
    status: 'Building',
    tags: ['Academy', 'Training', 'Embedded'],
    features: [
      'TODO(owner): programme/track 1',
      'TODO(owner): programme/track 2',
      'TODO(owner): programme/track 3',
    ],
    goodFor: [
      'Engineers moving from application code to embedded',
      'Teams upskilling on Rust and C for bare metal',
      'Students seeking practical hardware experience',
    ],
    appCategory: 'EducationalApplication',
    externalUrl: 'https://craft.bitpulse.dev',
    externalLabel: 'Visit BitCraft',
    keywords: [
      'bitcraft',
      'bitcraft academy',
      'embedded systems training uganda',
      'firmware training africa',
    ],
    // This page is the canonical, indexable home for BitCraft: the subdomain is
    // client-rendered and currently invisible to search.
    indexable: true,
    earlyAccess: true,
  },
  {
    slug: 'pulsenode',
    name: 'PulseNode',
    category: 'IoT hardware',
    blurb:
      'A reference sensor node + gateway + dashboard you can build a fleet on, with firmware OTA out of the box.',
    detail:
      'PulseNode is a reference IoT stack: a sensor node, a gateway and a telemetry dashboard, with over-the-air firmware updates built in, so a fleet can be deployed and maintained without rebuilding the plumbing each time.',
    status: 'Beta',
    tags: ['IoT', 'Firmware', 'OTA'],
    features: [
      'Reference sensor-node firmware',
      'Gateway with store-and-forward telemetry',
      'Over-the-air firmware updates',
      'Fleet dashboard',
    ],
    goodFor: ['Sensing deployments', 'Industrial monitoring', 'Smart agriculture pilots'],
    appCategory: 'DeveloperApplication',
    keywords: ['iot reference design', 'ota firmware updates', 'sensor node gateway'],
    indexable: true,
    earlyAccess: true,
  },
  {
    slug: 'markdown-engine',
    name: 'Markdown Engine',
    category: 'Developer tool',
    blurb: 'A fast, embeddable Markdown parser and formatting engine built in Rust.',
    detail:
      'A Markdown parser and formatting engine written in Rust, designed to be embedded in other tools. Fast enough for editor-latency workloads, small enough to ship inside a binary.',
    status: 'Live',
    tags: ['Rust', 'OSS', 'Parser'],
    features: ['CommonMark parsing', 'Embeddable Rust library', 'Formatting/normalisation pass'],
    goodFor: ['Editor and CMS builders', 'Static-site tooling', 'Rust projects needing Markdown'],
    appCategory: 'DeveloperApplication',
    keywords: ['rust markdown parser', 'embeddable markdown engine'],
    indexable: true,
  },
  {
    slug: 'smart-metering',
    name: 'Smart Metering Pilot',
    category: 'Smarter cities',
    blurb:
      'A utility-metering telemetry pilot: prepaid billing and remote monitoring for constrained networks.',
    detail:
      'A utility-metering pilot built for constrained networks: prepaid billing and remote monitoring that keep working when connectivity is intermittent, aimed at African utility deployments.',
    status: 'Building',
    tags: ['Metering', 'LoRa', 'Telemetry'],
    features: ['Prepaid billing', 'Remote meter monitoring', 'LoRa telemetry backhaul'],
    goodFor: ['Utilities', 'Municipal infrastructure', 'Prepaid energy providers'],
    appCategory: 'BusinessApplication',
    keywords: ['smart metering africa', 'prepaid utility metering', 'lora telemetry'],
    indexable: true,
    earlyAccess: true,
  },
]

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug)

/** Only fully-written entries belong in the index and the sitemap. */
export const indexableProjects = projects.filter((p) => p.indexable !== false)
