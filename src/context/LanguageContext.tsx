'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { i18n, type I18n } from '@/lib/i18n'

interface LanguageContextType {
  t: I18n
}

const LanguageContext = createContext<LanguageContextType>({ t: i18n.en })

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider value={{ t: i18n.en }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
