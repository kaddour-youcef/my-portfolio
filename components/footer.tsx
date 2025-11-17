"use client"

import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-border bg-card/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">{t("footer.built")}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("footer.last_updated")}: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">
              {t("nav.about")}
            </a>
            <a href="#projects" className="hover:text-primary transition-colors">
              {t("nav.projects")}
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              {t("nav.contact")}
            </a>
            <a href="/privacy" className="hover:text-primary transition-colors">
              {t("footer.privacy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
