"use client"

import type React from "react"
import { useState } from "react"
import emailjs from '@emailjs/browser';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

import { Mail, MapPin, Calendar, Send, CheckCircle, Github, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ReCAPTCHA from "react-google-recaptcha"


interface ContactData {
  email: string
  location: string
  calendly?: string
  availability: string
  socialLinks: {
    github: string
    linkedin: string
    twitter?: string
  }
}

export function ContactSection({ data }: { data: ContactData }) {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!captchaToken) {
      alert("Please verify the reCAPTCHA first.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          reply_to: formData.email,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          "g-recaptcha-response": captchaToken,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
  
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
  
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 border-t border-border">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-mono text-3xl font-bold text-foreground">{t("contact.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-mono text-xl text-foreground">{t("contact.info.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{t("contact.info.email")}</p>
                    <a href={`mailto:${data.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {data.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{t("contact.info.location")}</p>
                    <p className="text-muted-foreground">{data.location}</p>
                  </div>
                </div>

                {data.calendly && (
                    <Button
                      variant="default"
                      asChild
                      className="flex items-center space-x-2"
                    >
                      <a
                        href={data.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Calendar className="h-5 w-5 mr-2" />
                        {t("contact.info.book_meeting")}
                      </a>
                    </Button>
                  )}

                <div className="pt-4 border-t border-border">
                  <p className="font-medium text-foreground mb-2">{t("contact.info.availability")}</p>
                  <Badge variant="secondary" className="font-mono">
                    {t("contact.availability")}
                  </Badge>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="font-medium text-foreground mb-3">{t("contact.info.connect")}</p>
                  <div className="flex space-x-4">
                    <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="h-6 w-6" />
                    </a>
                    <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </a>
                    {data.socialLinks.twitter && (
                      <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-mono text-xl text-foreground">{t("contact.form.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                    <h3 className="text-lg font-semibold text-foreground">{t("contact.form.sent_title")}</h3>
                    <p className="text-muted-foreground">{t("contact.form.sent_desc")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          {t("contact.form.name")} *
                        </label>
                        <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="bg-background border-border" />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          {t("contact.form.email")} *
                        </label>
                        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-background border-border" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        {t("contact.form.subject")} *
                      </label>
                      <Input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleChange} className="bg-background border-border" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        {t("contact.form.message")} *
                      </label>
                      <Textarea id="message" name="message" rows={6} required value={formData.message} onChange={handleChange} className="bg-background border-border resize-none" placeholder={t("contact.form.placeholder")} />

                      <div className="flex md:justify-end my-8">
                        <ReCAPTCHA
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                          onChange={(token : string) => setCaptchaToken(token)}
                          className=""
                        />
                      </div>

                    </div>



                    <Button type="submit" size="lg" className="w-full font-mono" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {t("contact.form.sending")}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t("contact.form.send")}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
