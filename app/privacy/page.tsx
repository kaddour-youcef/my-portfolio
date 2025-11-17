// app/privacy/page.tsx
import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy | Youcef Kaddour",
  description: "Privacy policy for youcefkaddour.com",
};

const LAST_UPDATED = "17 November 2025";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="container max-w-3xl py-10 md:py-16">
          <Card className="border-muted shadow-sm">
          <CardHeader className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Legal
            </p>
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Privacy Policy
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </CardHeader>

          <CardContent className="space-y-8 text-sm leading-relaxed text-muted-foreground">
            {/* Intro */}
            <section className="space-y-3">
              <p>
                This Privacy Policy explains how{" "}
                <span className="font-medium text-foreground">Youcef Kaddour</span>{" "}
                (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) collects, uses, and
                protects your information when you visit{" "}
                <span className="font-medium text-foreground">
                  youcefkaddour.com
                </span>{" "}
                (the &quot;Website&quot;).
              </p>
              <p>
                By using this Website, you agree to the practices described in this
                Privacy Policy. If you do not agree, please do not use the Website.
              </p>
              <p className="text-xs italic">
                This page is provided for general information and does not constitute
                legal advice.
              </p>
            </section>

            <Separator />

            {/* 1. Who I am */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                1. Who I Am
              </h2>
              <p>
                I am <span className="font-medium text-foreground">Youcef Kaddour</span>,
                an AI / machine learning professional and portfolio owner based in{" "}
                France.
              </p>
              <p>If you have any questions about this Privacy Policy, you can contact me at:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  <a
                    href="mailto:contact@youcefkaddour.com"
                    className="underline underline-offset-4"
                  >
                    contact@youcefkaddour.com
                  </a>
                </li>
                <li>
                  <span className="font-medium text-foreground">Website:</span>{" "}
                  <a
                    href="https://youcefkaddour.com"
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    youcefkaddour.com
                  </a>
                </li>
              </ul>
            </section>

            <Separator />

            {/* 2. Information I collect */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                2. Information I Collect
              </h2>
              <p>
                I only collect information that is necessary to operate this portfolio and
                respond to inquiries.
              </p>

              <h3 className="mt-3 text-sm font-semibold text-foreground">
                2.1 Information you provide directly
              </h3>
              <p>You may provide me with information when you:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fill out a contact form</li>
                <li>Send me an email directly</li>
                <li>Subscribe to a newsletter (if available)</li>
              </ul>
              <p>This may include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Any other information you choose to include in your message</li>
              </ul>

              <h3 className="mt-3 text-sm font-semibold text-foreground">
                2.2 Information collected automatically
              </h3>
              <p>
                When you visit the Website, certain information may be collected
                automatically, such as:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on them</li>
                <li>Referring website or traffic source</li>
              </ul>
              <p>
                This data may be collected through analytics and logging tools to help me
                understand how the Website is used and to improve it.
              </p>
            </section>

            <Separator />

            {/* 3. How I use your information */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                3. How I Use Your Information
              </h2>
              <p>I may use your information to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Respond to your messages, questions, or collaboration requests</li>
                <li>Operate, maintain, and improve the Website and its content</li>
                <li>
                  Analyze traffic and usage patterns (for example, which pages are most
                  visited)
                </li>
                <li>Protect the security and integrity of the Website</li>
                <li>Comply with legal obligations and requests from authorities</li>
              </ul>
              <p className="font-medium text-foreground">
                I do not sell your personal data to third parties.
              </p>
            </section>

            <Separator />

            {/* 4. Cookies */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                4. Cookies and Similar Technologies
              </h2>
              <p>
                The Website may use cookies or similar technologies to improve your
                experience and to collect anonymous usage statistics. Cookies are small
                text files stored on your device.
              </p>
              <p>I may use cookies to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Remember your preferences (such as language)</li>
                <li>Measure and analyze traffic and usage of the Website</li>
              </ul>
              <p>
                You can control or delete cookies through your browser settings. If you
                disable cookies, some features of the Website may not function properly.
              </p>
            </section>

            <Separator />

            {/* 5. Third-party services */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                5. Third-Party Services
              </h2>
              <p>
                I may use third-party services to host, analyze, or improve the Website,
                such as:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Website hosting providers</li>
                <li>Analytics services</li>
                <li>Contact form or email delivery services</li>
              </ul>
              <p>
                These providers may process data on my behalf and have their own privacy
                policies. I aim to work only with reputable providers that follow
                applicable data protection laws, including the General Data Protection
                Regulation (GDPR).
              </p>
            </section>

            <Separator />

            {/* 6. Data retention */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                6. Data Retention
              </h2>
              <p>
                I keep your personal data only for as long as necessary to achieve the
                purposes for which it was collected, including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Responding to your inquiries and maintaining communication</li>
                <li>Improving the Website and its content</li>
                <li>Complying with legal, accounting, or reporting obligations</li>
              </ul>
              <p>
                When data is no longer needed, it will be deleted or anonymized whenever
                reasonably possible.
              </p>
            </section>

            <Separator />

            {/* 7. Security */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                7. Data Security
              </h2>
              <p>
                I take reasonable technical and organizational measures to protect your
                personal data against unauthorized access, alteration, disclosure, or
                destruction.
              </p>
              <p>
                However, no method of transmission over the internet or electronic storage
                is completely secure. I cannot guarantee absolute security, but I work to
                protect your data to the best of my ability.
              </p>
            </section>

            <Separator />

            {/* 8. Your rights (GDPR) */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                8. Your Rights (GDPR)
              </h2>
              <p>
                As a data subject located in the European Union (including France), you
                have certain rights under the General Data Protection Regulation (GDPR),
                including the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access the personal data I hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your personal data in certain circumstances</li>
                <li>
                  Object to or request restriction of the processing of your personal data
                </li>
                <li>
                  Withdraw your consent at any time, when processing is based on consent
                </li>
                <li>
                  Request portability of your data in a structured, commonly used, and
                  machine-readable format
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact me at{" "}
                <a
                  href="mailto:contact@youcefkaddour.com"
                  className="underline underline-offset-4"
                >
                  contact@youcefkaddour.com
                </a>
                . I may ask you to verify your identity before responding to your request.
              </p>
              <p>
                You also have the right to lodge a complaint with your local data
                protection authority if you believe your rights have been violated.
              </p>
            </section>

            <Separator />

            {/* 9. International transfers */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                9. International Data Transfers
              </h2>
              <p>
                The Website may be hosted or use service providers located in countries
                outside the European Economic Area (EEA). In such cases, I will take
                reasonable steps to ensure that your data is protected by appropriate
                safeguards, in accordance with applicable data protection laws.
              </p>
            </section>

            <Separator />

            {/* 10. Children */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                10. Children&apos;s Privacy
              </h2>
              <p>
                This Website is not intended for children under the age of 15, and I do
                not knowingly collect personal data from children. If you believe that a
                child has provided me with personal data, please contact me so that I can
                delete this information.
              </p>
            </section>

            <Separator />

            {/* 11. Changes */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                11. Changes to This Privacy Policy
              </h2>
              <p>
                I may update this Privacy Policy from time to time. When I do, I will
                update the &quot;Last updated&quot; date at the top of this page. If
                changes are significant, I may also provide a more visible notice on the
                Website.
              </p>
              <p>
                Your continued use of the Website after any changes have been published
                means that you accept the updated Privacy Policy.
              </p>
            </section>

            <Separator />

            {/* 12. Contact */}
            <section className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                12. Contact
              </h2>
              <p>
                If you have any questions about this Privacy Policy or how your data is
                handled, you can contact me at:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium text-foreground">Name:</span> Youcef
                  Kaddour
                </li>
                <li>
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  <a
                    href="mailto:contact@youcefkaddour.com"
                    className="underline underline-offset-4"
                  >
                    contact@youcefkaddour.com
                  </a>
                </li>
                <li>
                  <span className="font-medium text-foreground">Website:</span>{" "}
                  <a
                    href="https://youcefkaddour.com"
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    youcefkaddour.com
                  </a>
                </li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>

    </div>
  );
}
