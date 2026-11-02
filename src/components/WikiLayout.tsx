import Link from 'next/link'
import WikiNav from './WikiNav'
import { ui as t } from '@/lib/ui'
import siteConfig from '@/lib/siteConfig'
import type { WikiPageMeta } from '@/types/wiki'

interface Props {
  children: React.ReactNode
  pages: WikiPageMeta[]
}

export default function WikiLayout({ children, pages }: Props) {
  return (
    <div className="wiki-layout">
      <header className="wiki-header">
        <div className="wiki-header-inner">
          <Link href="/" className="wiki-header-site-name">{siteConfig.name}</Link>
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
          <li><Link href="/wiki/home">{t.footerAbout}</Link></li>
          <li><Link href="/wiki/index">{t.footerAllPages}</Link></li>
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
