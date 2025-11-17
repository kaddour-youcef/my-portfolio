"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, Gamepad2 } from "lucide-react"
import { SkillsTetris } from "./skills-tetris"
import { motion, AnimatePresence } from "framer-motion"
import { SkillsSection } from "./skills-section"
import { useLanguage } from "@/contexts/language-context"
import { Switch } from "./ui/switch"


interface Skill {
  name: string
  level: "novice" | "intermediate" | "advanced" | "expert"
}

interface SkillCategory {
  category: string
  skills: Skill[]
}

interface SkillsData {
  [key: string]: SkillCategory
}


export function SkillsShowcase({ data }: { data: SkillsData }) {
  const [mode, setMode] = useState<"classic" | "discover">("classic")
  const { t } = useLanguage()

  return (
    <section id="skills" className="py-20 border-t border-border">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-mono text-3xl font-bold text-foreground">{t("skills.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("skills.subtitle")}</p>
        </div>
      

        <div className="flex items-center gap-2 justify-end">

        <Terminal className="w-4 h-4" />
        <span className="font-mono text-sm">Classic</span>
        <Switch
          checked={mode === "discover"}
          onCheckedChange={(checked) =>
            setMode(checked ? "discover" : "classic")
          }
        />

      <Gamepad2 className="w-4 h-4" />
        <span className="font-mono text-sm">Interactive</span>
      </div>


        {/* Content */}
        <AnimatePresence mode="wait">
          {mode === "classic" ? (
            <motion.div
              key="classic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SkillsSection data={data} />
            </motion.div>
          ) : (
            <motion.div
              key="discover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen -mx-4 -my-8"
            >
              <SkillsTetris skillsData={data} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  )
}
