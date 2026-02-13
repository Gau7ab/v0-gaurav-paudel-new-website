import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 glass-card no-print relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/logo-teal.png"
                alt="Gaurab Labs"
                width={140}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A decision-intelligence platform at the intersection of business strategy, psychology, and technology.
              Empowering smarter decisions.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Bharatpur, Chitwan, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:paudelg97@gmail.com" className="hover:text-primary transition-colors">
                  paudelg97@gmail.com
                </a>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.linkedin.com/in/gau7ab/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">Strategy Tools</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/tools/insightswot" className="hover:text-primary transition-colors">
                  InsightSWOT™
                </Link>
              </li>
              <li>
                <Link href="/tools/modelcanvas" className="hover:text-primary transition-colors">
                  ModelCanvas™
                </Link>
              </li>
              <li>
                <Link href="/tools/marketforce" className="hover:text-primary transition-colors">
                  MarketForce™
                </Link>
              </li>
              <li>
                <Link href="/tools/growthmap" className="hover:text-primary transition-colors">
                  GrowthMap™
                </Link>
              </li>
              <li>
                <Link href="/tools/breakpoint" className="hover:text-primary transition-colors">
                  BreakPoint™
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">Career Intelligence</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/tools/personaiq" className="hover:text-primary transition-colors">
                  PersonaIQ™
                </Link>
              </li>
              <li>
                <Link href="/tools/typescope" className="hover:text-primary transition-colors">
                  TypeScope™
                </Link>
              </li>
              <li>
                <Link href="/tools/careerfit" className="hover:text-primary transition-colors">
                  CareerFit™
                </Link>
              </li>
              <li>
                <Link href="/tools/leadstyle" className="hover:text-primary transition-colors">
                  LeadStyle™
                </Link>
              </li>
              <li>
                <Link href="/tools/founderiq" className="hover:text-primary transition-colors">
                  FounderIQ™
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Gaurab Labs
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-primary transition-colors">
                  Research & Insights
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <p>
                All tools are for educational and self-assessment purposes. Not a substitute for professional advice.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="mb-2">&copy; {new Date().getFullYear()} Gaurab Labs. All rights reserved.</p>
              <p>
                Design and developed by{" "}
                <a
                  href="https://omgaurav.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium transition-colors"
                >
                  Om Prakash Paudel Gaurav
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
