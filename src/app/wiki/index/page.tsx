import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPagesMeta } from '@/lib/pages'
import WikiLayout from '@/components/WikiLayout'

export const metadata: Metadata = { title: 'All Pages — Personal Wiki' }

export default function IndexPage() {
  const pages = getAllPagesMeta()

  const grouped = pages.reduce<Record<string, typeof pages>>((acc, page) => {
    const letter = page.title[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(page)
    return acc
  }, {})

  const letters = Object.keys(grouped).sort()

  return (
    <WikiLayout pages={pages}>
      <article className="wiki-article">
        <header className="wiki-article-header">
          <h1 className="wiki-article-title">All Pages</h1>
        </header>
        <div className="wiki-content">
          {letters.map((letter) => (
            <div key={letter}>
              <h2 id={letter}>{letter}</h2>
              <ul>
                {grouped[letter].map((page) => (
                  <li key={page.slug}>
                    <Link href={`/wiki/${page.slug}`}>{page.title}</Link>
                    {page.description && (
                      <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                        — {page.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>
    </WikiLayout>
  )
}
