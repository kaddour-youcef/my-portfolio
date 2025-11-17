"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, MapPin, Calendar, Filter, Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { MultiSelect } from "@/components/multi-select"

interface Experience {
  company: string
  role: string
  dates: string
  location: string
  type: "full-time" | "contract" | "internship"
  description: string[]
  technologies: string[]
  domain: string
  client: string
}

export function ExperienceSection({ data }: { data: Experience[] }) {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [domainFilter, setDomainFilter] = useState("all")
  const [clientFilter, setClientFilter] = useState("all")
  const [visibleCount, setVisibleCount] = useState(3)

  const skillOptions = useMemo(() => {
    const set = new Set<string>()
    data.forEach((exp) => exp.technologies.forEach((tech) => set.add(tech)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [data])
  const skillFilterOptions = useMemo(
    () => skillOptions.map((skill) => ({ value: skill, label: skill })),
    [skillOptions],
  )

  const domainOptions = useMemo(() => {
    const set = new Set<string>()
    data.forEach((exp) => {
      if (exp.domain) {
        set.add(exp.domain)
      }
    })
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [data])

  const clientOptions = useMemo(() => {
    const set = new Set<string>()
    data.forEach((exp) => {
      const value = exp.client || exp.company
      set.add(value)
    })
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [data])

  useEffect(() => {
    setSelectedSkills((prev) => prev.filter((skill) => skillOptions.includes(skill)))
  }, [skillOptions])

  const filteredExperiences = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    return data.filter((exp) => {
      const matchesSkill =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => exp.technologies.includes(skill))

      const matchesDomain = domainFilter === "all" || exp.domain === domainFilter
      const matchesClient = clientFilter === "all" || (exp.client || exp.company) === clientFilter
      const matchesSearch =
        normalizedSearch.length === 0 ||
        exp.role.toLowerCase().includes(normalizedSearch) ||
        exp.company.toLowerCase().includes(normalizedSearch) ||
        (exp.domain && exp.domain.toLowerCase().includes(normalizedSearch)) ||
        (exp.client && exp.client.toLowerCase().includes(normalizedSearch)) ||
        exp.description.some((item) => item.toLowerCase().includes(normalizedSearch)) ||
        exp.technologies.some((tech) => tech.toLowerCase().includes(normalizedSearch))
      return matchesSkill && matchesDomain && matchesClient && matchesSearch
    })
  }, [clientFilter, data, domainFilter, searchTerm, selectedSkills])

  const visibleExperiences = useMemo(
    () => filteredExperiences.slice(0, visibleCount),
    [filteredExperiences, visibleCount],
  )

  useEffect(() => {
    setVisibleCount(3)
  }, [clientFilter, data, domainFilter, searchTerm, selectedSkills])

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredExperiences.length))
  }

  return (
    <section id="experience" className="py-20 border-t border-border">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-mono text-3xl font-bold text-foreground">{t("experience.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("experience.subtitle")}</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-1/4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={t("experience.search.placeholder")}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-3/4">

                
                <div className="flex items-center justify-end gap-3">
                  <div>
                  <Filter className="h-4 w-4" />
                  </div>
                  <Select value={domainFilter} onValueChange={setDomainFilter}>
                    <SelectTrigger >
                      <SelectValue placeholder={t("experience.filters.any_domain")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("experience.filters.any_domain")}</SelectItem>
                      {domainOptions.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={clientFilter} onValueChange={setClientFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("experience.filters.any_client")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("experience.filters.any_client")}</SelectItem>
                      {clientOptions.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <MultiSelect
                    options={skillFilterOptions}
                    value={selectedSkills}
                    onValueChange={setSelectedSkills}
                    searchable={true}
                    placeholder={t("experience.filters.any_skill")}
                    responsive={true}
                    maxCount={2}          // already default, but explicit is nice
                    singleLine            // one liner
                    className="flex-1 "
                  />
                  
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              {filteredExperiences.length}/{data.length}
            </div>
          </div>

          {filteredExperiences.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl text-muted-foreground">
              {t("experience.none")}
            </div>
          ) : (
            <div className="space-y-8">
              {visibleExperiences.map((exp, index) => (
                <Card key={index} className="bg-card border-border">
                  
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-xl text-foreground">{exp.role}</CardTitle>
                        <div className="flex items-center text-primary font-medium">
                          <Building className="mr-2 h-4 w-4" />
                          {exp.company}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {exp.dates}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {exp.location}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {t(`experience.type.${exp.type}`)}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-right">
                        {exp.domain && (
                            <Badge variant="secondary" className="text-xs ">
                              {exp.domain}
                            </Badge>
                          )}
                          {exp.client && (
                            <Badge variant="default" className="text-xs text-white">
                              {exp.client}
                            </Badge>
                          )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-muted-foreground flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">{t("experience.technologies_used")}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {visibleCount < filteredExperiences.length && (
                <div className="flex justify-center">
                  <Button variant="outline" onClick={handleLoadMore}>
                    {t("experience.load_more")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
