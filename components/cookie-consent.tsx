"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GoogleAnalytics } from "@next/third-parties/google"

import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

type ConsentPreferences = {
  analytics: boolean
  marketing: boolean
  updatedAt: number
}

const STORAGE_KEY = "cookie-consent:v1"
const defaultPreferences: ConsentPreferences = {
  analytics: true,
  marketing: false,
  updatedAt: 0,
}

export function CookieConsent({ gaId }: { gaId?: string }) {
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [hasDecision, setHasDecision] = useState(false)
  const [preferences, setPreferences] =
    useState<ConsentPreferences>(defaultPreferences)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentPreferences
        setPreferences({
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
          updatedAt: parsed.updatedAt ?? Date.now(),
        })
        setHasDecision(true)
      } else {
        setOpen(true)
      }
    } catch (error) {
      setOpen(true)
    } finally {
      setReady(true)
    }
  }, [])

  const persist = (next: ConsentPreferences) => {
    setPreferences(next)
    setHasDecision(true)
    setOpen(false)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const handleAcceptAll = () =>
    persist({ analytics: true, marketing: true, updatedAt: Date.now() })

  const handleDecline = () =>
    persist({ analytics: false, marketing: false, updatedAt: Date.now() })

  const handleSave = () =>
    persist({ ...preferences, updatedAt: Date.now() })

  const handleOpenChange = (nextOpen: boolean) => {
    if (!hasDecision && !nextOpen) {
      setOpen(true)
      return
    }
    setOpen(nextOpen)
  }

  const analyticsEnabled = ready && preferences.analytics && !!gaId

  if (!ready) return null

  return (
    <>
      {analyticsEnabled && <GoogleAnalytics gaId={gaId!} />}

      {ready && (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent
            showCloseButton={hasDecision}
            className="max-w-2xl border-primary/25 bg-gradient-to-br from-background via-muted/60 to-background/80 shadow-2xl"
          >
            <DialogHeader className="text-left space-y-3">
              <div className="inline-flex flex-wrap items-center gap-2 text-xs font-medium text-primary">
                <Badge
                  variant="outline"
                  className="border-primary/50 bg-primary/10 text-primary"
                >
                  Privacy-first
                </Badge>
                <span className="text-muted-foreground">
                  You decide what gets measured.
                </span>
              </div>
              <DialogTitle className="text-xl">Cookie preferences</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                Essential cookies keep this site running. Turn on analytics to
                allow Google Analytics tracking and help improve the experience.
                You can change your mind anytime.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <PreferenceToggle
                title="Essential"
                description="Required for core features like theme and language choices."
                locked
              />
              <PreferenceToggle
                title="Analytics"
                description="Measure visits and performance via Google Analytics."
                value={preferences.analytics}
                onChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
              />
      
            </div>

            <Separator />

            <div className="space-y-1 text-xs text-muted-foreground">
              <p>
                Preference data is stored locally in your browser. You can
                revisit this modal by clearing that storage or cookies.
              </p>
              <p>
                Read more in the{" "}
                <Link
                  href="/privacy"
                  className="text-primary underline underline-offset-4"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>

            <DialogFooter className="gap-2 sm:gap-3">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleDecline}
              >
                Essential only
              </Button>
              <Button
                className="w-full sm:w-auto"
                onClick={handleSave}
              >
                Save selection
              </Button>
              <Button 
                  variant="secondary"
                  className="w-full sm:w-auto" onClick={handleAcceptAll}>
                Accept all
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

type PreferenceToggleProps = {
  title: string
  description: string
  value?: boolean
  badge?: string
  locked?: boolean
  onChange?: (checked: boolean) => void
}

function PreferenceToggle({
  title,
  description,
  value,
  badge,
  locked,
  onChange,
}: PreferenceToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border bg-background/90 px-4 py-3 shadow-sm">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{title}</span>
          {badge ? (
            <Badge variant="secondary" className="text-[11px]">
              {badge}
            </Badge>
          ) : null}
          {locked ? (
            <Badge variant="outline" className="text-[11px]">
              Always on
            </Badge>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {locked ? (
        <span className="text-xs font-medium text-muted-foreground">
          Required
        </span>
      ) : (
        <Switch
          checked={!!value}
          onCheckedChange={(checked) => onChange?.(checked)}
          aria-label={`Toggle ${title} cookies`}
        />
      )}
    </div>
  )
}
