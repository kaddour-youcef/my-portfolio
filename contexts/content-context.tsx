"use client"

import { createContext, useContext, type ReactNode, useMemo } from "react"
import { useLanguage } from "@/contexts/language-context"

import en from "@/data/portfolio-content.en.json"
import fr from "@/data/portfolio-content.fr.json"
import es from "@/data/portfolio-content.es.json"
import de from "@/data/portfolio-content.de.json"

type PortfolioContent = typeof en

type ContentContextType = {
  content: PortfolioContent
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: ReactNode }) {
  const { currentLanguage } = useLanguage()

  const map: Record<string, PortfolioContent> = {
    en,
    fr,
    es,
    de,
  }

  const content = useMemo(() => {
    return map[currentLanguage.code] ?? en
  }, [currentLanguage.code])

  return <ContentContext.Provider value={{ content }}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error("useContent must be used within a ContentProvider")
  return ctx
}

