import { useHead } from '@unhead/vue'
import { SITE_URL } from '@/config/seo'
import { graph, organizationLd, websiteLd } from '@/utils/structuredData'

export { SITE_URL }

interface SeoMeta {
  title: string
  description?: string
  /** Absolute path for this page, e.g. '/services'. */
  canonical?: string
  /** Path to a share image under /public, e.g. '/og-image.png'. */
  image?: string
  /** Alt text for the share image — defaults to the page title. */
  imageAlt?: string
  /** og:type — 'website' (default) or 'article'. */
  type?: string
  /** Schema.org nodes for this page. Org + WebSite are always included. */
  jsonLd?: object[]
  /** Set true only for pages that must stay out of the index. */
  noindex?: boolean
  /** Article-only publishing metadata. */
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    tags?: string[]
  }
}

export function useSeoMeta({
  title,
  description,
  canonical,
  image,
  imageAlt,
  type = 'website',
  jsonLd = [],
  noindex = false,
  article,
}: SeoMeta) {
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL
  const ogImage = `${SITE_URL}${image ?? '/og-image.png'}`
  const fullTitle = /bitpulse/i.test(title) ? title : `${title} · BitPulse`
  const altText = imageAlt ?? `${title} | BitPulse`

  // Org + WebSite ride on every page so the entity is asserted site-wide; page
  // nodes are appended into the same @graph and can reference them by @id.
  const ld = graph([organizationLd(), websiteLd(), ...jsonLd])

  useHead({
    title: fullTitle,
    htmlAttrs: { lang: 'en' },
    meta: [
      ...(description ? [{ name: 'description', content: description }] : []),
      {
        name: 'robots',
        content: noindex
          ? 'noindex, nofollow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { property: 'og:title', content: fullTitle },
      ...(description ? [{ property: 'og:description', content: description }] : []),
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:alt', content: altText },
      { property: 'og:site_name', content: 'BitPulse' },
      ...(type === 'article' && article?.publishedTime
        ? [{ property: 'article:published_time', content: article.publishedTime }]
        : []),
      ...(type === 'article' && article?.modifiedTime
        ? [{ property: 'article:modified_time', content: article.modifiedTime }]
        : []),
      ...(type === 'article' && article?.author
        ? [{ property: 'article:author', content: article.author }]
        : []),
      ...(type === 'article' && article?.tags?.length
        ? article.tags.map((tag) => ({ property: 'article:tag', content: tag }))
        : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      ...(description ? [{ name: 'twitter:description', content: description }] : []),
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:image:alt', content: altText },
    ],
    link: [{ rel: 'canonical', href: url }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(ld) }],
  })
}
