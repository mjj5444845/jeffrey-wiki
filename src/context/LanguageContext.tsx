'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { i18n, type Lang, type I18n } from '@/lib/i18n'

interface LanguageContextType {
  lang: Lang
  toggle: () => void
  t: I18n
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggle: () => {},
  t: i18n.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('wiki-lang') as Lang | null
    if (saved === 'en' || saved === 'zh') setLang(saved)
  }, [])

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === 'en' ? 'zh' : 'en'
      localStorage.setItem('wiki-lang', next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, t: i18n[lang] as I18n }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
