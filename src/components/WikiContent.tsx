'use client'

import Infobox from './Infobox'
import TableOfContents from './TableOfContents'
import { useLanguage } from '@/context/LanguageContext'
import siteConfig from '@/lib/siteConfig'
import type { WikiPage } from '@/types/wiki'

interface Props {
  page: WikiPage
}

export default function WikiContent({ page }: Props) {
  const { t } = useLanguage()

  return (
    <div className="wiki-content-wrapper">

      <div className="wiki-tabs-row">
        <ul className="wiki-page-tabs">
          <li className="wiki-page-tab active"><span>{t.tabRead}</span></li>
          <li className="wiki-page-tab">
            <a href={siteConfig.messageUrl}>{t.tabMessage}</a>
          </li>
          <li className="wiki-page-tab">
            <a href={siteConfig.historyUrl} target="_blank" rel="noopener noreferrer">
              {t.tabHistory}
            </a>
          </li>
        </ul>
      </div>

      <article className="wiki-article">
        <header className="wiki-article-header">
          <h1 className="wiki-article-title">{page.title}</h1>
          {page.description && (
            <p className="wiki-article-description">{page.description}</p>
          )}
        </header>

        <div className="wiki-article-body">
          {page.infobox && <Infobox data={page.infobox} />}
          <TableOfContents headings={page.headings} />
          <div className="wiki-content" dangerouslySetInnerHTML={{ __html: page.content }} />
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
