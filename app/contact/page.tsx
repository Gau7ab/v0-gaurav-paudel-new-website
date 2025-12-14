"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import { AnimateOnScroll, AnimateStagger } from "@/components/scroll-animation"

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        {/* Hero Image Card - Full width on mobile */}
        <AnimateOnScroll animation="slideRight">
          <Card className="relative overflow-hidden h-48 md:h-auto">
            <Image
              src="/images/design-mode/mardi_Himal1.jpg.jpeg"
              alt="Mountain view"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 p-4 md:p-6 flex items-end">
              <AnimateOnScroll animation="slideUp" delay={0.3}>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Let's Connect</h2>
              </AnimateOnScroll>
            </div>
          </Card>
        </AnimateOnScroll>

        <div className="space-y-6">
          {/* Contact Information Card */}
          <AnimateOnScroll animation="slideLeft" delay={0.2}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimateStagger delay={0.3} staggerDelay={0.15} animation="slideUp">
                  {[
                    <div key="phone" className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+9779845952270" className="text-sm text-muted-foreground hover:text-primary">
                          +977 9845952270
                        </a>
                      </div>
                    </div>,
                    <div key="email" className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href="mailto:paudelg97@gmail.com"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          paudelg97@gmail.com
                        </a>
                      </div>
                    </div>,
                    <div key="location" className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                        <MapPin className="h-4 w-4" />
                      </Button>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">Madi 05, Chitwan</p>
                      </div>
                    </div>,
                  ]}
                </AnimateStagger>
              </CardContent>
            </Card>
          </AnimateOnScroll>

          {/* Contact Form Card */}
          <AnimateOnScroll animation="slideLeft" delay={0.4}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <form action="https://formspree.io/f/xwpojlky" method="POST" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <AnimateOnScroll animation="slideUp" delay={0.5}>
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" name="name" required className="h-10" placeholder="Your name" />
                      </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll animation="slideUp" delay={0.6}>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="h-10"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </AnimateOnScroll>
                  </div>
                  <AnimateOnScroll animation="slideUp" delay={0.7}>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        className="h-10"
                        placeholder="What is this regarding?"
                      />
                    </div>
                  </AnimateOnScroll>
                  <AnimateOnScroll animation="slideUp" delay={0.8}>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="Write your message here..."
                        className="resize-none"
                      />
                    </div>
                  </AnimateOnScroll>
                  {/* Hidden fields to ensure emails go to your address */}
                  <input type="hidden" name="_replyto" value="paudelg97@gmail.com" />
                  <input type="hidden" name="_subject" value="New message from portfolio website" />
                  <AnimateOnScroll animation="bounce" delay={0.9}>
                    <Button type="submit" className="w-full h-11 text-base">
                      Send Message
                    </Button>
                  </AnimateOnScroll>
                </form>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  )
}
