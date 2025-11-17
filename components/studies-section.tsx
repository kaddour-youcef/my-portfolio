"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Study {
  institution: string
  degree: string
  specialization?: string
  dates: string
  gpa?: string
  coursework: string[]
}

interface Certification {
  name: string
  issuer: string
  date: string
  credentialUrl: string
}

interface StudiesData {
  studies: Study[]
  certifications: Certification[]
}

export function StudiesSection({ data }: { data: StudiesData }) {
  const { t } = useLanguage()
  return (
    <section id="studies" className="py-20 border-t border-border">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-mono text-3xl font-bold text-foreground">{t("studies.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("studies.subtitle")}</p>
        </div>

        {/* Education */}
        <div className="space-y-6">
          <h3 className="font-mono text-2xl font-semibold text-foreground flex items-center">
            <GraduationCap className="mr-3 h-6 w-6 text-primary" />
            {t("studies.education")}
          </h3>
          <div className="space-y-6">
            {data.studies.map((study, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-foreground">{study.degree}</CardTitle>
                      {study.specialization && <p className="text-primary font-medium">{study.specialization}</p>}
                      <p className="text-muted-foreground">{study.institution}</p>
                    </div>
                    <div className="flex items-center md:justify-end gap-2 md:flex-col md:items-end">
                      <Badge variant="outline" className="font-mono">
                        {study.dates}
                      </Badge>
                      {study.gpa && (
                        <p className="text-sm text-muted-foreground mt-1">{t("studies.gpa")}: {study.gpa}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">{t("studies.key_coursework")}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.coursework.map((course) => (
                        <Badge key={course} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-6">
          <h3 className="font-mono text-2xl font-semibold text-foreground flex items-center">
            <Award className="mr-3 h-6 w-6 text-secondary" />
            {t("studies.certifications")}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.certifications.map((cert, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">{cert.name}</CardTitle>
                  <p className="text-primary font-medium">{cert.issuer}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono text-xs">
                      {cert.date}
                    </Badge>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
