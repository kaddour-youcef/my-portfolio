"use client"

import { useLanguage } from "@/contexts/language-context"

export function BlogPlaceholder() {
  const { t } = useLanguage()
  return (
    <div>
      <h2 className="font-mono text-3xl font-bold text-foreground mb-8">{t("blog.title")}</h2>
      <p className="text-muted-foreground">{t("blog.coming_soon")}</p>
    </div>
  )
}

