// JSON-LD builders. Schema.org markup is how Google resolves *entity* identity
// ("BitPulse the engineering studio" vs. the crypto product of the same name)
// and how pages become eligible for rich results. Every builder returns a plain
// object; `useSeoMeta({ jsonLd: [...] })` serialises it into the static HTML.

import { SITE_URL } from '@/config/seo'
import { site } from '@/data/site'

/** Stable @id for the org node, so other nodes can reference it. */
export const ORG_ID = `${SITE_URL}/#organization`
export const SITE_ID = `${SITE_URL}/#website`

const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}/${path.replace(/^\//, '')}`)

/**
 * Sameas profiles disambiguate the brand. Add every owned profile you control —
 * this is the single strongest signal against the name collision.
 */
export const sameAs: string[] = [
  // TODO(owner): fill in the real, live profile URLs. Wrong/dead URLs hurt.
  // 'https://github.com/bitpulse-dev',
  // 'https://www.linkedin.com/company/bitpulse-dev',
  // 'https://x.com/bitpulsedev',
]

export function organizationLd() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: SITE_URL,
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phone,
    logo: {
      '@type': 'ImageObject',
      url: abs('/android-chrome-512x512.png'),
      width: 512,
      height: 512,
    },
    image: abs('/og-image.png'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kampala',
      addressCountry: 'UG',
    },
    areaServed: [
      { '@type': 'Country', name: 'Uganda' },
      { '@type': 'Place', name: 'East Africa' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    knowsAbout: [
      'Embedded systems',
      'Firmware development',
      'Internet of Things',
      'Systems software',
      'Web application development',
      'Mobile application development',
      'Legacy system modernization',
      'Software maintenance',
      'Hardware prototyping',
      'Developer tools',
      'Rust programming language',
      'C programming language',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        telephone: site.phone,
        areaServed: 'UG',
        availableLanguage: ['en'],
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: site.name,
    description: site.description,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  }
}

/** Breadcrumbs render as the path row under a result and clarify hierarchy. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  }
}

export function serviceLd(input: {
  name: string
  description: string
  path: string
  serviceType?: string
  deliverables?: string[]
}) {
  return {
    '@type': 'Service',
    '@id': `${abs(input.path)}#service`,
    name: input.name,
    description: input.description,
    url: abs(input.path),
    serviceType: input.serviceType ?? input.name,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'Uganda' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    ...(input.deliverables?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${input.name} deliverables`,
            itemListElement: input.deliverables.map((d) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: d },
            })),
          },
        }
      : {}),
  }
}

export function articleLd(input: {
  title: string
  description: string
  path: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
  tags?: string[]
}) {
  return {
    '@type': 'BlogPosting',
    '@id': `${abs(input.path)}#article`,
    headline: input.title,
    description: input.description,
    url: abs(input.path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(input.path) },
    image: [abs(input.image ?? '/og-image.png')],
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    dateModified: input.dateModified ?? input.datePublished,
    author: { '@type': 'Person', name: input.author ?? 'BitPulse' },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
    ...(input.tags?.length ? { keywords: input.tags.join(', ') } : {}),
  }
}

/** An ItemList makes hub pages (services, sectors, blog index) machine-legible. */
export function itemListLd(input: { name: string; items: { name: string; path: string }[] }) {
  return {
    '@type': 'ItemList',
    name: input.name,
    itemListElement: input.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: abs(item.path),
    })),
  }
}

/** FAQPage — the cheapest route to extra SERP real estate on service pages. */
export function faqLd(qa: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: qa.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/** Wraps nodes into one @graph — preferred over many sibling <script> tags. */
export function graph(nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
