'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import type { WikiPageMeta } from '@/types/wiki'

interface Props {
  pages: WikiPageMeta[]
}

export default function WikiNav({ pages }: Props) {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <nav className="wiki-nav" aria-label="Site navigation">
      {/* Navigation section */}
      <div className="wiki-nav-section wiki-nav-section-first">
        <h3 className="wiki-nav-section-title">{t.navNavigation}</h3>
        <ul className="wiki-nav-list">
          <li>
            <Link href="/" className={`wiki-nav-link${pathname === '/' ? ' active' : ''}`}>
              {t.navMainPage}
            </Link>
          </li>
        </ul>
      </div>

      {/* Pages section */}
      <div className="wiki-nav-section">
        <h3 className="wiki-nav-section-title">{t.navPages}</h3>
        <ul className="wiki-nav-list">
          {pages.map((page) => {
            const active = pathname === `/wiki/${page.slug}`
            return (
              <li key={page.slug}>
                <Link
                  href={`/wiki/${page.slug}`}
                  className={`wiki-nav-link${active ? ' active' : ''}`}
                  title={page.description}
                >
                  {page.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
