# AI/ML Engineer Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS, featuring a GitHub-inspired dark theme aesthetic.

## 🚀 Features

- **GitHub-inspired Design**: Dark theme with monospaced headings and code-block styling
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Animated terminal widget, expandable project cards, and smooth scrolling
- **Content Management**: Easy-to-edit JSON configuration for all portfolio content
- **Performance Optimized**: Fast loading with semantic HTML and accessibility features
- **SEO Ready**: Proper meta tags and structured data

## 📁 Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles with design tokens
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main portfolio page
├── components/
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   ├── navigation.tsx       # Sticky navigation with search
│   ├── hero-section.tsx     # Hero with terminal widget
│   ├── studies-section.tsx  # Education & certifications
│   ├── skills-section.tsx   # Skills with progress bars
│   ├── experience-section.tsx # Professional experience
│   ├── projects-section.tsx # Projects showcase with filters
│   ├── models-section.tsx   # Model cards with metrics
│   ├── publications-section.tsx # Papers, blogs, talks
│   ├── contact-section.tsx  # Contact form & info
│   └── footer.tsx           # Site footer
├── data/
│   └── portfolio-content.json # All portfolio content
└── lib/
    └── utils.ts             # Utility functions
\`\`\`

## 🎨 Design System

### Color Palette
- **Background**: `#0d1117` (GitHub dark)
- **Cards**: `#161b22` (GitHub card background)
- **Text**: `#c9d1d9` (GitHub text)
- **Primary**: Electric Blue (`#3b82f6`)
- **Secondary**: Emerald (`#10b981`)
- **Borders**: `#30363d` (GitHub borders)

### Typography
- **Headings**: Monospaced fonts (GeistMono)
- **Body**: Sans-serif fonts (GeistSans)
- **Code**: Monospaced for terminal and code blocks

## 📝 Content Management

All portfolio content is managed through the `data/portfolio-content.json` file. This centralized approach makes it easy to update information without touching the code.

### Updating Your Information

1. **Personal Information** (`personal` section):
   \`\`\`json
   {
     "name": "Your Full Name",
     "title": "Your Professional Title",
     "bio": "Brief description of your expertise",
     "location": "City, Country",
     "email": "your.email@domain.com"
   }
   \`\`\`

2. **Social Links** (`personal.links`):
   - Update GitHub, LinkedIn, HuggingFace, Kaggle, and other profile URLs
   - Add your resume URL

3. **Education** (`studies` array):
   - Add degrees with institution, dates, GPA, and coursework
   - Include specializations and relevant projects

4. **Certifications** (`certifications` array):
   - List professional certifications with issuer and credential URLs

5. **Skills** (`skills` object):
   - Organized by category (AI/ML, Data, MLOps, Backend, Cloud)
   - Each skill has a proficiency level: `novice`, `intermediate`, `advanced`, `expert`

6. **Experience** (`experience` array):
   - Professional roles with company, dates, location, and type
   - Detailed descriptions with measurable impact
   - Technology stacks used in each role

### Adding Projects

Projects are stored in the `projects` array. Each project should include:

\`\`\`json
{
  "id": "unique-project-id",
  "title": "Project Name",
  "description": "Brief one-line description",
  "longDescription": "Detailed project description for README",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "tags": ["Tag1", "Tag2"],
  "modality": "NLP|CV|Multimodal|Time-series|RecSys",
  "purpose": "production|research|hackathon",
  "status": "production|research|wip",
  "stats": {
    "stars": 100,
    "forks": 25,
    "downloads": 500
  },
  "links": {
    "github": "https://github.com/username/repo",
    "demo": "https://demo-url.com",
    "paper": "https://arxiv.org/abs/xxxx"
  },
  "architecture": "Brief architecture description",
  "results": ["Key result 1", "Key result 2"],
  "improvements": ["Future improvement 1", "Future improvement 2"]
}
\`\`\`

### Adding Model Cards

Model cards are stored in the `models` array:

\`\`\`json
{
  "id": "unique-model-id",
  "name": "Model Name",
  "task": "What the model does",
  "architecture": "Model architecture (e.g., BERT-Large)",
  "datasets": ["Dataset1", "Dataset2"],
  "training": {
    "epochs": 10,
    "batchSize": 32,
    "learningRate": "2e-5",
    "hardware": "GPU specifications",
    "duration": "Training time"
  },
  "metrics": {
    "Accuracy": "0.95",
    "F1-Score": "0.93"
  },
  "limitations": ["Limitation 1", "Limitation 2"],
  "ethical": ["Ethical consideration 1", "Ethical consideration 2"],
  "license": "MIT|Apache 2.0|etc",
  "links": {
    "huggingface": "https://huggingface.co/username/model",
    "paper": "https://arxiv.org/abs/xxxx",
    "demo": "https://demo-url.com"
  }
}
\`\`\`

### Adding Publications

Publications are stored in the `publications` array:

\`\`\`json
{
  "id": "unique-publication-id",
  "title": "Publication Title",
  "authors": ["Author 1", "Author 2"],
  "venue": "Conference/Journal Name",
  "date": "Month Year",
  "type": "paper|blog|talk|podcast",
  "summary": "Brief summary of the work",
  "tags": ["Tag1", "Tag2"],
  "links": {
    "paper": "https://arxiv.org/abs/xxxx",
    "blog": "https://blog-url.com",
    "slides": "https://slides-url.com",
    "video": "https://video-url.com",
    "code": "https://github.com/username/repo"
  },
  "citations": 25,
  "featured": true
}
\`\`\`

## 🎯 Customization

### Changing Colors

Update the color tokens in `app/globals.css`:

\`\`\`css
:root {
  --background: oklch(0.08 0 0);     /* Main background */
  --foreground: oklch(0.85 0 0);     /* Text color */
  --primary: oklch(0.6 0.15 250);    /* Primary accent */
  --secondary: oklch(0.65 0.15 150); /* Secondary accent */
  /* ... other tokens */
}
\`\`\`

### Adding New Sections

1. Create a new component in `components/`
2. Import and add it to `app/page.tsx`
3. Add corresponding data structure to `portfolio-content.json`
4. Update navigation in `components/navigation.tsx`

### Modifying Layout

The layout uses Tailwind CSS with a mobile-first approach:
- `max-w-7xl mx-auto` for content width
- `px-4 sm:px-6 lg:px-8` for responsive padding
- `py-20` for section spacing
- `border-t border-border` for section dividers

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The site is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any platform supporting Node.js

## 📱 SEO & Performance

### Meta Tags

Update meta information in `app/layout.tsx`:

\`\`\`typescript
export const metadata: Metadata = {
  title: 'Your Name - AI Engineer',
  description: 'Your professional description',
  // Add more meta tags as needed
}
\`\`\`

### Performance Tips

- Images are optimized with Next.js Image component
- Fonts are loaded efficiently with `next/font`
- CSS is optimized with Tailwind CSS
- Components are code-split automatically

## 🔧 Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Getting Started

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/ai-ml-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
