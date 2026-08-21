// Field services — the hands-on installation side of the business.
//
// This backs a single standalone landing page at /field. It is deliberately
// separate from `services.ts`: that data describes the R&D studio's tracks and
// speaks to engineering buyers. This speaks to a head teacher or a landlord who
// has already met Aine on site and is checking the business is real before
// calling. Different audience, different vocabulary, no shared vocabulary.
//
// Nothing here may be aspirational. The page's whole job is verification, and
// an invented client or statistic is exactly what would break it.

export const fieldContact = {
  /** Display forms are local; hrefs are E.164 because that is what dialers want. */
  primary: { display: '0777 532 858', href: 'tel:+256777532858' },
  secondary: { display: '0706 337 924', href: 'tel:+256706337924' },
  /** Named human. The page speaks as BitPulse but a person answers. */
  person: 'Aine',
  location: 'Kampala, Uganda',
} as const

// WhatsApp is the primary channel in this market, so the link is prefilled: an
// opened thread with the first line already typed converts far better than a
// blank compose screen. The trailing space is intentional, the sender finishes
// the sentence.
const WHATSAPP_PREFILL = "Hi, I saw bitpulse.dev/field. I'd like a quote for "
export const whatsappHref = `https://wa.me/256777532858?text=${encodeURIComponent(WHATSAPP_PREFILL)}`

export interface FieldInstall {
  id: string
  name: string
  body: string
  icon: 'wifi' | 'camera' | 'ticket' | 'training'
}

export const fieldInstalls: FieldInstall[] = [
  {
    id: 'wifi',
    name: 'Campus & office WiFi',
    body: 'Full coverage across a compound, one login for everyone. Access controlled centrally so only your people get on the network.',
    icon: 'wifi',
  },
  {
    id: 'cctv',
    name: 'CCTV systems',
    body: 'Supply and installation, indoor and outdoor, with remote viewing on your phone.',
    icon: 'camera',
  },
  {
    id: 'hotspot',
    name: 'Hotspot business setup',
    body: "Turn your building's internet into income. Voucher codes, time or data bundles, and a billing page in your own name.",
    icon: 'ticket',
  },
  {
    id: 'training',
    name: 'Training',
    body: 'Software and embedded systems training for staff, students and teams.',
    icon: 'training',
  },
]

export const fieldAudiences = [
  'Schools',
  'Hostels & rentals',
  'Offices & SACCOs',
  'Bars, lodges & arcades',
  'Shops',
]

export const fieldSteps = [
  {
    name: 'Site visit',
    body: 'We walk the premises, check the building and your current internet, and tell you what it will actually take.',
  },
  {
    name: 'Written quote',
    body: "Equipment and labour listed separately, so you can see what you're paying for.",
  },
  {
    name: 'Install and hand over',
    body: 'We set it up, show your people how to use it, and label every device with our number for support.',
  },
]

/** Plain, checkable statements. No claims we cannot stand behind on site. */
export const fieldFacts = [
  'Every device we install is labelled with our number. You call the person who did the work.',
  'Equipment and labour quoted separately. You keep the receipts.',
  'Based in Kampala. We come back when something needs fixing.',
]

export interface FieldPhoto {
  /** File to drop into public/field/. Keep the name, keep the aspect. */
  src: string
  /** Factual caption. Describe what is in the frame, do not sell. */
  caption: string
  /**
   * Flip to true once the real photo is in public/field/. While false the page
   * renders an on-brand placeholder instead of requesting a missing file, so
   * there is never a broken image and never a 404 on a metered connection.
   */
  ready: boolean
}

// ---------------------------------------------------------------------------
// PHOTOS — the trust section. Drop real installation photos into public/field/
// using exactly these filenames, then set `ready: true` on each one.
//
//   - 4:3 landscape, 800x600 or larger, exported as WebP
//   - Real jobs only. No stock photography, no renders.
//   - Faces: get permission, or frame the work rather than the people.
//   - Rewrite the caption to match what the photo actually shows.
//
// The grid is designed for 4 to 6. Entries left `ready: false` still render as
// labelled placeholders, so a partial set looks intentional rather than broken.
// ---------------------------------------------------------------------------
export const fieldPhotos: FieldPhoto[] = [
  { src: '/field/work-01.webp', caption: 'Access point mounted in a school corridor', ready: false },
  { src: '/field/work-02.webp', caption: 'Outdoor camera on a compound wall', ready: false },
  { src: '/field/work-03.webp', caption: 'Router and switch in a labelled cabinet', ready: false },
  { src: '/field/work-04.webp', caption: 'Cable run dressed along a ceiling', ready: false },
  { src: '/field/work-05.webp', caption: 'Hotspot voucher page on a phone', ready: false },
  { src: '/field/work-06.webp', caption: 'Handover and walkthrough with staff', ready: false },
]
