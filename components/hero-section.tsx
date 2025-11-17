"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Download, Star, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

interface PersonalData {
  name: string
  title: string
  bio: string
  location: string
  email: string
  links: {
    github?: string
    linkedin?: string
    huggingface?: string
    kaggle?: string
    scholar?: string
    resume?: string
  }
  stats: {
    githubFollowers: number
    githubStars: number
  }
}

export function HeroSection({ data }: { data: PersonalData }) {
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    const lines = [
      "$ whoami",
      `${data.name.toLowerCase().replace(/\s+/g, "")}@ai-engineer`,
      "",
      "$ pip list | grep -E '(torch|tensorflow|transformers)'",
      "torch                    2.1.0",
      "transformers             4.35.2",
      "tensorflow               2.14.0",
      "",
      "$ nvidia-smi --query-gpu=name --format=csv,noheader",
      "NVIDIA A100-SXM4-80GB",
      "",
      "$ echo $STATUS",
      t("hero.terminal.ready"),
    ]

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < lines.length) {
        setTerminalLines((prev) => [...prev, lines[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [data.name])

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Main content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="font-mono text-sm">
              {t("contact.availability")}
            </Badge>
            <h1 className="font-mono text-4xl md:text-6xl font-bold text-foreground leading-tight">{data.name}</h1>
            <h2 className="text-2xl md:text-3xl text-primary font-semibold">{data.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">{data.bio}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="font-mono" asChild>
              <a href={data.links.resume} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                {t("hero.cta.resume")}
              </a>
            </Button>
            <Button variant="outline" size="lg" className="font-mono bg-transparent" asChild>
              <a href={`mailto:${data.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                {t("hero.cta.contact")}
              </a>
            </Button>
          </div>

          {/* Social Links + GitHub Stats */}
          <div className="flex justify-between items-center w-full md:w-3/4">
            
            {/* Left: Social Links */}
            <div className="flex items-center space-x-6">
              {data.links.github && (
                <a
                  href={data.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}

              {data.links.linkedin && (
                <a
                  href={data.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}

              {data.links.huggingface && (
                <a
                  href={data.links.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Image src={"hf-logo-pirate.svg"} alt={"hugging_face_logo"} width={32} height={32}/>
                </a>
              )}

              {data.links.kaggle && (
                <a
                  href={data.links.kaggle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336" />
                  </svg>
                </a>
              )}

              {data.links.scholar && (
                <a
                  href={data.links.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M5.242 13.769L0.5 9.5 12 1l11.5 8.5-4.742 4.269C17.548 12.179 14.978 11.5 12 11.5s-5.548.679-6.758 2.269z" />
                    <path d="M12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Right: GitHub Stats */}
            {(data.stats.githubFollowers || data.stats.githubStars) && (
              <div className="flex items-center space-x-4 pl-6 border-l border-border">
                {data.stats.githubFollowers && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{data.stats.githubFollowers}</span>
                  </div>
                )}

                {data.stats.githubStars && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span>{data.stats.githubStars}</span>
                  </div>
                )}
              </div>
            )}

          </div>


        </div>

        {/* Right side - Terminal widget */}
        <div className="lg:pl-8">
          <Card className="bg-card border-border">
            <div className="bg-muted px-4 py-2 border-b border-border rounded-t-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm font-mono text-muted-foreground">{t("hero.terminal")}</span>
              </div>
            </div>
            <div className="p-6 font-mono text-sm bg-card min-h-[400px]">
              {terminalLines.map((line, index) => (
                <div key={index} className="mb-1">
                  {line && typeof line === "string" ? (
                    line.startsWith("$") ? (
                      <span className="text-primary">{line}</span>
                    ) : line.includes("✨") ? (
                      <span className="text-secondary">{line}</span>
                    ) : line.includes("@") ? (
                      <span className="text-accent">{line}</span>
                    ) : (
                      <span className="text-muted-foreground">{line}</span>
                    )
                  ) : (
                    <span className="text-muted-foreground">{line || ""}</span>
                  )}
                </div>
              ))}
              <div className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
