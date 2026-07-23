// Single source of truth for site-wide identity + contact details.

export const site = {
  name: 'BitPulse',
  legalName: 'BitPulse Engineering Ltd',
  tagline: 'Routing ideas from bare metal to working systems.',
  description:
    'BitPulse is a product & R&D studio for embedded hardware, firmware and systems software — designed, built and sustained end to end, for teams building across Africa and beyond.',
  blurb:
    'Routing ideas from bare metal to working systems — engineering the infrastructure of African innovation.',
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
    { value: 'Rust · C', label: 'Bare-metal core' },
  ],
} as const

export const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/innovations', label: 'Sectors' },
  { to: '/blogs', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contacts', label: 'Contact' },
]

export const footerNav = [
  {
    heading: 'Build',
    links: [
      { to: '/services', label: 'Embedded & IoT' },
      { to: '/services', label: 'Backend & Systems' },
      { to: '/services', label: 'R&D & Prototyping' },
      { to: '/services', label: 'Firmware Audit' },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { to: '/about', label: 'About' },
      { to: '/innovations', label: 'Sectors' },
      { to: '/services', label: 'Programs' },
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
