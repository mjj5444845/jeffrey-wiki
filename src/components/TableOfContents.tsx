'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import type { HeadingItem } from '@/types/wiki'

interface Props {
  headings: HeadingItem[]
}

export default function TableOfContents({ headings }: Props) {
  const [hidden, setHidden] = useState(false)
  const { t } = useLanguage()

  if (headings.length < 3) return null

  let h2Counter = 0
  let h3Counter = 0
  const numbered = headings.map((h) => {
    if (h.level === 2) { h2Counter++; h3Counter = 0; return { ...h, num: String(h2Counter) } }
    h3Counter++
    return { ...h, num: `${h2Counter}.${h3Counter}` }
  })

  return (
    <div className="wiki-toc" id="toc">
      <div className="wiki-toc-title">
        <span>{t.tocTitle}</span>
        <button className="wiki-toc-toggle" onClick={() => setHidden(!hidden)}>
          [{hidden ? t.tocShow : t.tocHide}]
        </button>
      </div>
      {!hidden && (
        <ul className="wiki-toc-list">
          {numbered.map((h) => (
            <li key={h.id} className={`wiki-toc-item wiki-toc-level-${h.level}`}>
              <a href={`#${h.id}`}>
                <span className="wiki-toc-num">{h.num}</span>
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
