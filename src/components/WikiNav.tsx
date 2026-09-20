'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import siteConfig from '@/lib/siteConfig'
import type { WikiPageMeta } from '@/types/wiki'

interface Props {
  pages: WikiPageMeta[]
}

export default function WikiNav({ pages }: Props) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const navigationPages = siteConfig.navigationSlugs
    .map((slug) => pages.find((page) => page.slug === slug))
    .filter((page): page is WikiPageMeta => page !== undefined)
  const itemPages = pages.filter((page) => !siteConfig.navigationSlugs.includes(page.slug))

  function renderPageLink(page: WikiPageMeta) {
    const active = pathname === `/wiki/${page.slug}` || (page.slug === 'home' && pathname === '/')
    return (
      <li key={page.slug}>
        <Link
          href={`/wiki/${page.slug}`}
          className={`wiki-nav-link${active ? ' active' : ''}`}
          aria-current={active ? 'page' : undefined}
          title={page.description}
        >
          {page.slug === 'home' ? t.navMainPage : page.title}
        </Link>
      </li>
    )
  }

  return (
    <nav className="wiki-nav" aria-label="Site navigation">
      {/* Navigation section */}
      <div className="wiki-nav-section wiki-nav-section-first">
        <h3 className="wiki-nav-section-title">{t.navNavigation}</h3>
        <ul className="wiki-nav-list">
          {navigationPages.map(renderPageLink)}
        </ul>
      </div>

      {/* Pages section */}
      <div className="wiki-nav-section">
        <h3 className="wiki-nav-section-title">{t.navPages}</h3>
        <ul className="wiki-nav-list">
          {itemPages.map(renderPageLink)}
        </ul>
      </div>
    </nav>
  )
}
