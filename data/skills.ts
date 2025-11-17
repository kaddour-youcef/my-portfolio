export interface Skill {
    name: string
    level: "novice" | "intermediate" | "advanced" | "expert"
  }
  
  export interface SkillCategory {
    category: string
    skills: Skill[]
  }
  
  export interface SkillsData {
    [key: string]: SkillCategory
  }

  
  export const levelToProgress = {
    novice: 25,
    intermediate: 50,
    advanced: 75,
    expert: 100,
  }
  
  export const levelColors = {
    novice: "bg-yellow-500",
    intermediate: "bg-blue-500",
    advanced: "bg-green-500",
    expert: "bg-purple-500",
  }
  