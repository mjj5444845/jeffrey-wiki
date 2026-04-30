import type { Metadata } from 'next'
import { getAllPagesMeta } from '@/lib/pages'
import WikiLayout from '@/components/WikiLayout'
import MessageForm from '@/components/MessageForm'

export const metadata: Metadata = { title: 'Send a Message — JeffreyWiki' }

export default function MessagePage() {
  const pages = getAllPagesMeta()

  return (
    <WikiLayout pages={pages}>
      <div className="wiki-content-wrapper">
        {/* Mimic the tabs row styling without active tabs */}
        <div className="wiki-tabs-row">
          <ul className="wiki-page-tabs">
            <li className="wiki-page-tab"><a href="javascript:history.back()">← Back</a></li>
          </ul>
        </div>

        <article className="wiki-article">
          <header className="wiki-article-header">
            <h1 className="wiki-article-title">Send a Message</h1>
            <p className="wiki-article-description">
              Send a message to Junjie Ma at{' '}
              <a href="mailto:jma26@gmu.edu">jma26@gmu.edu</a>
            </p>
          </header>
          <div className="wiki-article-body">
            <MessageForm />
          </div>
        </article>
      </div>
    </WikiLayout>
  )
}
