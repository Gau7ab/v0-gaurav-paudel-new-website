"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { AnimateOnScroll } from "@/components/scroll-animation"

export default function ThankYou() {
  return (
    <div className="container mx-auto px-4 flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-6 text-center">
      <AnimateOnScroll animation="zoomIn" duration={0.8}>
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <CheckCircle className="h-12 w-12" />
        </div>
      </AnimateOnScroll>
      <AnimateOnScroll animation="slideUp" delay={0.3}>
        <h1 className="text-3xl md:text-4xl font-bold">Thank You!</h1>
      </AnimateOnScroll>
      <AnimateOnScroll animation="slideUp" delay={0.5}>
        <p className="text-lg md:text-xl text-muted-foreground max-w-md">
          Your message has been sent successfully. I'll get back to you soon.
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll animation="slideUp" delay={0.7}>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </AnimateOnScroll>
    </div>
  )
}
