'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import type { WikiPageMeta } from '@/types/wiki'

interface Props {
  pages: WikiPageMeta[]
  siteName?: string
}

export default function WikiNav({ pages, siteName = 'Junjie Ma' }: Props) {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <nav className="wiki-nav" aria-label="Site navigation">
      <div className="wiki-nav-wordmark">
        <Link href="/" className="wiki-nav-wordmark-link">
          <span className="wiki-nav-wordmark-name">{siteName}</span>
          <span className="wiki-nav-wordmark-sub">{t.wordmarkSub}</span>
        </Link>
      </div>

      <div className="wiki-nav-section">
        <h3 className="wiki-nav-section-title">{t.navNavigation}</h3>
        <ul className="wiki-nav-list">
          <li>
            <Link href="/" className={`wiki-nav-link${pathname === '/' ? ' active' : ''}`}>
              {t.navMainPage}
            </Link>
          </li>
          <li>
            <Link href="/wiki/index" className={`wiki-nav-link${pathname === '/wiki/index' ? ' active' : ''}`}>
              {t.navAllPages}
            </Link>
          </li>
        </ul>
      </div>

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
