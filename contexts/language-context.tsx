"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = {
  code: string
  name: string
  flag: string
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

type LanguageProviderProps = {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]) // default EN

  // Load cookie on client
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("preferred-language="))
      ?.split("=")[1]

    if (cookie) {
      const lang = languages.find(l => l.code === cookie)
      if (lang) setCurrentLanguage(lang)
    }
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    document.cookie = `preferred-language=${language.code}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
  }

  const t = (key: string): string => {
    const translations = getTranslations(currentLanguage.code)
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Translation data
function getTranslations(languageCode: string): Record<string, string> {
  const translations: Record<string, Record<string, string>> = {
    en: {
      // Navigation
      "nav.about": "About",
      "nav.studies": "Education",
      "nav.skills": "Skills",
      "nav.experience": "Experience",
      "nav.projects": "Projects",
      "nav.models": "Models",
      "nav.publications": "Publications",
      "nav.contact": "Contact",

      // Hero Section
      "hero.greeting": "Hi, I'm",
      "hero.cta.resume": "View Resume",
      "hero.cta.contact": "Get in Touch",
      "hero.stats.followers": "GitHub Followers",
      "hero.stats.stars": "Total Stars",

      // Skills Section
      "skills.title": "Technical Skills",
      "skills.subtitle": "Technologies and tools I work with",

      // Studies Section
      "studies.title": "Education & Certifications",
      "studies.subtitle": "Academic foundation and professional certifications in AI, machine learning, and cloud technologies.",

      // Experience Section
      "experience.title": "Professional Experience",
      "experience.subtitle": "My journey in AI and machine learning",
      "experience.search.placeholder": "Search experiences...",
      "experience.filters.title": "Filters",
      "experience.filters.skill": "Skill",
      "experience.filters.domain": "Domain",
      "experience.filters.client": "Client",
      "experience.filters.any_skill": "All skills",
      "experience.filters.any_domain": "All domains",
      "experience.filters.any_client": "All clients",
      "experience.none": "No experience entries match these filters.",
      "experience.load_more": "Load more",

      // Projects Section
      "projects.title": "Featured Projects",
      "projects.subtitle": "Open source projects and research work",
      "projects.filter.all": "All",
      "projects.filter.nlp": "NLP",
      "projects.filter.cv": "Computer Vision",
      "projects.filter.multimodal": "Multimodal",
      "projects.search.placeholder": "Search projects...",

      // Models Section
      "models.title": "AI Models",
      "models.subtitle": "Custom trained models and research contributions",
      "models.load_more": "Load more",

      // Publications Section
      "publications.title": "Publications & Talks",
      "publications.subtitle": "Research papers, blog posts, and conference presentations",
      "publications.featured": "Featured Publications",
      "publications.all": "All Publications",

      // Contact Section
      "contact.title": "Get In Touch",
      "contact.subtitle": "Let's discuss opportunities and collaborations",
      "contact.form.name": "Name",
      "contact.form.email": "Email",
      "contact.form.subject": "Subject",
      "contact.form.message": "Message",
      "contact.form.send": "Send Message",
      "contact.availability": "Currently available for new opportunities",

      // Footer
      "footer.built": "Built by Youcef KADDOUR",
      "footer.rights": "All rights reserved",
      "footer.last_updated": "Last updated",
      "footer.privacy": "Privacy",

      // Language Selector
      "language.select": "Select language",

      // Blog
      "blog.title": "Blog",
      "blog.coming_soon": "Coming soon...",

      // Studies - details
      "studies.education": "Education",
      "studies.certifications": "Certifications",
      "studies.key_coursework": "Key Coursework",
      "studies.gpa": "GPA",

      // Skills - levels
      "skills.level.novice": "Novice",
      "skills.level.intermediate": "Intermediate",
      "skills.level.advanced": "Advanced",
      "skills.level.expert": "Expert",

      // Experience - details
      "experience.technologies_used": "Technologies Used",
      "experience.type.full-time": "Full-time",
      "experience.type.contract": "Contract",
      "experience.type.internship": "Internship",

      // Projects - filters and texts
      "projects.filter.all_modalities": "All Modalities",
      "projects.filter.all_purposes": "All Purposes",
      "projects.links.code": "Code",
      "projects.links.demo": "Demo",
      "projects.links.private": "Private",
      "projects.readme.button": "README",
      "projects.readme.overview": "Overview",
      "projects.readme.architecture": "Architecture",
      "projects.readme.key_results": "Key Results",
      "projects.readme.future_improvements": "Future Improvements",
      "projects.none": "No projects found matching your criteria.",

      // Models - labels
      "models.training.data": "Training Data",
      "models.training.setup": "Training Setup",
      "models.training.epochs": "Epochs",
      "models.training.batch_size": "Batch Size",
      "models.training.lr": "LR",
      "models.training.hardware": "Hardware",
      "models.training.duration": "Duration",
      "models.metrics.title": "Performance Metrics",
      "models.limitations": "Limitations",
      "models.ethical": "Ethical Considerations",
      "models.links.huggingface": "HuggingFace",
      "models.links.paper": "Paper",
      "models.links.demo": "Demo",

      // Publications - types and links
      "publications.type.paper": "paper",
      "publications.type.blog": "blog",
      "publications.type.talk": "talk",
      "publications.type.podcast": "podcast",
      "publications.citations": "citations",
      "publications.links.paper": "Paper",
      "publications.links.blog": "Blog",
      "publications.links.slides": "Slides",
      "publications.links.video": "Video",
      "publications.links.code": "Code",

      // Contact - info and form
      "contact.info.title": "Contact Information",
      "contact.info.email": "Email",
      "contact.info.location": "Location",
      "contact.info.schedule": "Schedule a Call",
      "contact.info.book_meeting": "Book a meeting",
      "contact.info.connect": "Connect",
      "contact.info.availability": "Availability",
      "contact.form.title": "Send a Message",
      "contact.form.sending": "Sending...",
      "contact.form.sent_title": "Message Sent!",
      "contact.form.sent_desc": "Thank you for reaching out. I'll get back to you soon.",
      "contact.form.placeholder": "Tell me about your project, question, or collaboration idea...",

      // Hero - misc
      "hero.terminal": "terminal",
      "hero.terminal.ready": "Ready to build the future with AI ✨",
    },
    es: {
      // Navigation
      "nav.about": "Acerca de",
      "nav.studies": "Estudios",
      "nav.skills": "Habilidades",
      "nav.experience": "Experiencia",
      "nav.projects": "Proyectos",
      "nav.models": "Modelos",
      "nav.publications": "Publicaciones",
      "nav.contact": "Contacto",

      // Hero Section
      "hero.greeting": "Hola, soy",
      "hero.cta.resume": "Ver CV",
      "hero.cta.contact": "Contactar",
      "hero.stats.followers": "Seguidores GitHub",
      "hero.stats.stars": "Estrellas Totales",

      // Skills Section
      "skills.title": "Habilidades Técnicas",
      "skills.subtitle": "Tecnologías y herramientas con las que trabajo",

      // Studies Section
      "studies.title": "Educación y Certificaciones",
      "studies.subtitle": "Base académica y certificaciones profesionales en IA, aprendizaje automático y tecnologías en la nube.",

      // Experience Section
      "experience.title": "Experiencia Profesional",
      "experience.subtitle": "Mi trayectoria en IA y aprendizaje automático",
      "experience.search.placeholder": "Buscar experiencias...",
      "experience.filters.title": "Filtros",
      "experience.filters.skill": "Habilidad",
      "experience.filters.domain": "Dominio",
      "experience.filters.client": "Cliente",
      "experience.filters.any_skill": "Todas las habilidades",
      "experience.filters.any_domain": "Todos los dominios",
      "experience.filters.any_client": "Todos los clientes",
      "experience.none": "No hay experiencias que coincidan con estos filtros.",
      "experience.load_more": "Cargar más",

      // Projects Section
      "projects.title": "Proyectos Destacados",
      "projects.subtitle": "Proyectos de código abierto y trabajo de investigación",
      "projects.filter.all": "Todos",
      "projects.filter.nlp": "PLN",
      "projects.filter.cv": "Visión Computacional",
      "projects.filter.multimodal": "Multimodal",
      "projects.search.placeholder": "Buscar proyectos...",

      // Models Section
      "models.title": "Modelos de IA",
      "models.subtitle": "Modelos entrenados personalizados y contribuciones de investigación",
      "models.load_more": "Cargar más",

      // Publications Section
      "publications.title": "Publicaciones y Charlas",
      "publications.subtitle": "Artículos de investigación, posts de blog y presentaciones",
      "publications.featured": "Publicaciones Destacadas",
      "publications.all": "Todas las Publicaciones",

      // Contact Section
      "contact.title": "Contacto",
      "contact.subtitle": "Hablemos sobre oportunidades y colaboraciones",
      "contact.form.name": "Nombre",
      "contact.form.email": "Correo",
      "contact.form.subject": "Asunto",
      "contact.form.message": "Mensaje",
      "contact.form.send": "Enviar Mensaje",
      "contact.availability": "Actualmente disponible para nuevas oportunidades",

      // Footer
      "footer.built": "Desarrollado por Youcef KADDOUR",
      "footer.rights": "Todos los derechos reservados",
      "footer.last_updated": "Última actualización",
      "footer.privacy": "Privacidad",

      // Language Selector
      "language.select": "Seleccionar idioma",

      // Blog
      "blog.title": "Blog",
      "blog.coming_soon": "Próximamente...",

      // Studies - details
      "studies.education": "Educación",
      "studies.certifications": "Certificaciones",
      "studies.key_coursework": "Cursos Clave",
      "studies.gpa": "GPA",

      // Skills - levels
      "skills.level.novice": "Novato",
      "skills.level.intermediate": "Intermedio",
      "skills.level.advanced": "Avanzado",
      "skills.level.expert": "Experto",

      // Experience - details
      "experience.technologies_used": "Tecnologías utilizadas",
      "experience.type.full-time": "Tiempo completo",
      "experience.type.contract": "Contrato",
      "experience.type.internship": "Prácticas",

      // Projects - filters and texts
      "projects.filter.all_modalities": "Todas las modalidades",
      "projects.filter.all_purposes": "Todos los propósitos",
      "projects.links.code": "Código",
      "projects.links.demo": "Demo",
      "projects.links.private": "Privado",
      "projects.readme.button": "README",
      "projects.readme.overview": "Resumen",
      "projects.readme.architecture": "Arquitectura",
      "projects.readme.key_results": "Resultados Clave",
      "projects.readme.future_improvements": "Mejoras Futuras",
      "projects.none": "No se encontraron proyectos que coincidan con tus criterios.",

      // Models - labels
      "models.training.data": "Datos de Entrenamiento",
      "models.training.setup": "Configuración de Entrenamiento",
      "models.training.epochs": "Épocas",
      "models.training.batch_size": "Tamaño de lote",
      "models.training.lr": "LR",
      "models.training.hardware": "Hardware",
      "models.training.duration": "Duración",
      "models.metrics.title": "Métricas de Rendimiento",
      "models.limitations": "Limitaciones",
      "models.ethical": "Consideraciones Éticas",
      "models.links.huggingface": "HuggingFace",
      "models.links.paper": "Artículo",
      "models.links.demo": "Demo",

      // Publications - types and links
      "publications.type.paper": "artículo",
      "publications.type.blog": "blog",
      "publications.type.talk": "charla",
      "publications.type.podcast": "podcast",
      "publications.citations": "citas",
      "publications.links.paper": "Artículo",
      "publications.links.blog": "Blog",
      "publications.links.slides": "Diapositivas",
      "publications.links.video": "Video",
      "publications.links.code": "Código",

      // Contact - info and form
      "contact.info.title": "Información de Contacto",
      "contact.info.email": "Correo",
      "contact.info.location": "Ubicación",
      "contact.info.schedule": "Programar una llamada",
      "contact.info.book_meeting": "Reservar una reunión",
      "contact.info.connect": "Conectar",
      "contact.info.availability": "Disponibilidad",
      "contact.form.title": "Enviar un Mensaje",
      "contact.form.sending": "Enviando...",
      "contact.form.sent_title": "¡Mensaje Enviado!",
      "contact.form.sent_desc": "Gracias por contactarme. Te responderé pronto.",
      "contact.form.placeholder": "Cuéntame sobre tu proyecto, pregunta o idea de colaboración...",

      // Hero - misc
      "hero.terminal": "terminal",
      "hero.terminal.ready": "Listo para construir el futuro con IA ✨",
    },
    fr: {
      // Navigation
      "nav.about": "À propos",
      "nav.studies": "Études",
      "nav.skills": "Compétences",
      "nav.experience": "Expérience",
      "nav.projects": "Projets",
      "nav.models": "Modèles",
      "nav.publications": "Publications",
      "nav.contact": "Contact",

      // Hero Section
      "hero.greeting": "Salut, je suis",
      "hero.cta.resume": "Voir CV",
      "hero.cta.contact": "Me Contacter",
      "hero.stats.followers": "Abonnés GitHub",
      "hero.stats.stars": "Étoiles Totales",

      // Skills Section
      "skills.title": "Compétences Techniques",
      "skills.subtitle": "Technologies et outils avec lesquels je travaille",

      // Studies Section
      "studies.title": "Éducation & Certifications",
      "studies.subtitle": "Base académique et certifications professionnelles en IA, apprentissage automatique et technologies cloud.",

      // Experience Section
      "experience.title": "Expérience Professionnelle",
      "experience.subtitle": "Mon parcours en IA et apprentissage automatique",
      "experience.search.placeholder": "Rechercher des expériences...",
      "experience.filters.title": "Filtres",
      "experience.filters.skill": "Compétence",
      "experience.filters.domain": "Domaine",
      "experience.filters.client": "Client",
      "experience.filters.any_skill": "Toutes les compétences",
      "experience.filters.any_domain": "Tous les domaines",
      "experience.filters.any_client": "Tous les clients",
      "experience.none": "Aucune expérience ne correspond à ces filtres.",
      "experience.load_more": "Charger plus",

      // Projects Section
      "projects.title": "Projets Phares",
      "projects.subtitle": "Projets open source et travaux de recherche",
      "projects.filter.all": "Tous",
      "projects.filter.nlp": "TAL",
      "projects.filter.cv": "Vision par Ordinateur",
      "projects.filter.multimodal": "Multimodal",
      "projects.search.placeholder": "Rechercher des projets...",

      // Models Section
      "models.title": "Modèles IA",
      "models.subtitle": "Modèles entraînés personnalisés et contributions de recherche",
      "models.load_more": "Charger plus",

      // Publications Section
      "publications.title": "Publications et Conférences",
      "publications.subtitle": "Articles de recherche, posts de blog et présentations",
      "publications.featured": "Publications Phares",
      "publications.all": "Toutes les Publications",

      // Contact Section
      "contact.title": "Me Contacter",
      "contact.subtitle": "Discutons d'opportunités et de collaborations",
      "contact.form.name": "Nom",
      "contact.form.email": "Email",
      "contact.form.subject": "Sujet",
      "contact.form.message": "Message",
      "contact.form.send": "Envoyer Message",
      "contact.availability": "Disponible pour de nouvelles opportunités",

      // Footer
      "footer.built": "Developpeé par Youcef KADDOUR",
      "footer.rights": "Tous droits réservés",
      "footer.last_updated": "Dernière mise à jour",
      "footer.privacy": "Confidentialité",

      // Language Selector
      "language.select": "Sélectionner la langue",

      // Blog
      "blog.title": "Blog",
      "blog.coming_soon": "Bientôt disponible...",

      // Studies - details
      "studies.education": "Éducation",
      "studies.certifications": "Certifications",
      "studies.key_coursework": "Cours Clés",
      "studies.gpa": "Moyenne",

      // Skills - levels
      "skills.level.novice": "Débutant",
      "skills.level.intermediate": "Intermédiaire",
      "skills.level.advanced": "Avancé",
      "skills.level.expert": "Expert",

      // Experience - details
      "experience.technologies_used": "Technologies utilisées",
      "experience.type.full-time": "Temps plein",
      "experience.type.contract": "Contrat",
      "experience.type.internship": "Stage",

      // Projects - filters and texts
      "projects.filter.all_modalities": "Touts les domaines",
      "projects.filter.all_purposes": "Tous les objectifs",
      "projects.links.code": "Code",
      "projects.links.demo": "Démo",
      "projects.links.private": "Privé",
      "projects.readme.button": "README",
      "projects.readme.overview": "Aperçu",
      "projects.readme.architecture": "Architecture",
      "projects.readme.key_results": "Résultats Clés",
      "projects.readme.future_improvements": "Améliorations Futures",
      "projects.none": "Aucun projet ne correspond à vos critères.",

      // Models - labels
      "models.training.data": "Données d'entraînement",
      "models.training.setup": "Configuration d'entraînement",
      "models.training.epochs": "Époques",
      "models.training.batch_size": "Taille de lot",
      "models.training.lr": "LR",
      "models.training.hardware": "Matériel",
      "models.training.duration": "Durée",
      "models.metrics.title": "Mesures de performance",
      "models.limitations": "Limitations",
      "models.ethical": "Considérations éthiques",
      "models.links.huggingface": "HuggingFace",
      "models.links.paper": "Article",
      "models.links.demo": "Démo",

      // Publications - types and links
      "publications.type.paper": "article",
      "publications.type.blog": "blog",
      "publications.type.talk": "conférence",
      "publications.type.podcast": "podcast",
      "publications.citations": "citations",
      "publications.links.paper": "Article",
      "publications.links.blog": "Blog",
      "publications.links.slides": "Diapositives",
      "publications.links.video": "Vidéo",
      "publications.links.code": "Code",

      // Contact - info and form
      "contact.info.title": "Informations de Contact",
      "contact.info.email": "Email",
      "contact.info.location": "Localisation",
      "contact.info.schedule": "Planifier un appel",
      "contact.info.book_meeting": "Réserver une réunion",
      "contact.info.connect": "Réseaux",
      "contact.info.availability": "Disponibilité",
      "contact.form.title": "Envoyer un message",
      "contact.form.sending": "Envoi...",
      "contact.form.sent_title": "Message envoyé !",
      "contact.form.sent_desc": "Merci pour votre message. Je vous répondrai bientôt.",
      "contact.form.placeholder": "Parlez-moi de votre projet, question ou idée de collaboration...",

      // Hero - misc
      "hero.terminal": "terminal",
      "hero.terminal.ready": "Prêt à construire l'avenir avec l'IA ✨",
    },
    de: {
      // Navigation
      "nav.about": "Über mich",
      "nav.studies": "Studium",
      "nav.skills": "Fähigkeiten",
      "nav.experience": "Erfahrung",
      "nav.projects": "Projekte",
      "nav.models": "Modelle",
      "nav.publications": "Publikationen",
      "nav.contact": "Kontakt",

      // Hero Section
      "hero.greeting": "Hallo, ich bin",
      "hero.cta.resume": "Lebenslauf ansehen",
      "hero.cta.contact": "Kontakt aufnehmen",
      "hero.stats.followers": "GitHub Follower",
      "hero.stats.stars": "Gesamt Sterne",

      // Skills Section
      "skills.title": "Technische Fähigkeiten",
      "skills.subtitle": "Technologien und Tools, mit denen ich arbeite",

      // Studies Section
      "studies.title": "Ausbildung & Zertifizierungen",
      "studies.subtitle": "Akademische Grundlage und berufliche Zertifizierungen in KI, maschinellem Lernen und Cloud-Technologien.",

      // Experience Section
      "experience.title": "Berufserfahrung",
      "experience.subtitle": "Meine Reise in KI und maschinellem Lernen",
      "experience.search.placeholder": "Erfahrungen durchsuchen...",
      "experience.filters.title": "Filter",
      "experience.filters.skill": "Fähigkeit",
      "experience.filters.domain": "Bereich",
      "experience.filters.client": "Kunde",
      "experience.filters.any_skill": "Alle Fähigkeiten",
      "experience.filters.any_domain": "Alle Bereiche",
      "experience.filters.any_client": "Alle Kunden",
      "experience.none": "Keine Erfahrungen entsprechen diesen Filtern.",
      "experience.load_more": "Mehr laden",

      // Projects Section
      "projects.title": "Ausgewählte Projekte",
      "projects.subtitle": "Open-Source-Projekte und Forschungsarbeit",
      "projects.filter.all": "Alle",
      "projects.filter.nlp": "NLP",
      "projects.filter.cv": "Computer Vision",
      "projects.filter.multimodal": "Multimodal",
      "projects.search.placeholder": "Projekte suchen...",

      // Models Section
      "models.title": "KI-Modelle",
      "models.subtitle": "Individuell trainierte Modelle und Forschungsbeiträge",
      "models.load_more": "Mehr laden",

      // Publications Section
      "publications.title": "Publikationen & Vorträge",
      "publications.subtitle": "Forschungsarbeiten, Blog-Posts und Konferenzpräsentationen",
      "publications.featured": "Ausgewählte Publikationen",
      "publications.all": "Alle Publikationen",

      // Contact Section
      "contact.title": "Kontakt aufnehmen",
      "contact.subtitle": "Lassen Sie uns über Möglichkeiten und Zusammenarbeit sprechen",
      "contact.form.name": "Name",
      "contact.form.email": "E-Mail",
      "contact.form.subject": "Betreff",
      "contact.form.message": "Nachricht",
      "contact.form.send": "Nachricht senden",
      "contact.availability": "Derzeit verfügbar für neue Möglichkeiten",

      // Footer
      "footer.built": "Entwickelt von Youcef Kaddour",
      "footer.rights": "Alle Rechte vorbehalten",
      "footer.last_updated": "Zuletzt aktualisiert",
      "footer.privacy": "Datenschutz",

      // Language Selector
      "language.select": "Sprache wählen",

      // Blog
      "blog.title": "Blog",
      "blog.coming_soon": "Demnächst...",

      // Studies - details
      "studies.education": "Ausbildung",
      "studies.certifications": "Zertifizierungen",
      "studies.key_coursework": "Wichtige Kurse",
      "studies.gpa": "GPA",

      // Skills - levels
      "skills.level.novice": "Anfänger",
      "skills.level.intermediate": "Fortgeschritten",
      "skills.level.advanced": "Erfahren",
      "skills.level.expert": "Experte",

      // Experience - details
      "experience.technologies_used": "Verwendete Technologien",
      "experience.type.full-time": "Vollzeit",
      "experience.type.contract": "Vertrag",
      "experience.type.internship": "Praktikum",

      // Projects - filters and texts
      "projects.filter.all_modalities": "Alle Modalitäten",
      "projects.filter.all_purposes": "Alle Zwecke",
      "projects.links.code": "Code",
      "projects.links.demo": "Demo",
      "projects.links.private": "Privat",
      "projects.readme.button": "README",
      "projects.readme.overview": "Übersicht",
      "projects.readme.architecture": "Architektur",
      "projects.readme.key_results": "Wichtigste Ergebnisse",
      "projects.readme.future_improvements": "Zukünftige Verbesserungen",
      "projects.none": "Keine Projekte entsprechen Ihren Kriterien.",

      // Models - labels
      "models.training.data": "Trainingsdaten",
      "models.training.setup": "Trainingseinrichtung",
      "models.training.epochs": "Epochen",
      "models.training.batch_size": "Batch-Größe",
      "models.training.lr": "LR",
      "models.training.hardware": "Hardware",
      "models.training.duration": "Dauer",
      "models.metrics.title": "Leistungsmetriken",
      "models.limitations": "Einschränkungen",
      "models.ethical": "Ethische Überlegungen",
      "models.links.huggingface": "HuggingFace",
      "models.links.paper": "Paper",
      "models.links.demo": "Demo",

      // Publications - types and links
      "publications.type.paper": "paper",
      "publications.type.blog": "blog",
      "publications.type.talk": "vortrag",
      "publications.type.podcast": "podcast",
      "publications.citations": "Zitationen",
      "publications.links.paper": "Paper",
      "publications.links.blog": "Blog",
      "publications.links.slides": "Folien",
      "publications.links.video": "Video",
      "publications.links.code": "Code",

      // Contact - info and form
      "contact.info.title": "Kontaktinformationen",
      "contact.info.email": "E-Mail",
      "contact.info.location": "Standort",
      "contact.info.schedule": "Anruf vereinbaren",
      "contact.info.book_meeting": "Termin buchen",
      "contact.info.connect": "Vernetzen",
      "contact.info.availability": "Verfügbarkeit",
      "contact.form.title": "Nachricht senden",
      "contact.form.sending": "Senden...",
      "contact.form.sent_title": "Nachricht gesendet!",
      "contact.form.sent_desc": "Danke für Ihre Nachricht. Ich melde mich bald.",
      "contact.form.placeholder": "Erzählen Sie mir von Ihrem Projekt, Ihrer Frage oder Idee...",

      // Hero - misc
      "hero.terminal": "terminal",
      "hero.terminal.ready": "Bereit, die Zukunft mit KI zu bauen ✨",
    },
    
  }

  return translations[languageCode] || translations.en
}
