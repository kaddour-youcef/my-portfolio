// Node.js script to validate portfolio content
// Run with: node scripts/validate-content.js

const fs = require("fs")
const path = require("path")

// Simple validation function (Node.js compatible version)
function validateContent(data) {
  const errors = []
  const warnings = []

  // Check for placeholder content
  const jsonString = JSON.stringify(data)
  if (jsonString.includes("[Your Name]")) {
    errors.push("Found placeholder '[Your Name]' - update with your actual name")
  }
  if (jsonString.includes("[you@domain.com]")) {
    errors.push("Found placeholder '[you@domain.com]' - update with your actual email")
  }
  if (jsonString.includes("[City, Country]")) {
    warnings.push("Found placeholder '[City, Country]' - update with your actual location")
  }

  // Validate required fields
  if (!data.personal?.name) {
    errors.push("Missing personal name")
  }
  if (!data.personal?.email) {
    errors.push("Missing personal email")
  }
  if (!data.personal?.bio) {
    warnings.push("Missing personal bio")
  }

  // Check content completeness
  if (!data.experience || data.experience.length === 0) {
    warnings.push("No experience entries found")
  }
  if (!data.projects || data.projects.length === 0) {
    warnings.push("No projects found")
  }
  if (!data.skills) {
    warnings.push("No skills section found")
  }

  return { errors, warnings }
}

// Main execution
try {
  const contentPath = path.join(__dirname, "../data/portfolio-content.json")
  const content = fs.readFileSync(contentPath, "utf8")
  const data = JSON.parse(content)

  console.log("🔍 Validating portfolio content...\n")

  const { errors, warnings } = validateContent(data)

  // Print results
  if (errors.length === 0 && warnings.length === 0) {
    console.log("✅ Content validation passed!")
    console.log("🚀 Your portfolio is ready for deployment.\n")
  } else {
    if (errors.length > 0) {
      console.log("❌ Errors found (must fix):")
      errors.forEach((error) => console.log(`  - ${error}`))
      console.log("")
    }

    if (warnings.length > 0) {
      console.log("⚠️  Warnings (recommended to fix):")
      warnings.forEach((warning) => console.log(`  - ${warning}`))
      console.log("")
    }
  }

  // Content statistics
  console.log("📊 Content Statistics:")
  console.log(`  - Experience entries: ${data.experience?.length || 0}`)
  console.log(`  - Projects: ${data.projects?.length || 0}`)
  console.log(`  - Models: ${data.models?.length || 0}`)
  console.log(`  - Publications: ${data.publications?.length || 0}`)
  console.log(`  - Skill categories: ${Object.keys(data.skills || {}).length}`)

  // Exit with error code if there are errors
  if (errors.length > 0) {
    process.exit(1)
  }
} catch (error) {
  console.error("❌ Error reading or parsing portfolio content:")
  console.error(error.message)
  process.exit(1)
}
