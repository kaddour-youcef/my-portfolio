// app/privacy/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Youcef Kaddour",
  description: "Privacy policy for youcefkaddour.com",
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Centered container */}
      <div className="w-full max-w-3xl py-10 md:py-16">
        {children}
      </div>
    </section>
  )
}
