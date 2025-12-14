"use client"

import type React from "react"

import Link from "next/link"
import { EnhancedButton } from "@/components/enhanced-button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll and update active section
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Hide when scrolling down
      } else {
        setIsVisible(true) // Show when scrolling up
      }

      // Add background when scrolled
      setIsScrolled(currentScrollY > 10)
      setLastScrollY(currentScrollY)

      // Update active section only on home page
      if (pathname === "/") {
        const sections = ["home", "resume", "portfolio", "contact"]
        const scrollPosition = currentScrollY + 100

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, pathname])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMobileMenuOpen])

  const links = [
    { href: "/", label: "Home", id: "home" },
    { href: "/#resume", label: "Resume", id: "resume" },
    { href: "/#portfolio", label: "Portfolio", id: "portfolio" },
    { href: "/personality-test", label: "Personality Test", id: "personality-test" },
    { href: "/tools", label: "Tools", id: "tools" },
    { href: "/games", label: "Games", id: "games" },
    { href: "/#contact", label: "Contact", id: "contact" },
  ]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false) // Close mobile menu on click

    // Handle different types of links
    if (href === "/") {
      // Direct home link
      return
    } else if (href.startsWith("/#")) {
      // Hash links - navigate to home first if not already there
      if (pathname !== "/") {
        // Let the browser handle navigation to home page with hash
        return
      } else {
        // Already on home page, scroll to section
        e.preventDefault()
        const targetId = href.replace("/#", "")
        const element = document.getElementById(targetId)
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth",
          })
        }
      }
    } else if (href.startsWith("/")) {
      // Other routes like /personality-test, /tools, /games
      return
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <nav
        id="navigation"
        data-navigation
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="text-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1"
            aria-label="Go to homepage"
          >
            Gaurav Paudel
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => {
              const isActive =
                (pathname === "/" && activeSection === link.id) ||
                (pathname === "/personality-test" && link.id === "personality-test") ||
                (pathname === "/tools" && link.id === "tools") ||
                (pathname === "/games" && link.id === "games") ||
                (pathname !== "/" &&
                  pathname !== "/personality-test" &&
                  pathname !== "/tools" &&
                  pathname !== "/games" &&
                  link.href === pathname)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              )
            })}

            <EnhancedButton
              data-theme-toggle
              variant="ghost"
              size="icon"
              className="ml-4"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </EnhancedButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <EnhancedButton
              data-theme-toggle
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </EnhancedButton>
            <EnhancedButton
              data-hamburger
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </EnhancedButton>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="container px-4 py-4">
              <div className="flex flex-col space-y-4">
                {links.map((link) => {
                  const isActive =
                    (pathname === "/" && activeSection === link.id) ||
                    (pathname === "/personality-test" && link.id === "personality-test") ||
                    (pathname === "/tools" && link.id === "tools") ||
                    (pathname === "/games" && link.id === "games") ||
                    (pathname !== "/" &&
                      pathname !== "/personality-test" &&
                      pathname !== "/tools" &&
                      pathname !== "/games" &&
                      link.href === pathname)

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className={`text-base font-medium transition-colors hover:text-primary py-2 px-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                      role="menuitem"
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" />
    </>
  )
}
