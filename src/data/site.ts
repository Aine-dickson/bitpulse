// Single source of truth for site-wide identity + contact details.

export const site = {
  name: 'BitPulse',
  legalName: 'BitPulse Engineering Ltd',
  tagline: 'Routing ideas from bare metal to working systems.',
  description:
    'BitPulse is a product & R&D studio for embedded hardware, firmware and systems software, designed, built and sustained end to end, for teams building across Africa and beyond.',
  blurb:
    'Routing ideas from bare metal to working systems, engineering the infrastructure of African innovation.',
  email: 'contact@bitpulse.dev',
  location: 'Kampala, Uganda',
  timezone: 'UTC+3',
  phone: '+256 706 337924',
  get phoneHref() {
    return `tel:${this.phone.replace(/\s+/g, '')}`
  },
  whatsapp: '256777532858',
  get whatsappHref() {
    return `https://wa.me/${this.whatsapp}`
  },
  stats: [
    { value: '12+', label: 'Systems shipped' },
    { value: '6', label: 'Sectors served' },
    { value: 'Metal → UI', label: 'Full-stack depth' },
  ],
} as const

export const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/innovations', label: 'Sectors' },
  { to: '/lab', label: 'Lab' },
  { to: '/blogs', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contacts', label: 'Contact' },
]

export const footerNav = [
  {
    heading: 'Build',
    // Deep-link to the actual service pages: four links all pointing at
    // /services wasted the internal link equity and gave crawlers no path to
    // the detail pages except the services index.
    links: [
      { to: '/services/embedded-iot', label: 'Embedded & IoT' },
      { to: '/services/backend-systems', label: 'Backend & Systems' },
      { to: '/services/apps-interfaces', label: 'Apps & Interfaces' },
      { to: '/services/legacy-modernization', label: 'Legacy Modernization' },
      { to: '/services/rnd-prototyping', label: 'R&D & Prototyping' },
      { to: '/services/firmware-audit', label: 'Firmware Audit' },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { to: '/about', label: 'About' },
      { to: '/innovations', label: 'Sectors' },
      { to: '/lab', label: 'The Lab' },
      { to: '/blogs', label: 'Blog' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { to: '/contacts', label: 'contact@bitpulse.dev' },
      { to: '/careers', label: 'Careers' },
      { to: '/partner', label: 'Partnerships' },
    ],
  },
]
