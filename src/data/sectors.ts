// Sectors — where the same core (sensing, firmware, connectivity, data) lands.

export interface Sector {
  id: string
  name: string
  blurb: string
  detail: string
  examples: string[]
}

export const sectors: Sector[] = [
  {
    id: 'S-01',
    name: 'Smarter Cities',
    blurb: 'Metering, mobility & utility telemetry.',
    detail:
      'Instrumenting the systems a city runs on — so utilities, transport and infrastructure can be measured, not guessed at.',
    examples: ['Smart metering', 'Traffic & mobility sensing', 'Utility monitoring'],
  },
  {
    id: 'S-02',
    name: 'Health Tech',
    blurb: 'Connected diagnostic & cold-chain devices.',
    detail:
      'Devices that hold up in clinics and in the field — connected diagnostics and cold-chain monitoring that keep working where it matters.',
    examples: ['Patient monitors', 'Cold-chain tracking', 'Point-of-care diagnostics'],
  },
  {
    id: 'S-03',
    name: 'Digital Economies',
    blurb: 'Fintech & POS hardware, agent networks.',
    detail:
      'The hardware and firmware under inclusive finance — payment terminals and agent tooling built for real-world reliability.',
    examples: ['POS & payment hardware', 'Agent-network tooling', 'Secure transaction firmware'],
  },
  {
    id: 'S-04',
    name: 'Education',
    blurb: 'Affordable lab & learning hardware.',
    detail:
      'Affordable, hands-on hardware for learning — the lab kit and platforms that make engineering teachable at scale.',
    examples: ['Learning kits', 'Lab instrumentation', 'Curriculum hardware'],
  },
  {
    id: 'S-05',
    name: 'Developer Tools',
    blurb: 'The platform layer under local software.',
    detail:
      'The platform layer beneath local software — SDKs, libraries and services that let other teams build faster.',
    examples: ['SDKs & libraries', 'CLIs & automation', 'Open-source frameworks'],
  },
  {
    id: 'S-06',
    name: 'Embedded Systems',
    blurb: 'Industrial & agri sensing at the edge.',
    detail:
      'Rugged sensing and control at the edge — industrial and agricultural systems that run unattended, on tight power budgets.',
    examples: ['Industrial control', 'Agri sensing', 'Edge data acquisition'],
  },
]
