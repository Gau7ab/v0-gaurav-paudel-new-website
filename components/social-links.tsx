"use client"

import { Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialLinks() {
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/Gaurab0",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/gaurab__as_a",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/gau7ab/",
      label: "LinkedIn",
    },
  ]

  return (
    <div data-social-links className="fixed bottom-8 left-8 flex flex-col gap-2 z-40 print:hidden">
      {socialLinks.map((link) => (
        <Button
          key={link.label}
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
          asChild
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <link.icon className="h-4 w-4" />
            <span className="sr-only">{link.label}</span>
          </a>
        </Button>
      ))}
    </div>
  )
}
