"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Calendar, Users, Quote } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  date: string
  type: "paper" | "blog" | "talk" | "podcast"
  summary: string
  tags: string[]
  links: {
    paper?: string
    blog?: string
    slides?: string
    video?: string
    code?: string
  }
  citations?: number
  featured?: boolean
}

const typeColors = {
  paper: "bg-blue-500",
  blog: "bg-green-500",
  talk: "bg-purple-500",
  podcast: "bg-orange-500",
}

const typeIcons = {
  paper: FileText,
  blog: Quote,
  talk: Users,
  podcast: Users,
}

export function PublicationsSection({ data }: { data: Publication[] }) {
  const { t } = useLanguage()
  const featuredPubs = data.filter((pub) => pub.featured)
  const otherPubs = data.filter((pub) => !pub.featured)

  return (
    <section id="publications" className="py-20 border-t border-border">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-mono text-3xl font-bold text-foreground">{t("publications.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("publications.subtitle")}</p>
        </div>

        {/* Featured Publications */}
        {featuredPubs.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-mono text-2xl font-semibold text-foreground">{t("publications.featured")}</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {featuredPubs.map((pub) => {
                const Icon = typeIcons[pub.type]
                return (
                  <Card key={pub.id} className="bg-card border-border border-2 border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <Badge className={`text-xs text-white ${typeColors[pub.type]}`}>{t(`publications.type.${pub.type}`)}</Badge>
                            {pub.citations && (
                              <Badge variant="outline" className="text-xs">
                                {pub.citations} {t("publications.citations")}
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg text-foreground leading-tight">{pub.title}</CardTitle>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="h-3 w-3" />
                              <span>{pub.authors.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {pub.venue} • {pub.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{pub.summary}</p>

                      <div className="flex flex-wrap gap-1">
                        {pub.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {pub.links.paper && (
                          <Button size="sm" asChild>
                            <a href={pub.links.paper} target="_blank" rel="noopener noreferrer">
                              <FileText className="mr-1 h-3 w-3" />
                              {t("publications.links.paper")}
                            </a>
                          </Button>
                        )}
                        {pub.links.blog && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={pub.links.blog} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              {t("publications.links.blog")}
                            </a>
                          </Button>
                        )}
                        {pub.links.slides && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={pub.links.slides} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              {t("publications.links.slides")}
                            </a>
                          </Button>
                        )}
                        {pub.links.video && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={pub.links.video} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              {t("publications.links.video")}
                            </a>
                          </Button>
                        )}
                        {pub.links.code && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={pub.links.code} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              {t("publications.links.code")}
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Other Publications */}
        {otherPubs.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-mono text-2xl font-semibold text-foreground">{t("publications.all")}</h3>
            <div className="space-y-4">
              {otherPubs.map((pub) => {
                const Icon = typeIcons[pub.type]
                return (
                  <Card key={pub.id} className="bg-card border-border">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <Badge className={`text-xs text-white ${typeColors[pub.type]}`}>{t(`publications.type.${pub.type}`)}</Badge>
                            {pub.citations && (
                              <Badge variant="outline" className="text-xs">
                                {pub.citations} {t("publications.citations")}
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-semibold text-foreground">{pub.title}</h4>
                          <div className="text-sm text-muted-foreground">
                            <span>{pub.authors.join(", ")}</span> • <span>{pub.venue}</span> • <span>{pub.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{pub.summary}</p>
                          <div className="flex flex-wrap gap-1">
                            {pub.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {pub.links.paper && (
                            <Button size="sm" asChild>
                              <a href={pub.links.paper} target="_blank" rel="noopener noreferrer">
                                <FileText className="mr-1 h-3 w-3" />
                                {t("publications.links.paper")}
                              </a>
                            </Button>
                          )}
                          {pub.links.blog && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={pub.links.blog} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                {t("publications.links.blog")}
                              </a>
                            </Button>
                          )}
                          {pub.links.video && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={pub.links.video} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                {t("publications.links.video")}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
