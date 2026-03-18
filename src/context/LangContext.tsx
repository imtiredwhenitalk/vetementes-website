import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Lang } from '../data/translations'

type Translations = typeof translations[Lang]

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) || 'uk'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
    document.documentElement.lang = l
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t: Translations = translations[lang]

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
