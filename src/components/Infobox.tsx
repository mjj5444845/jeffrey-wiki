'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import type { InfoboxData } from '@/types/wiki'

// Calculate completed years from a YYYY-MM birth date string
function calcAge(isoDate: string): number {
  const [y, m] = isoDate.split('-').map(Number)
  const now = new Date()
  const age = now.getFullYear() - y
  return now.getMonth() + 1 < m ? age - 1 : age
}

// Render an infobox value string, supporting:
//   {age:YYYY-MM}        → replaced with "(age N)"
//   [display text](url)  → rendered as <a>
//   \n (newline)         → rendered as <br />
function renderValue(value: string): ReactNode {
  // Split on newlines first, process each line, then join with <br />
  const lines = value.split('\n').filter((l) => l.trim() !== '')
  const renderedLines = lines.map((line, li) => {
    // Match both token types in one pass
    const tokenRe = /\{age:(\d{4}-\d{2})\}|\[([^\]]+)\]\(([^)]+)\)/g
    const parts: ReactNode[] = []
    let cursor = 0
    let match: RegExpExecArray | null

    while ((match = tokenRe.exec(line)) !== null) {
      if (match.index > cursor) parts.push(line.slice(cursor, match.index))

      if (match[1]) {
        // {age:YYYY-MM}
        parts.push(
          <span key={match.index} className="infobox-age">
            (age {calcAge(match[1])})
          </span>
        )
      } else {
        // [text](url)
        parts.push(
          <a key={match.index} href={match[3]} className="infobox-link">
            {match[2]}
          </a>
        )
      }
      cursor = match.index + match[0].length
    }

    if (cursor < line.length) parts.push(line.slice(cursor))
    return <span key={li}>{parts}</span>
  })

  if (renderedLines.length === 1) return renderedLines[0]
  return (
    <>
      {renderedLines.map((node, i) => (
        <span key={i}>
          {node}
          {i < renderedLines.length - 1 && <br />}
        </span>
      ))}
    </>
  )
}

interface Props {
  data: InfoboxData
}

export default function Infobox({ data }: Props) {
  return (
    <table className="infobox">
      {data.title && (
        <caption className="infobox-caption">{data.title}</caption>
      )}
      {data.image && (
        <tbody>
          <tr>
            <td colSpan={2} className="infobox-image-cell">
              <Image
                src={data.image}
                alt={data.imageCaption || data.title || ''}
                width={220}
                height={220}
                className="infobox-image"
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              />
              {data.imageCaption && (
                <div className="infobox-image-caption">{data.imageCaption}</div>
              )}
            </td>
          </tr>
        </tbody>
      )}
      <tbody>
        {data.fields.map((field) => (
          <tr key={field.label}>
            <th className="infobox-label">{field.label}</th>
            <td className="infobox-data">{renderValue(field.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
