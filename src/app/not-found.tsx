import Link from 'next/link'
import { getAllPagesMeta } from '@/lib/pages'
import WikiLayout from '@/components/WikiLayout'

export default function NotFound() {
  const pages = getAllPagesMeta()
  return (
    <WikiLayout pages={pages}>
      <article className="wiki-article">
        <header className="wiki-article-header">
          <h1 className="wiki-article-title">Page Not Found</h1>
        </header>
        <div className="wiki-content">
          <p>This page does not exist yet.</p>
          <p>
            You can <Link href="/wiki/index">browse all pages</Link> or{' '}
            <Link href="/">return to the main page</Link>.
          </p>
        </div>
      </article>
    </WikiLayout>
  )
}
