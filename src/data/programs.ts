// Productized programs — fixed-scope engagements, priced up front.
// TODO(content): confirm real pricing before launch.

export interface Program {
  slug: string
  type: string
  name: string
  price: string
  points: string[]
  cta: string
  featured?: boolean
}

export const programs: Program[] = [
  {
    slug: 'pulsenode-starter',
    type: 'Kit · Hardware',
    name: 'PulseNode Starter',
    price: 'sensor node + gateway + dashboard',
    points: [
      'Reference node & gateway hardware',
      'Cloud dashboard + firmware OTA',
      'Schematics & BOM you own',
    ],
    cta: 'Configure a node',
  },
  {
    slug: 'six-week-prototype',
    type: 'Sprint · R&D',
    name: '6-Week Prototype',
    price: 'fixed fee · idea → proof-of-concept',
    points: ['Weekly demoable milestones', 'Bring-up, firmware & a test rig', 'Go / no-go engineering report'],
    cta: 'Book a sprint',
    featured: true,
  },
  {
    slug: 'embedded-cohort',
    type: 'Cohort · Training',
    name: 'Embedded Cohort',
    price: 'per seat · 8-week applied program',
    points: ['Rust / C on real hardware', 'Ship a working device by week 8', 'Certificate + code review'],
    cta: 'Join a cohort',
  },
]
