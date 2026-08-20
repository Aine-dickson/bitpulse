// Sectors — where the same core (sensing, firmware, connectivity, data) lands.
// `services` lists the capability slugs most relevant to each sector.
//
// The detail pages are built from `constraints`, `signals`, `stack` and
// `outcomes`. Those four exist so a sector page says something a prospect
// cannot get from the services index: what actually makes the work hard here,
// what we measure, what we build with, and what a good result looks like.

export interface SectorConstraint {
  /** Short designator-style name for the constraint. */
  title: string
  /** The field condition that decides the design. */
  problem: string
  /** How we design around it. */
  response: string
}

export interface Sector {
  id: string
  slug: string
  name: string
  blurb: string
  detail: string
  examples: string[]
  services: string[]
  /** The conditions this sector's hardware and software has to survive. */
  constraints: SectorConstraint[]
  /** Concrete targets we design against, shown as an instrument readout. */
  signals: { label: string; value: string }[]
  /** Typical stack, protocols and parts for this sector. */
  stack: string[]
  /** What a finished build is judged on here. */
  outcomes: string[]
}

export const sectors: Sector[] = [
  {
    id: 'S-01',
    slug: 'smarter-cities',
    name: 'Smarter Cities',
    blurb: 'Metering, mobility & utility telemetry.',
    detail:
      'Instrumenting the systems a city runs on, so utilities, transport and infrastructure can be measured rather than guessed at.',
    examples: ['Smart metering', 'Traffic & mobility sensing', 'Utility monitoring'],
    services: ['embedded-iot', 'backend-systems', 'apps-interfaces'],
    constraints: [
      {
        title: 'Grid is not a given',
        problem:
          'Mains power drops out for hours at a time, and a meter that reboots into a blank state loses the billing period with it.',
        response:
          'Battery-backed nodes with journaled storage, so a power cut costs you a gap in the graph and never a gap in the ledger.',
      },
      {
        title: 'Coverage is patchy',
        problem:
          'A node in a culvert or a basement riser has no usable cellular signal, and the ones that do are on prepaid data.',
        response:
          'Store-and-forward buffering over LoRaWAN or NB-IoT, with backhaul that batches uploads instead of chattering.',
      },
      {
        title: 'Nobody is coming to reset it',
        problem:
          'Field visits cost more than the node. A device that needs a technician twice a year has already failed economically.',
        response:
          'Watchdogs, staged over-the-air updates with automatic rollback, and remote diagnostics before anyone is dispatched.',
      },
    ],
    signals: [
      { label: 'Node uptime target', value: '99.5%' },
      { label: 'Reporting interval', value: '5 to 60 min' },
      { label: 'Field visits / node / yr', value: '< 1' },
    ],
    stack: ['LoRaWAN', 'NB-IoT / LTE-M', 'MQTT', 'Time-series storage', 'Operator dashboards'],
    outcomes: [
      'Consumption and fault data a utility can bill and plan against',
      'One dashboard covering a mixed fleet of meters and sensors',
      'Losses located to a district or a line rather than estimated',
    ],
  },
  {
    id: 'S-02',
    slug: 'health-tech',
    name: 'Health Tech',
    blurb: 'Connected diagnostic & cold-chain devices.',
    detail:
      'Devices that hold up in clinics and in the field. Connected diagnostics and cold-chain monitoring that keep working where it matters most.',
    examples: ['Patient monitors', 'Cold-chain tracking', 'Point-of-care diagnostics'],
    services: ['embedded-iot', 'rnd-prototyping', 'firmware-audit'],
    constraints: [
      {
        title: 'The reading has to be right',
        problem:
          'A drifting sensor on a patient monitor is worse than no monitor, because the number still looks credible.',
        response:
          'Calibration built into the firmware, plausibility checks on every sample, and a device that says "unknown" rather than guessing.',
      },
      {
        title: 'Cold chain fails quietly',
        problem:
          'A fridge that spent six hours above 8°C overnight looks perfectly normal by morning inspection.',
        response:
          'Continuous logging with excursion alarms that survive power loss, plus an audit trail nobody can quietly overwrite.',
      },
      {
        title: 'Operators are not engineers',
        problem:
          'The person using the device is a nurse mid-shift, not a technician with the manual open.',
        response:
          'Interfaces with one obvious action per screen, unambiguous status, and failure states that explain the next step in plain words.',
      },
    ],
    signals: [
      { label: 'Temp accuracy', value: '±0.3°C' },
      { label: 'Log retention offline', value: '30+ days' },
      { label: 'Alarm latency', value: '< 60 s' },
    ],
    stack: ['Medical-grade sensing', 'BLE & GSM backhaul', 'Tamper-evident logging', 'Offline-first mobile apps'],
    outcomes: [
      'Excursions caught while the stock is still savable',
      'Records that stand up to a donor or regulatory audit',
      'Devices clinic staff use correctly without training refreshers',
    ],
  },
  {
    id: 'S-03',
    slug: 'digital-economies',
    name: 'Digital Economies',
    blurb: 'Fintech & POS hardware, agent networks.',
    detail:
      'The hardware and firmware under inclusive finance: payment terminals and agent tooling built for real-world reliability.',
    examples: ['POS & payment hardware', 'Agent-network tooling', 'Secure transaction firmware'],
    services: ['embedded-iot', 'backend-systems', 'apps-interfaces'],
    constraints: [
      {
        title: 'Money cannot be approximate',
        problem:
          'A terminal that loses connectivity mid-transaction must not double-charge, and must not silently drop the sale either.',
        response:
          'Idempotent transaction IDs, a durable local queue, and reconciliation that settles the truth once the link returns.',
      },
      {
        title: 'The device is the attack surface',
        problem:
          'Terminals sit unattended in kiosks and markets, physically reachable by anyone for as long as they like.',
        response:
          'Secure element key storage, signed firmware with verified boot, and tamper response that wipes secrets rather than logging a complaint.',
      },
      {
        title: 'Agents work on thin margins',
        problem:
          'A float reconciliation that takes twenty minutes at close of day eats the agent’s entire profit on small transactions.',
        response:
          'Agent apps that reconcile continuously in the background and surface a float position at a glance.',
      },
    ],
    signals: [
      { label: 'Txn confirm time', value: '< 3 s' },
      { label: 'Offline queue depth', value: '500+ txns' },
      { label: 'Key storage', value: 'Secure element' },
    ],
    stack: ['Secure elements & verified boot', 'ISO 8583 / modern payment APIs', 'Offline queueing', 'Agent mobile apps'],
    outcomes: [
      'Transactions that survive a dropped connection without a dispute',
      'Firmware that passes a payment-scheme security review',
      'Agents who can see their float without doing arithmetic',
    ],
  },
  {
    id: 'S-04',
    slug: 'education',
    name: 'Education',
    blurb: 'Affordable lab & learning hardware.',
    detail:
      'Affordable, hands-on hardware for learning: the lab kit and platforms that make engineering teachable at scale.',
    examples: ['Learning kits', 'Lab instrumentation', 'Curriculum hardware'],
    services: ['mentorship-training', 'developer-tools', 'apps-interfaces'],
    constraints: [
      {
        title: 'Budget per student is tiny',
        problem:
          'A kit priced for a European classroom will never reach a Ugandan one, however good the pedagogy behind it is.',
        response:
          'Designs built from parts you can actually source locally, with simulation covering what the budget cannot.',
      },
      {
        title: 'Students break things',
        problem:
          'Reversed polarity, shorted pins and dropped boards are not edge cases in a teaching lab, they are Tuesday.',
        response:
          'Protection on every exposed rail and a kit that survives being wired wrong, because that is how people learn.',
      },
      {
        title: 'Teachers need to keep up',
        problem:
          'Hardware with no lesson plan behind it becomes a cupboard full of boxes by the second term.',
        response:
          'Curriculum, worked exercises and instructor training delivered alongside the kit, not after it.',
      },
    ],
    signals: [
      { label: 'Target kit cost', value: 'Under $40' },
      { label: 'Setup time, cold start', value: '< 15 min' },
      { label: 'Locally sourceable parts', value: 'Majority' },
    ],
    stack: ['Low-cost MCUs', 'Wokwi simulation', 'Browser-based tooling', 'Printed & digital curriculum'],
    outcomes: [
      'A lab a school can afford to run for more than one intake',
      'Instructors confident enough to teach it without us in the room',
      'Students who leave having built something that worked',
    ],
  },
  {
    id: 'S-05',
    slug: 'developer-tools',
    name: 'Developer Tools',
    blurb: 'The platform layer under local software.',
    detail:
      'The platform layer beneath local software: SDKs, libraries and services that let other teams build faster.',
    examples: ['SDKs & libraries', 'CLIs & automation', 'Open-source frameworks'],
    services: ['developer-tools', 'backend-systems', 'mentorship-training'],
    constraints: [
      {
        title: 'Adoption is the whole game',
        problem:
          'A technically excellent SDK with a confusing first hour gets abandoned before anyone reaches the good parts.',
        response:
          'We design the first fifteen minutes first: install, one working example, one obvious next step.',
      },
      {
        title: 'Bandwidth is expensive',
        problem:
          'A toolchain that pulls hundreds of megabytes on install is unusable on a metered connection.',
        response:
          'Small binaries, cached dependencies and offline-capable toolchains that respect what the download actually costs.',
      },
      {
        title: 'Breaking changes cost trust',
        problem:
          'Every unannounced API change quietly teaches your users to pin an old version and stop upgrading.',
        response:
          'Semantic versioning held to honestly, deprecation windows, and migration notes written before the release ships.',
      },
    ],
    signals: [
      { label: 'Time to first success', value: '< 15 min' },
      { label: 'Install size target', value: 'Lean' },
      { label: 'Breaking changes', value: 'Versioned & announced' },
    ],
    stack: ['Rust, Go & TypeScript tooling', 'CLI & SDK design', 'Docs-as-code', 'Package & release automation'],
    outcomes: [
      'Developers shipping on your platform without asking support first',
      'Documentation that answers the question before the ticket is filed',
      'A release process your team can run without ceremony',
    ],
  },
  {
    id: 'S-06',
    slug: 'embedded-systems',
    name: 'Embedded Systems',
    blurb: 'Industrial & agri sensing at the edge.',
    detail:
      'Rugged sensing and control at the edge. Industrial and agricultural systems that run unattended, on tight power budgets.',
    examples: ['Industrial control', 'Agri sensing', 'Edge data acquisition'],
    services: ['embedded-iot', 'firmware-audit', 'rnd-prototyping'],
    constraints: [
      {
        title: 'The environment is hostile',
        problem:
          'Dust, condensation, 40°C afternoons and the occasional lightning-induced surge are normal operating conditions.',
        response:
          'Sealed enclosures, wide-temperature parts, protected inputs, and thermal headroom designed in from the schematic.',
      },
      {
        title: 'Power is a budget, not a supply',
        problem:
          'A solar node in the rainy season may get three usable charging days in a fortnight.',
        response:
          'Duty-cycled firmware measured in microamps, with the radio treated as the most expensive thing on the board.',
      },
      {
        title: 'Control loops cannot stall',
        problem:
          'An irrigation valve or a motor controller that misses its deadline does physical damage, not a dropped frame.',
        response:
          'Deterministic timing, bounded worst-case paths, and safe fallback states the hardware enters on its own.',
      },
    ],
    signals: [
      { label: 'Sleep current', value: 'µA range' },
      { label: 'Operating temp', value: '-10 to 60°C' },
      { label: 'Autonomy, no sun', value: '10+ days' },
    ],
    stack: ['Rust & C firmware', 'Modbus / CAN / RS-485', 'Solar & battery management', 'Edge data acquisition'],
    outcomes: [
      'Nodes that make it through a full season without a site visit',
      'Data continuous enough to act on, not just to archive',
      'Control that fails into a safe state instead of an expensive one',
    ],
  },
]

export function getSectorBySlug(slug: string) {
  return sectors.find((s) => s.slug === slug)
}

/** Sector names, for the enquiry forms' sector select. */
export const sectorNames = sectors.map((s) => s.name)
