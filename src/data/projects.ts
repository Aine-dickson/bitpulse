// The Lab — shipped products and in-progress projects, with a status so early
// testers can see what's ready to try.
// TODO(content): confirm the real product list, statuses and links with the team.

export type ProjectStatus = 'Live' | 'Beta' | 'Building' | 'Concept'

export interface Project {
  slug: string
  name: string
  category: string
  blurb: string
  status: ProjectStatus
  tags: string[]
  /** Invite early testers to sign up for this one. */
  earlyAccess?: boolean
}

export const statusMeta: Record<ProjectStatus, { label: string; dot: string; note: string }> = {
  Live: { label: 'Live', dot: '#12924E', note: 'Available now' },
  Beta: { label: 'Beta', dot: '#C98A2B', note: 'Open to early testers' },
  Building: { label: 'Building', dot: '#2D6BFF', note: 'In active development' },
  Concept: { label: 'Concept', dot: '#7A827B', note: 'On the drawing board' },
}

export const projects: Project[] = [
  {
    slug: 'pulsenode',
    name: 'PulseNode',
    category: 'IoT hardware',
    blurb: 'A reference sensor node + gateway + dashboard you can build a fleet on — with firmware OTA out of the box.',
    status: 'Beta',
    tags: ['IoT', 'Firmware', 'OTA'],
    earlyAccess: true,
  },
  {
    slug: 'bitcraft',
    name: 'BitCraft',
    category: 'Developer community',
    blurb: 'An open innovation community and platform for African builders — mentorship, projects and shared tooling.',
    status: 'Building',
    tags: ['Community', 'Open Source'],
    earlyAccess: true,
  },
  {
    slug: 'markdown-engine',
    name: 'Markdown Engine',
    category: 'Developer tool',
    blurb: 'A fast, embeddable Markdown parser and formatting engine built in Rust.',
    status: 'Live',
    tags: ['Rust', 'OSS', 'Parser'],
  },
  {
    slug: 'smart-metering',
    name: 'Smart Metering Pilot',
    category: 'Smarter cities',
    blurb: 'A utility-metering telemetry pilot — prepaid billing and remote monitoring for constrained networks.',
    status: 'Building',
    tags: ['Metering', 'LoRa', 'Telemetry'],
    earlyAccess: true,
  },
]
