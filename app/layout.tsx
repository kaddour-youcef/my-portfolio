import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { ContentProvider } from "@/contexts/content-context"

export const metadata: Metadata = {
  title: "AI Engineer Portfolio - Youcef KADDOUR",
  description:
    "AI/ML Engineer specializing in production-grade LLM & CV systems. View my projects, research, and experience.",
  keywords: ["AI Engineer", "AI", "Machine Learning", "LLM", "AI Agents", "Deep Learning", "Computer Vision", "NLP", "Portfolio"],
  authors: [{ name: "Youcef KADDOUR" }],
  creator: "Youcef KADDOUR",
  publisher: "Youcef KADDOUR",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youcefkaddour.com",
    title: "AI Engineer Portfolio - Youcef KADDOUR",
    description: "AI/ML Engineer specializing in production-grade LLM & CV systems.",
    siteName: "Youcef KADDOUR - AI Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineer Portfolio - Youcef KADDOUR",
    description: "AI/ML Engineer specializing in production-grade LLM & CV systems.",
    creator: "@youcefkaddourpro",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ContentProvider>
              <Suspense fallback={null}>{children}</Suspense>
            </ContentProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
