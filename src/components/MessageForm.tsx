'use client'

import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import siteConfig from '@/lib/siteConfig'

export default function MessageForm() {
  const { t } = useLanguage()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(title.trim() || 'Message from JeffreyWiki')
    const body = encodeURIComponent(text.trim())
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  return (
    <form className="wiki-message-form" onSubmit={handleSubmit}>
      <div className="wiki-form-row">
        <label className="wiki-form-label" htmlFor="msg-title">
          {t.msgTitleLabel}
        </label>
        <input
          id="msg-title"
          type="text"
          className="wiki-form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="wiki-form-row">
        <label className="wiki-form-label" htmlFor="msg-text">
          {t.msgTextLabel}
        </label>
        <textarea
          id="msg-text"
          className="wiki-form-textarea"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div className="wiki-form-actions">
        <button type="submit" className="wiki-form-btn">{t.msgSendBtn}</button>
        <span className="wiki-form-note">{t.msgNote}</span>
      </div>
    </form>
  )
}
