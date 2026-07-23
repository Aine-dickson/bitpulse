// Sectors — where the same core (sensing, firmware, connectivity, data) lands.
// `services` lists the capability slugs most relevant to each sector.

export interface Sector {
  id: string
  slug: string
  name: string
  blurb: string
  detail: string
  examples: string[]
  services: string[]
}

export const sectors: Sector[] = [
  {
    id: 'S-01',
    slug: 'smarter-cities',
    name: 'Smarter Cities',
    blurb: 'Metering, mobility & utility telemetry.',
    detail:
      'Instrumenting the systems a city runs on — so utilities, transport and infrastructure can be measured, not guessed at.',
    examples: ['Smart metering', 'Traffic & mobility sensing', 'Utility monitoring'],
    services: ['embedded-iot', 'backend-systems', 'rnd-prototyping'],
  },
  {
    id: 'S-02',
    slug: 'health-tech',
    name: 'Health Tech',
    blurb: 'Connected diagnostic & cold-chain devices.',
    detail:
      'Devices that hold up in clinics and in the field — connected diagnostics and cold-chain monitoring that keep working where it matters.',
    examples: ['Patient monitors', 'Cold-chain tracking', 'Point-of-care diagnostics'],
    services: ['embedded-iot', 'rnd-prototyping', 'firmware-audit'],
  },
  {
    id: 'S-03',
    slug: 'digital-economies',
    name: 'Digital Economies',
    blurb: 'Fintech & POS hardware, agent networks.',
    detail:
      'The hardware and firmware under inclusive finance — payment terminals and agent tooling built for real-world reliability.',
    examples: ['POS & payment hardware', 'Agent-network tooling', 'Secure transaction firmware'],
    services: ['embedded-iot', 'backend-systems', 'firmware-audit'],
  },
  {
    id: 'S-04',
    slug: 'education',
    name: 'Education',
    blurb: 'Affordable lab & learning hardware.',
    detail:
      'Affordable, hands-on hardware for learning — the lab kit and platforms that make engineering teachable at scale.',
    examples: ['Learning kits', 'Lab instrumentation', 'Curriculum hardware'],
    services: ['mentorship-training', 'developer-tools', 'rnd-prototyping'],
  },
  {
    id: 'S-05',
    slug: 'developer-tools',
    name: 'Developer Tools',
    blurb: 'The platform layer under local software.',
    detail:
      'The platform layer beneath local software — SDKs, libraries and services that let other teams build faster.',
    examples: ['SDKs & libraries', 'CLIs & automation', 'Open-source frameworks'],
    services: ['developer-tools', 'backend-systems', 'mentorship-training'],
  },
  {
    id: 'S-06',
    slug: 'embedded-systems',
    name: 'Embedded Systems',
    blurb: 'Industrial & agri sensing at the edge.',
    detail:
      'Rugged sensing and control at the edge — industrial and agricultural systems that run unattended, on tight power budgets.',
    examples: ['Industrial control', 'Agri sensing', 'Edge data acquisition'],
    services: ['embedded-iot', 'firmware-audit', 'rnd-prototyping'],
  },
]

export function getSectorBySlug(slug: string) {
  return sectors.find((s) => s.slug === slug)
}
