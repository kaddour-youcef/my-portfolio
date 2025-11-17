"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/contexts/language-context"

const navItems = [
  { name: "nav.about", href: "#about" },
  { name: "nav.skills", href: "#skills" },
  { name: "nav.studies", href: "#studies" },
  { name: "nav.experience", href: "#experience" },
  { name: "nav.projects", href: "#projects" },
  { name: "nav.models", href: "#models" },
  { name: "nav.publications", href: "#publications" },
  { name: "nav.contact", href: "#contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16 min-w-0">
        {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-mono text-xl font-bold text-foreground">
              {"<"}AI_Engineer{" />"}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 min-w-0 justify-center">
            <div className="flex items-center space-x-4 overflow-hidden">

              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-mono transition-colors duration-200"
                >
                  {t(item.name)}
                </a>
              ))}
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center space-x-2 flex-shrink-0">
        

            <LanguageSelector />
            <ThemeToggle />

            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-muted-foreground hover:text-primary"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-b border-border">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-mono transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t(item.name)}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
