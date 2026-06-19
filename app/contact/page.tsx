'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import Image from 'next/image'
import { AnimateOnScroll, AnimateStagger } from '@/components/scroll-animation'

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

          {/* Get in Touch Email Card */}
          <AnimateOnScroll animation="slideLeft" delay={0.4}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimateOnScroll animation="slideUp" delay={0.5}>
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Mail className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Send me an email directly</p>
                      <p className="text-lg font-semibold">paudelg97@gmail.com</p>
                    </div>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="bounce" delay={0.6}>
                  <Button
                    asChild
                    className="w-full h-11 text-base"
                  >
                    <a href="mailto:paudelg97@gmail.com" className="flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" />
                      Contact Me
                    </a>
                  </Button>
                </AnimateOnScroll>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    Your default email client will open. You can write your message and send it directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  )
}
