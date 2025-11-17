// Content validation utilities for portfolio data
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validatePortfolioContent(data: any): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validate personal information
  if (!data.personal) {
    errors.push("Missing 'personal' section")
  } else {
    if (!data.personal.name || data.personal.name.includes("[")) {
      errors.push("Personal name is missing or contains placeholder text")
    }
    if (!data.personal.email || data.personal.email.includes("[")) {
      errors.push("Personal email is missing or contains placeholder text")
    }
    if (!data.personal.bio || data.personal.bio.length < 50) {
      warnings.push("Personal bio is missing or too short (recommended: 50+ characters)")
    }
  }

  // Validate experience section
  if (!data.experience || data.experience.length === 0) {
    warnings.push("No experience entries found")
  } else {
    data.experience.forEach((exp: any, index: number) => {
      if (!exp.company || !exp.role || !exp.dates) {
        errors.push(`Experience entry ${index + 1} is missing required fields (company, role, dates)`)
      }
      if (!exp.description || exp.description.length === 0) {
        warnings.push(`Experience entry ${index + 1} has no description`)
      }
    })
  }

  // Validate projects section
  if (!data.projects || data.projects.length === 0) {
    warnings.push("No projects found")
  } else {
    data.projects.forEach((project: any, index: number) => {
      if (!project.id || !project.title || !project.description) {
        errors.push(`Project ${index + 1} is missing required fields (id, title, description)`)
      }
      if (!project.links?.github) {
        warnings.push(`Project "${project.title}" has no GitHub link`)
      }
      if (!project.technologies || project.technologies.length === 0) {
        warnings.push(`Project "${project.title}" has no technologies listed`)
      }
    })
  }

  // Validate skills section
  if (!data.skills) {
    warnings.push("No skills section found")
  } else {
    Object.entries(data.skills).forEach(([category, skillGroup]: [string, any]) => {
      if (!skillGroup.skills || skillGroup.skills.length === 0) {
        warnings.push(`Skill category "${category}" has no skills listed`)
      }
    })
  }

  // Check for placeholder content
  const jsonString = JSON.stringify(data)
  if (jsonString.includes("[Your Name]")) {
    errors.push("Found placeholder '[Your Name]' in content")
  }
  if (jsonString.includes("[you@domain.com]")) {
    errors.push("Found placeholder '[you@domain.com]' in content")
  }
  if (jsonString.includes("[City, Country]")) {
    warnings.push("Found placeholder '[City, Country]' in content")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

export function generateContentReport(data: any): string {
  const validation = validatePortfolioContent(data)

  let report = "# Portfolio Content Report\n\n"

  // Summary
  report += `## Summary\n`
  report += `- Status: ${validation.isValid ? "✅ Valid" : "❌ Has Errors"}\n`
  report += `- Errors: ${validation.errors.length}\n`
  report += `- Warnings: ${validation.warnings.length}\n\n`

  // Content stats
  report += `## Content Statistics\n`
  report += `- Experience entries: ${data.experience?.length || 0}\n`
  report += `- Projects: ${data.projects?.length || 0}\n`
  report += `- Models: ${data.models?.length || 0}\n`
  report += `- Publications: ${data.publications?.length || 0}\n`
  report += `- Skill categories: ${Object.keys(data.skills || {}).length}\n\n`

  // Errors
  if (validation.errors.length > 0) {
    report += `## ❌ Errors (Must Fix)\n`
    validation.errors.forEach((error) => {
      report += `- ${error}\n`
    })
    report += "\n"
  }

  // Warnings
  if (validation.warnings.length > 0) {
    report += `## ⚠️ Warnings (Recommended)\n`
    validation.warnings.forEach((warning) => {
      report += `- ${warning}\n`
    })
    report += "\n"
  }

  if (validation.isValid && validation.warnings.length === 0) {
    report += `## 🎉 All Good!\n`
    report += `Your portfolio content looks great and is ready for deployment.\n\n`
  }

  return report
}
