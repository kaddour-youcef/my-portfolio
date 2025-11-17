"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"

const SKILL_LEVELS = ["novice", "intermediate", "advanced", "expert"] as const
type SkillLevel = (typeof SKILL_LEVELS)[number]

interface Skill {
  name: string
  level: string
}

interface SkillCategory {
  category: string
  skills: Skill[]
}

interface SkillsData {
  [key: string]: SkillCategory
}

const levelToProgress: Record<SkillLevel, number> = {
  novice: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
}

const levelColors: Record<SkillLevel, string> = {
  novice: "bg-yellow-500",
  intermediate: "bg-blue-500",
  advanced: "bg-green-500",
  expert: "bg-purple-500",
}

const normalizeLevel = (level: string): SkillLevel => {
  return SKILL_LEVELS.includes(level as SkillLevel) ? (level as SkillLevel) : "novice"
}

export function SkillsSection({ data }: { data: SkillsData }) {
  const { t } = useLanguage()
  return (
    <section id="skills" className="py-20 border-t border-border">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-mono text-3xl font-bold text-foreground">{t("skills.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("skills.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(data).map((category) => (
            <Card key={category.category} className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-mono text-xl text-foreground flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => {
                  const level = normalizeLevel(skill.level)
                  return (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <Badge variant="secondary" className={`text-xs ${levelColors[level]} text-white`}>
                          {t(`skills.level.${level}`)}
                        </Badge>
                      </div>
                      <Progress value={levelToProgress[level]} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
