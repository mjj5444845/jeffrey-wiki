'use client'

import WikiNav from './WikiNav'
import { useLanguage } from '@/context/LanguageContext'
import siteConfig from '@/lib/siteConfig'
import type { WikiPageMeta } from '@/types/wiki'

interface Props {
  children: React.ReactNode
  pages: WikiPageMeta[]
}

export default function WikiLayout({ children, pages }: Props) {
  const { t } = useLanguage()

  return (
    <div className="wiki-layout">
      <header className="wiki-header">
        <div className="wiki-header-inner">
          <a href="/" className="wiki-header-site-name">{siteConfig.name}</a>
          <form className="wiki-search-form" action="/search" method="get">
            <input
              type="search"
              name="q"
              placeholder={t.searchPlaceholder}
              className="wiki-search-input"
            />
            <button type="submit" className="wiki-search-btn">{t.search}</button>
          </form>
        </div>
      </header>

      <div className="wiki-body">
        <aside className="wiki-sidebar">
          <WikiNav pages={pages} />
        </aside>
        <main className="wiki-main">{children}</main>
      </div>

      <footer className="wiki-footer">
        <ul className="wiki-footer-links">
          <li><a href="/wiki/home">{t.footerAbout}</a></li>
          <li><a href="/wiki/index">{t.footerAllPages}</a></li>
        </ul>
        <p className="wiki-footer-text">
          Junjie Ma · George Mason University · Inspired by{' '}
          <a href="https://karpathy.ai/" target="_blank" rel="noopener noreferrer">Andrej Karpathy</a>
          {' '}and his{' '}
          <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" target="_blank" rel="noopener noreferrer">Post</a>
        </p>
      </footer>
    </div>
  )
}
