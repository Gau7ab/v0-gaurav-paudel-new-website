"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, ArrowRight, LogOut, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabaseClient"

const strategyTools = [
  { name: "InsightSWOT™", href: "/tools/insightswot", description: "Strategic situation analysis" },
  { name: "ModelCanvas™", href: "/tools/modelcanvas", description: "Business model clarity" },
  { name: "MarketForce™", href: "/tools/marketforce", description: "Industry & competition analysis" },
  { name: "GrowthMap™", href: "/tools/growthmap", description: "Strategic roadmap planning" },
  { name: "RiskLens™", href: "/tools/risklens", description: "Risk analysis & mitigation" },
  { name: "ValueProp™", href: "/tools/valueprop", description: "Value proposition design" },
  { name: "BreakPoint™", href: "/tools/breakpoint", description: "Break-even analysis" },
  { name: "FunnelFlow™", href: "/tools/funnelflow", description: "Marketing funnel planning" },
]

const careerTools = [
  { name: "PersonaIQ™", href: "/tools/personaiq", description: "Big Five personality assessment" },
  { name: "TypeScope™", href: "/tools/typescope", description: "Personality type discovery" },
  { name: "CareerFit™", href: "/tools/careerfit", description: "Career recommendation engine" },
  { name: "LeadStyle™", href: "/tools/leadstyle", description: "Leadership style assessment" },
  { name: "StressCheck™", href: "/tools/stresscheck", description: "Burnout & stress evaluation" },
  { name: "FounderIQ™", href: "/tools/founderiq", description: "Entrepreneurial readiness score" },
  { name: "TeamSync™", href: "/tools/teamsync", description: "Team dynamics mapping" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setSession(session)
      } catch (err) {
        console.error("[v0] Error getting session:", err)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription?.unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 no-print ${
        scrolled ? "glass-card-strong border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo-teal.png"
              alt="Gaurab Labs"
              width={140}
              height={48}
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {session ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-1.5 hover:bg-secondary/80 font-medium">
                      Strategy Tools <ChevronDown className="h-4 w-4 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-80 glass-card-strong p-2">
                    {strategyTools.map((tool) => (
                      <DropdownMenuItem
                        key={tool.href}
                        asChild
                        className="rounded-lg hover:bg-secondary/80 cursor-pointer"
                      >
                        <Link href={tool.href} className="flex flex-col items-start gap-0.5 py-2.5 px-3 w-full">
                          <span className="font-medium text-foreground">{tool.name}</span>
                          <span className="text-xs text-muted-foreground">{tool.description}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-1.5 hover:bg-secondary/80 font-medium">
                      Career Intelligence <ChevronDown className="h-4 w-4 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-80 glass-card-strong p-2">
                    {careerTools.map((tool) => (
                      <DropdownMenuItem
                        key={tool.href}
                        asChild
                        className="rounded-lg hover:bg-secondary/80 cursor-pointer"
                      >
                        <Link href={tool.href} className="flex flex-col items-start gap-0.5 py-2.5 px-3 w-full">
                          <span className="font-medium text-foreground">{tool.name}</span>
                          <span className="text-xs text-muted-foreground">{tool.description}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/about">
                  <Button variant="ghost" className="hover:bg-secondary/80 font-medium">
                    About
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-4 hover:bg-secondary/80 relative">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-emerald-500 rounded-full" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass-card-strong">
                    <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border/50">
                      {session?.user?.email}
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="gap-1.5 hover:bg-secondary/80 font-medium opacity-60 cursor-not-allowed"
                    >
                      Strategy Tools <ChevronDown className="h-4 w-4 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-80 glass-card-strong p-2">
                    <div className="px-3 py-2 text-xs text-muted-foreground mb-2">Sign in required to access tools</div>
                    {strategyTools.map((tool) => (
                      <div
                        key={tool.href}
                        className="rounded-lg cursor-not-allowed opacity-50 flex flex-col items-start gap-0.5 py-2.5 px-3"
                      >
                        <span className="font-medium text-foreground">{tool.name}</span>
                        <span className="text-xs text-muted-foreground">{tool.description}</span>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="gap-1.5 hover:bg-secondary/80 font-medium opacity-60 cursor-not-allowed"
                    >
                      Career Intelligence <ChevronDown className="h-4 w-4 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-80 glass-card-strong p-2">
                    <div className="px-3 py-2 text-xs text-muted-foreground mb-2">Sign in required to access tests</div>
                    {careerTools.map((tool) => (
                      <div
                        key={tool.href}
                        className="rounded-lg cursor-not-allowed opacity-50 flex flex-col items-start gap-0.5 py-2.5 px-3"
                      >
                        <span className="font-medium text-foreground">{tool.name}</span>
                        <span className="text-xs text-muted-foreground">{tool.description}</span>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/about">
                  <Button variant="ghost" className="hover:bg-secondary/80 font-medium">
                    About
                  </Button>
                </Link>

                <Link href="/login" className="ml-2">
                  <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all">
                    Sign In <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-secondary/80 relative">
                <Menu className="h-5 w-5" />
                {session && <span className="absolute top-1 right-1 h-2 w-2 bg-emerald-500 rounded-full" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto glass-card-strong">
              <div className="flex flex-col gap-6 mt-6">
                <div className="px-3 pb-4 border-b border-border/50">
                  <Image
                    src="/images/logo-teal.png"
                    alt="Gaurab Labs"
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                {session ? (
                  <>
                    <div className="px-3 py-2 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Logged in as</p>
                      <p className="text-sm font-medium text-foreground truncate">{session?.user?.email}</p>
                    </div>
                    <Link href="/profile" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full gap-2 bg-transparent">
                        <User className="h-4 w-4" />
                        My Profile
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full gap-2 text-red-500 hover:text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full gap-2 bg-gradient-to-r from-primary to-primary/90">
                      Sign In <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <div>
                  <h3 className="font-heading font-semibold text-sm text-muted-foreground mb-3 px-3">Strategy Tools</h3>
                  {session ? (
                    <div className="flex flex-col gap-0.5">
                      {strategyTools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-2.5 px-3 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <span className="font-medium text-sm text-foreground">{tool.name}</span>
                          <span className="block text-xs text-muted-foreground mt-0.5">{tool.description}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground px-3">Sign in required to access</p>
                  )}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-muted-foreground mb-3 px-3">
                    Career Intelligence
                  </h3>
                  {session ? (
                    <div className="flex flex-col gap-0.5">
                      {careerTools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-2.5 px-3 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <span className="font-medium text-sm text-foreground">{tool.name}</span>
                          <span className="block text-xs text-muted-foreground mt-0.5">{tool.description}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground px-3">Sign in required to access</p>
                  )}
                </div>
                <div className="border-t border-border/50 pt-4">
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 px-3 rounded-lg hover:bg-secondary/80 transition-colors font-medium text-sm"
                  >
                    About Gaurab Labs
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
