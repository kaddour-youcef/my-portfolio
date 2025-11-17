"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, ExternalLink, Star, GitFork, Download, Search, Filter, Lock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Modality, Purpose, Status } from "@/data/project-types"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  tags: string[]
  modality: Modality
  purpose: Purpose
  status: Status

  stats: {
    stars: number
    forks: number
    downloads?: number
  }
  links: {
    github: string
    demo?: string
    paper?: string
  }
  architecture?: string
  results?: string[]
  improvements?: string[]
  image?: string
  private?: boolean
}

const statusColors = {
  production: "bg-green-500",
  research: "bg-blue-500",
  development: "bg-yellow-500",
  prototype: "bg-orange-500",
  personal: "bg-gray-500",
}


const modalityColors = {
  NLP: "bg-purple-500",
  "Robotics & CV": "bg-orange-500",
  Multimodal: "bg-pink-500",
  "Time-series": "bg-cyan-500",
  RecSys: "bg-indigo-500",

  "AI Infrastructure": "bg-red-500",
  "GPU Computing": "bg-green-700",
  "Conversational AI": "bg-teal-500",
  Embedded: "bg-amber-600",
  Web: "bg-slate-500",
}


export function ProjectsSection({ data }: { data: Project[] }) {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModality, setSelectedModality] = useState<string>("all")
  const [selectedPurpose, setSelectedPurpose] = useState<string>("all")
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [modalProject, setModalProject] = useState<Project | null>(null)

  const modalities = ["all", ...Array.from(new Set(data.map((p) => p.modality)))]
  const purposes = ["all", ...Array.from(new Set(data.map((p) => p.purpose)))]

  const filteredProjects = data.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesModality = selectedModality === "all" || project.modality === selectedModality
    const matchesPurpose = selectedPurpose === "all" || project.purpose === selectedPurpose

    return matchesSearch && matchesModality && matchesPurpose
  })

  return (
    <section id="projects" className="py-20 border-t border-border">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-mono text-3xl font-bold text-foreground">{t("projects.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("projects.subtitle")}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={t("projects.search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-1 gap-3 items-center justify-end w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedModality} onValueChange={setSelectedModality}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("projects.filter.all_modalities")} />
                </SelectTrigger>
                <SelectContent>
                  {modalities.map((modality) => (
                    <SelectItem key={modality} value={modality}>
                      {modality === "all" ? t("projects.filter.all_modalities") : modality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={selectedPurpose} onValueChange={setSelectedPurpose}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("projects.filter.all_purposes")} />
              </SelectTrigger>
              <SelectContent>
                {purposes.map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>
                    {purpose === "all" ? t("projects.filter.all_purposes") : purpose}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-card border-border hover:border-primary/50 transition-all duration-200"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg text-foreground font-mono">{project.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs text-white ${modalityColors[project.modality]}`}>
                        {project.modality}
                      </Badge>
                      <Badge className={`text-xs text-white ${statusColors[project.status]}`}>{project.status}</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {project.stats.stars !== undefined && project.stats.stars !== null && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>{project.stats.stars}</span>
                    </div>
                  )}

                  {project.stats.forks !== undefined && project.stats.forks !== null && (
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      <span>{project.stats.forks}</span>
                    </div>
                  )}

                  {project.stats.downloads !== undefined && project.stats.downloads !== null && (
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{project.stats.downloads}</span>
                    </div>
                  )}
                </div>


                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.private ? (
                    <Button size="sm" variant="outline" disabled className="pointer-events-none">
                      <Lock className="mr-1 h-3 w-3" />
                      {t("projects.links.private")}
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1 h-3 w-3" />
                        {t("projects.links.code")}
                      </a>
                    </Button>
                  )}
                  {project.links.demo && (
                    <Button size="sm" asChild>
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        {t("projects.links.demo")}
                      </a>
                    </Button>
                  )}
                 <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        // Mobile → expand inline
                        setExpandedProject(expandedProject === project.id ? null : project.id)
                      } else {
                        // Desktop → open modal
                        setModalProject(project)
                      }
                    }}
                  >
                    {t("projects.readme.button")}
                  </Button>

                </div>

                {/* Expanded README */}
                {expandedProject === project.id && (
                <div className="mt-4 md:hidden p-4 bg-muted rounded-lg space-y-3 text-sm">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{t("projects.readme.overview")}</h4>
                      <p className="text-muted-foreground">{project.longDescription}</p>
                    </div>

                    {project.architecture && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{t("projects.readme.architecture")}</h4>
                        <p className="text-muted-foreground font-mono text-xs">{project.architecture}</p>
                      </div>
                    )}

                    {project.results && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{t("projects.readme.key_results")}</h4>
                        <ul className="space-y-1">
                          {project.results.map((result, i) => (
                            <li key={i} className="text-muted-foreground flex items-start">
                              <span className="w-1 h-1 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.improvements && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{t("projects.readme.future_improvements")}</h4>
                        <ul className="space-y-1">
                          {project.improvements.map((improvement, i) => (
                            <li key={i} className="text-muted-foreground flex items-start">
                              <span className="w-1 h-1 bg-secondary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {project?.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                              ))}   
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("projects.none")}</p>
          </div>
        )}
      </div>

        {/* Modeal for readme */}

      <Dialog open={!!modalProject} onOpenChange={() => setModalProject(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-mono">
              {modalProject?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-sm">
            <div>
              <h4 className="font-semibold">{t("projects.readme.overview")}</h4>
              <p className="text-muted-foreground">{modalProject?.longDescription}</p>
            </div>

            {modalProject?.architecture && (
              <div>
                <h4 className="font-semibold">{t("projects.readme.architecture")}</h4>
                <p className="text-muted-foreground font-mono text-xs">
                  {modalProject?.architecture}
                </p>
              </div>
            )}

            {modalProject?.results && (
              <div>
                <h4 className="font-semibold">{t("projects.readme.key_results")}</h4>
                <ul className="space-y-1">
                  {modalProject.results.map((r, i) => (
                    <li key={i} className="flex items-start text-muted-foreground">
                      <span className="w-1 h-1 bg-primary rounded-full mr-2 mt-2"></span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {modalProject?.improvements && (
              <div>
                <h4 className="font-semibold">{t("projects.readme.future_improvements")}</h4>
                <ul className="space-y-1">
                  {modalProject.improvements.map((im, i) => (
                    <li key={i} className="flex items-start text-muted-foreground">
                      <span className="w-1 h-1 bg-secondary rounded-full mr-2 mt-2"></span>
                      {im}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <DialogFooter>

           {/* Tech Stack */}
           <div className="flex flex-wrap gap-1">
              {modalProject?.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
                  
                  
            </div>
        </DialogFooter>
        </DialogContent>
        
      </Dialog>

    </section>
  )
}
