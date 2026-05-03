import type { Metadata } from 'next'
import { getAllPagesMeta } from '@/lib/pages'
import WikiLayout from '@/components/WikiLayout'

export const metadata: Metadata = { title: 'Contact — JeffreyWiki' }

export default function ContactPage() {
  const pages = getAllPagesMeta()

  return (
    <WikiLayout pages={pages}>
      <div className="wiki-content-wrapper">
        <div className="wiki-tabs-row">
          <ul className="wiki-page-tabs">
            <li className="wiki-page-tab"><a href="javascript:history.back()">← Back</a></li>
          </ul>
        </div>

        <article className="wiki-article">
          <header className="wiki-article-header">
            <h1 className="wiki-article-title">Contact</h1>
          </header>
          <div className="wiki-article-body">
            <div className="wiki-content">
              <p>
                If you have any questions or are interested in collaboration opportunities,
                feel free to reach out through either of the following channels:
              </p>
              <table>
                <tbody>
                  <tr>
                    <th>Email</th>
                    <td><a href="mailto:jma26@gmu.edu">jma26@gmu.edu</a></td>
                  </tr>
                  <tr>
                    <th>LinkedIn</th>
                    <td><a href="https://www.linkedin.com/in/mjj11788178/" target="_blank" rel="noopener noreferrer">linkedin.com/in/mjj11788178</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </div>
    </WikiLayout>
  )
}
