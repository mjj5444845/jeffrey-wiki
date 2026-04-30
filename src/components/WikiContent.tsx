'use client'

import Infobox from './Infobox'
import TableOfContents from './TableOfContents'
import { useLanguage } from '@/context/LanguageContext'
import type { WikiPage } from '@/types/wiki'

interface Props {
  page: WikiPage
}

export default function WikiContent({ page }: Props) {
  const { lang, toggle, t } = useLanguage()

  const showZh = lang === 'zh' && !!page.zh
  const title       = showZh ? page.zh!.title       : page.title
  const description = showZh ? page.zh!.description : page.description
  const infobox     = showZh ? (page.zh!.infobox ?? page.infobox) : page.infobox
  const headings    = showZh ? page.zh!.headings    : page.headings
  const content     = showZh ? page.zh!.content     : page.content

  return (
    <div className="wiki-content-wrapper">

      {/* ── Tabs row: language toggle (left) + article tabs (right) ── */}
      <div className="wiki-tabs-row">
        {/* Language toggle — Wikipedia-style globe button */}
        {page.zh && (
          <button className="wiki-lang-toggle" onClick={toggle} title="Switch language / 切换语言">
            <span className="wiki-lang-toggle-icon">🌐</span>
            <span className="wiki-lang-toggle-label">{t.langSwitchLabel}</span>
          </button>
        )}

        {/* Article action tabs */}
        <ul className="wiki-page-tabs">
          <li className="wiki-page-tab active"><span>{t.tabRead}</span></li>
          <li className="wiki-page-tab"><a href="#">{t.tabEdit}</a></li>
          <li className="wiki-page-tab"><a href="#">{t.tabHistory}</a></li>
        </ul>
      </div>

      <article className="wiki-article">
        <header className="wiki-article-header">
          <p className="wiki-from-tagline">{t.fromTagline}</p>
          <h1 className="wiki-article-title">{title}</h1>
          {description && (
            <p className="wiki-article-description">{description}</p>
          )}
        </header>

        <div className="wiki-article-body">
          {infobox && <Infobox data={infobox} />}
          <TableOfContents headings={headings} />
          <div className="wiki-content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <footer className="wiki-article-footer">
          {page.tags && page.tags.length > 0 && (
            <div className="wiki-categories">
              <span className="wiki-categories-label">{t.categories}</span>
              {page.tags.map((tag) => (
                <span key={tag} className="wiki-category-tag">{tag}</span>
              ))}
            </div>
          )}
          {page.lastModified && (
            <div className="wiki-last-modified">
              {t.lastModified} {page.lastModified}
            </div>
          )}
        </footer>
      </article>
    </div>
  )
}
