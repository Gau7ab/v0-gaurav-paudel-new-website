"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Mail,
  MapPin,
  Phone,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  Send,
  Mountain,
  Users,
  Compass,
  Lightbulb,
  Sparkles,
  X,
} from "lucide-react"
import { AnimateOnScroll, AnimateStagger } from "@/components/scroll-animation"
import { useState } from "react"
import { HeroProfile } from "@/components/hero-profile"
import { CloudEffect } from "@/components/cloud-effect"
import { SnowEffect } from "@/components/snow-effect"
import { ProjectsShowcase } from "@/components/projects-showcase"

// Placeholder for the ProjectsShowcase component, assuming it's in a separate file
// and needs to be imported. For this merge, we'll assume it's available.
// If ProjectsShowcase were in the same file, it would be defined here.
// For now, we'll simulate its presence.
// const ProjectsShowcase = () => (
//   <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//     {/* Example project cards - replace with actual ProjectsShowcase content */}
//     <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card rounded-2xl overflow-hidden group">
//       <CardHeader className="bg-primary/10 border-b border-primary/20">
//         <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
//           Aakar Academy
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6">
//         <p className="text-muted-foreground mb-4">Educational platform with course management</p>
//         <div className="flex flex-wrap gap-2 mb-4">
//           <Badge variant="outline" className="bg-background/50 text-foreground border-secondary/30 text-xs">
//             Next.js
//           </Badge>
//           <Badge variant="outline" className="bg-background/50 text-foreground border-secondary/30 text-xs">
//             React
//           </Badge>
//           <Badge variant="outline" className="bg-background/50 text-foreground border-secondary/30 text-xs">
//             PostgreSQL
//           </Badge>
//         </div>
//         <a
//           href="/glabs"
//           className="text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-1"
//         >
//           View Project →
//         </a>
//       </CardContent>
//     </Card>
//     <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card rounded-2xl overflow-hidden group">
//       <CardHeader className="bg-secondary/10 border-b border-secondary/20">
//         <CardTitle className="text-xl text-foreground group-hover:text-secondary transition-colors">
//           SARAL System
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6">
//         <p className="text-muted-foreground mb-4">Restaurant management platform</p>
//         <div className="flex flex-wrap gap-2 mb-4">
//           <Badge variant="outline" className="bg-background/50 text-foreground border-secondary/30 text-xs">
//             Next.js
//           </Badge>
//           <Badge variant="outline" className="bg-background/50 text-foreground border-secondary/30 text-xs">
//             Node.js
//           </Badge>
//           <Badge variant="outline" className="bg-background/50 text-foreground border-secondary/30 text-xs">
//             Stripe
//           </Badge>
//         </div>
//         <a
//           href="/glabs"
//           className="text-secondary hover:text-secondary/80 font-semibold text-sm flex items-center gap-1"
//         >
//           View Project →
//         </a>
//       </CardContent>
//     </Card>
//     <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card rounded-2xl overflow-hidden group">
//       <CardHeader className="bg-primary/10 border-b border-primary/20">
//         <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
//           Portfolio Manager
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6">
//         <p className="text-muted-foreground mb-4">Dynamic admin dashboard</p>
//         <div className="flex flex-wrap gap-2 mb-4">
//           <Badge variant="outline" className="bg-background/50 text-foreground border-secondary/30 text-xs">
//             Next.js 16
//           </Badge>
//           <Badge variant="outline" className="bg-background/50 text-foreground border-secondary/30 text-xs">
//             Neon DB
//           </Badge>
//           <Badge variant="outline" className="bg-background/50 text-foreground border-secondary/30 text-xs">
//             Tailwind
//           </Badge>
//         </div>
//         <a
//           href="/glabs"
//           className="text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-1"
//         >
//           View Project →
//         </a>
//       </CardContent>
//     </Card>
//     {/* Add more project cards as needed */}
//   </div>
// );

function TrekModal({
  trek,
  isOpen,
  onClose,
}: {
  trek: (typeof treksData)[0] | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!trek) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-card border-secondary/30 text-foreground p-0 overflow-y-auto">
        <div className="relative h-48 md:h-80 w-full flex-shrink-0">
          <Image src={trek.image || "/placeholder.svg"} alt={trek.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          <button
            onClick={onClose}
            className="fixed md:absolute top-2 right-2 md:top-4 md:right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-50 shadow-lg"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
          <div className="absolute bottom-3 left-4 right-4 md:bottom-4 md:left-6 md:right-6">
            <Badge className="bg-primary text-primary-foreground font-bold px-2 py-1 md:px-3 text-xs md:text-sm mb-2 inline-flex items-center gap-1">
              <Mountain className="h-3 w-3" />
              {trek.elevation}
            </Badge>
            <h2 className="text-xl md:text-3xl font-bold text-foreground drop-shadow-lg">{trek.name}</h2>
          </div>
        </div>
        <div className="p-4 md:p-8">
          <p className="text-primary text-base md:text-lg font-medium mb-3 md:mb-4">{trek.description}</p>
          <p className="text-foreground/90 text-sm md:text-base leading-relaxed">{trek.experience}</p>
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-secondary/20 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 text-secondary" />
              <span>Nepal Himalayas</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Mountain className="h-4 w-4 text-primary" />
              <span>{trek.elevation} elevation</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const treksData = [
  {
    name: "Annapurna Base Camp",
    image: "/images/abc4.jpeg",
    description: "Gateway to the Annapurna Sanctuary",
    elevation: "4,130m",
    experience:
      "Annapurna Base Camp Trek is one of the most popular trekking routes in Nepal, leading to the base of Annapurna I (8,091 m). The trail passes through traditional Gurung villages, dense rhododendron forests, glaciers, and high-altitude landscapes, ending in a natural Himalayan amphitheater.",
  },
  {
    name: "Annapurna North Basecamp",
    image: "/images/annapurna-20north-20basecamp.jpg",
    description: "Remote and less-explored route to the north face",
    elevation: "4,190m",
    experience:
      "Annapurna North Base Camp Trek is a remote and less-explored route to the north face of Annapurna I. Accessed via Narchyang in Myagdi district, the trek includes alpine terrain, glacier views, and the sacred Panchakunda Lake. Camping and strong physical endurance are required.",
  },
  {
    name: "Mardi Himal",
    image: "/images/mardi-himal2.jpeg",
    description: "Scenic alternative to ABC with dramatic views",
    elevation: "4,500m",
    experience:
      "Mardi Himal Trek is a scenic and quieter alternative to the Annapurna Base Camp trek. The route follows narrow ridgelines with dramatic views of Machhapuchhre (Fishtail), Annapurna South, and Hiunchuli, making it ideal for trekkers seeking solitude and mountain views.",
  },
  {
    name: "Gosainkunda",
    image: "/images/gosainkunda.jpeg",
    description: "Sacred lake at high altitude",
    elevation: "4,380m",
    experience:
      "Gosaikunda Lake Trek is a high-altitude pilgrimage and trekking route in Langtang National Park. The sacred alpine lake holds religious significance for Hindus and Buddhists and offers rugged trails, rocky landscapes, and seasonal snow conditions.",
  },
  {
    name: "Poon Hill",
    image: "/images/poon-hill.jpeg",
    description: "Classic sunrise viewpoint",
    elevation: "3,210m",
    experience:
      "Poon Hill Trek is a short and beginner-friendly trek famous for its sunrise views over the Annapurna and Dhaulagiri mountain ranges. It is one of the most accessible trekking routes in Nepal and ideal for first-time trekkers.",
  },
  {
    name: "Tilicho Lake",
    image: "/images/tilicho.jpeg",
    description: "One of the highest lakes in the world",
    elevation: "4,919m",
    experience:
      "Tilicho Lake Trek leads to one of the world’s highest alpine lakes. The route features rugged high-altitude terrain, landslide-prone sections, and dramatic Himalayan scenery. The trek is commonly combined with the Annapurna Circuit.",
  },
  {
    name: "Khumai Danda",
    image: "/images/khumai-danda.jpeg",
    description: "Panoramic viewpoint in Kaski",
    elevation: "3,245m",
    experience:
      "Khumai Danda Trek is a short and emerging trekking route near Pokhara, known for sunrise and sunset views of Machhapuchhre, Annapurna South, and Lamjung Himal. It is ideal for weekend hikes and beginner trekkers.",
  },
]

export default function Home() {
  const [selectedTrek, setSelectedTrek] = useState<(typeof treksData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTrekClick = (trek: (typeof treksData)[0]) => {
    setSelectedTrek(trek)
    setIsModalOpen(true)
  }

  const education = [
    {
      year: "24",
      degree: "Master in Business Administration (MBA)",
      school: "Boston International College",
      location: "Bharatpur-10, Nepal",
    },
    {
      year: "19",
      degree: "Bachelor in Business Administration (BBA)",
      school: "Saptagandaki Multiple Campus",
      location: "Bharatpur-10, Chitwan",
    },
    {
      year: "16",
      degree: "Secondary Level (+2) in Management",
      school: "Eden Garden English Secondary School",
      location: "Bharatpur-10, Chitwan",
    },
    {
      year: "SLC",
      degree: "SLC",
      school: "Madi Secondary School",
      location: "Madi-03, Chitwan",
    },
  ]

  const workExperience = [
    {
      title: "Head of SARAL",
      company: "Bitflux Technologies Pvt. Ltd.",
      period: "Oct 2024 - Present",
      location: "Chitwan, Nepal",
      description:
        "Leading the development and implementation of SARAL, an innovative restaurant management system. Overseeing product strategy, client onboarding, and continuous improvement of the platform to streamline restaurant operations across Nepal.",
    },
    {
      title: "Business Development Officer",
      company: "Bitflux Technologies Pvt. Ltd.",
      period: "Aug 2024 - Present",
      location: "Chitwan, Nepal",
      description:
        "Spearheading business development initiatives to expand the company's market presence. Developing strategic partnerships, identifying growth opportunities, and implementing effective marketing strategies to increase brand awareness and customer acquisition.",
    },
    {
      title: "Banking Intern",
      company: "Muktinath Bikas Bank Limited",
      period: "May - Jul 2024",
      location: "Nepal",
      description:
        "Gained comprehensive exposure to banking operations including customer service, account management, and financial analysis. Assisted in processing transactions, preparing financial reports, and implementing customer relationship management strategies. Developed a strong understanding of banking regulations and financial services.",
    },
  ]

  const leadershipExperience = [
    {
      title: "Team Leader & Navigator",
      description:
        "Led multiple trekking expeditions, making critical decisions on routes, safety, and group dynamics in challenging mountain environments.",
      icon: Compass,
    },
    {
      title: "Community Organizer",
      description:
        "Organized local youth initiatives and environmental awareness programs, bringing together diverse groups for common goals.",
      icon: Users,
    },
    {
      title: "Problem Solver",
      description:
        "Developed strong analytical and creative problem-solving skills through academic projects and real-world challenges in the mountains.",
      icon: Lightbulb,
    },
  ]

  const achievements = [
    {
      icon: Mountain,
      title: "7 Major Treks Completed",
      description: "Successfully completed treks to iconic destinations across Nepal's Himalayan region.",
    },
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Maintaining strong academic performance while pursuing passion for adventure and exploration.",
    },
    {
      icon: Star,
      title: "Youth Leadership",
      description: "Recognized for leadership in organizing community events and youth programs.",
    },
    {
      icon: Sparkles,
      title: "Cultural Ambassador",
      description: "Promoting Nepali culture and natural heritage through trekking experiences and storytelling.",
    },
  ]

  const skills = [
    { name: "Navigation & Route Planning", category: "Trekking & Adventure" },
    { name: "High Altitude Trekking", category: "Trekking & Adventure" },
    { name: "Wilderness Survival", category: "Trekking & Adventure" },
    { name: "Photography", category: "Trekking & Adventure" },
    { name: "Team Leadership", category: "Leadership & Teamwork" },
    { name: "Decision Making", category: "Leadership & Teamwork" },
    { name: "Group Coordination", category: "Leadership & Teamwork" },
    { name: "Crisis Management", category: "Leadership & Teamwork" },
    { name: "Business Administration", category: "Management & Academic" },
    { name: "Organizational Behavior", category: "Management & Academic" },
    { name: "Strategic Planning", category: "Management & Academic" },
    { name: "Project Management", category: "Management & Academic" },
    { name: "Digital Literacy", category: "Digital & Personal Growth" },
    { name: "Social Media", category: "Digital & Personal Growth" },
    { name: "Adaptability", category: "Digital & Personal Growth" },
    { name: "Cultural Awareness", category: "Digital & Personal Growth" },
  ]

  const treks = treksData

  return (
    <div className="min-h-screen bg-background">
      <SnowEffect />

      <TrekModal trek={selectedTrek} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <Image
            src="/images/himalayan-hero.jpg"
            alt="Himalayan Mountains"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/60" />
        </div>

        {/* Contour pattern overlay */}
        <div className="absolute inset-0 contour-pattern opacity-30" />

        <CloudEffect />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <AnimateOnScroll animation="fadeIn" className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm border border-primary/30">
              Trekker • Explorer • Nature Wanderer
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeIn" delay={0.1} className="mb-8">
            <HeroProfile imageSrc="/images/abc4.jpeg" alt="Om Prakash Paudel (Gaurav)" />
          </AnimateOnScroll>

          <AnimateOnScroll animation="slideUp" delay={0.2} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground drop-shadow-lg">
              Om Prakash Paudel
              <span className="block text-primary">(Gaurav)</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll animation="slideUp" delay={0.4} className="mb-8">
            <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              MBA Scholar & Himalayan Trekker Exploring Nepal's Mountains
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="slideUp" delay={0.6} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 btn-hover-lift shadow-lg hover:shadow-xl transition-shadow"
            >
              <a href="#portfolio">View Trek Portfolio</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg font-semibold border-2 border-secondary text-secondary bg-transparent hover:bg-secondary/10 btn-hover-lift shadow-lg hover:shadow-xl transition-shadow"
            >
              <a href="#contact">Connect With Me</a>
            </Button>
          </AnimateOnScroll>
        </div>
      </section>

      <section id="about" className="relative py-24 bg-muted">
        {/* Diagonal top border */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-background transform -skew-y-2 origin-top-left" />

        <div className="container mx-auto px-4 pt-8">
          <AnimateOnScroll animation="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">About Om Prakash Paudel</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />
          </AnimateOnScroll>

          <AnimateOnScroll animation="slideUp" delay={0.3} className="max-w-4xl mx-auto">
            <Card className="border-none shadow-2xl bg-card rounded-2xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <p className="text-lg md:text-xl leading-relaxed text-foreground mb-6 text-center">
                  I'm Om Prakash Paudel, a student with a strong academic background in management and a deep personal
                  passion for the mountains. While pursuing my MBA education, trekking has become the space where I test
                  my mindset, discipline, and leadership across Nepal's Himalayan region.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6 text-center">
                  Studying management and organizational behavior taught me how teams think. The mountains taught me how
                  people move — how they push limits, stay calm under pressure, and grow through discomfort.
                </p>

                <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto my-8" />

                <h3 className="text-xl font-bold text-primary mb-4 text-center">My journey blends both worlds:</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-primary/20">
                    <GraduationCap className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <p className="text-foreground text-center">
                      <span className="font-semibold text-primary">Education</span> gives me clarity, structure, and
                      strategy.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-secondary/20">
                    <Mountain className="h-6 w-6 text-secondary shrink-0 mt-1" />
                    <p className="text-foreground text-center">
                      <span className="font-semibold text-secondary">Trekking</span> gives me resilience, confidence,
                      and life experience you don't get inside a classroom.
                    </p>
                  </div>
                </div>

                <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent mx-auto my-8" />

                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground text-center mb-4">
                  Every trail I walk reminds me why I love exploring Nepal: the culture, the nature, and the silence
                  that hits deeper than any lecture.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-foreground text-center italic font-medium">
                  I trek to understand myself better — and to inspire others to step outside their comfort zone.
                </p>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </section>

      <section id="experience" className="relative py-24 bg-background contour-pattern">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Experience & Leadership</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-12 rounded-full" />
          </AnimateOnScroll>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <AnimateStagger delay={0.3} staggerDelay={0.15} animation="slideUp">
              {leadershipExperience.map((exp, index) => (
                <Card key={index} className="border-none shadow-xl bg-card rounded-2xl overflow-hidden group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <exp.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{exp.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </AnimateStagger>
          </div>
        </div>
      </section>

      {/* My Projects & Experiments */}
      <section id="projects" className="relative py-24 bg-muted">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fadeIn">
            <div className="text-center mb-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 mb-4">
                My Work
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Projects & Experiments</h2>
            </div>
            <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />
          </AnimateOnScroll>

          <AnimateOnScroll animation="slideUp" delay={0.3} className="max-w-6xl mx-auto">
            <p className="text-center text-lg text-muted-foreground mb-12">
              A collection of innovative projects spanning educational platforms, consulting tools, and interactive
              portfolios.
            </p>
          </AnimateOnScroll>

          <div className="max-w-6xl mx-auto">
            <ProjectsShowcase />
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Resume</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              My educational background, professional experience, and achievements
            </p>
          </AnimateOnScroll>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Education Timeline */}
            <AnimateOnScroll animation="slideRight" delay={0.2}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-foreground text-2xl">Education</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-primary/20 before:via-primary/50 before:to-primary/20">
                    <AnimateStagger delay={0.3} staggerDelay={0.15} animation="slideUp">
                      {education.map((edu, index) => (
                        <div key={index} className="relative flex items-start gap-6 group">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md group-hover:scale-110 transition-transform text-xs font-bold">
                            {edu.year === "Present" ? <Calendar className="h-4 w-4" /> : edu.year}
                          </div>
                          <div className="flex flex-col pt-1 group-hover:translate-x-1 transition-transform">
                            <h3 className="font-semibold text-lg text-foreground">{edu.degree}</h3>
                            <p className="text-primary font-medium">{edu.school}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {edu.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </AnimateStagger>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Work Experience and Internship */}
            <AnimateOnScroll animation="slideLeft" delay={0.2}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-secondary/5 to-secondary/10 border-b border-secondary/20 p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-secondary/15">
                      <Briefcase className="h-5 w-5 text-secondary" />
                    </div>
                    <CardTitle className="text-lg text-foreground">Work Experience & Internship</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-secondary/20 before:via-secondary/50 before:to-secondary/20">
                    <AnimateStagger delay={0.3} staggerDelay={0.15} animation="slideUp">
                      {workExperience.map((work, index) => (
                        <div key={index} className="relative flex items-start gap-6 group">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md group-hover:scale-110 transition-transform">
                            <Briefcase className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col pt-1 group-hover:translate-x-1 transition-transform">
                            <h3 className="font-semibold text-lg text-foreground">{work.title}</h3>
                            <p className="text-secondary font-medium">{work.company}</p>
                            <p className="text-sm text-muted-foreground">{work.period}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {work.location}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">{work.description}</p>
                          </div>
                        </div>
                      ))}
                    </AnimateStagger>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>

          {/* Achievements and Skills */}
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* Achievements */}
            <AnimateOnScroll animation="slideUp" delay={0.3}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/20 p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/15">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-foreground">Achievements</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <AnimateStagger delay={0.4} staggerDelay={0.1} animation="slideUp">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex flex-col p-4 border border-primary/20 rounded-xl bg-background/50 hover:shadow-md transition-shadow hover:border-primary/40 card-hover"
                        >
                          <achievement.icon className="h-8 w-8 text-primary mb-3" />
                          <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                        </div>
                      ))}
                    </AnimateStagger>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Skills */}
            <AnimateOnScroll animation="slideUp" delay={0.3}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-secondary/5 to-secondary/10 border-b border-secondary/20 p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-secondary/15">
                      <Star className="h-5 w-5 text-secondary" />
                    </div>
                    <CardTitle className="text-lg text-foreground">Skills</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Trekking & Adventure */}
                    <AnimateOnScroll animation="fadeIn" delay={0.4}>
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-3 flex items-center gap-2">
                          <Mountain className="h-4 w-4" /> Trekking & Adventure
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <AnimateStagger delay={0.5} staggerDelay={0.05} animation="slideUp">
                            {skills
                              .filter((skill) => skill.category === "Trekking & Adventure")
                              .map((skill, index) => (
                                <Badge
                                  key={index}
                                  className="px-3 py-1.5 text-xs bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 skill-badge"
                                >
                                  {skill.name}
                                </Badge>
                              ))}
                          </AnimateStagger>
                        </div>
                      </div>
                    </AnimateOnScroll>

                    {/* Leadership & Teamwork */}
                    <AnimateOnScroll animation="fadeIn" delay={0.5}>
                      <div>
                        <h4 className="text-sm font-medium text-secondary mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4" /> Leadership & Teamwork
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <AnimateStagger delay={0.6} staggerDelay={0.05} animation="slideUp">
                            {skills
                              .filter((skill) => skill.category === "Leadership & Teamwork")
                              .map((skill, index) => (
                                <Badge
                                  key={index}
                                  className="px-3 py-1.5 text-xs bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 skill-badge"
                                >
                                  {skill.name}
                                </Badge>
                              ))}
                          </AnimateStagger>
                        </div>
                      </div>
                    </AnimateOnScroll>

                    {/* Management & Academic */}
                    <AnimateOnScroll animation="fadeIn" delay={0.6}>
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-3 flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" /> Management & Academic
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <AnimateStagger delay={0.7} staggerDelay={0.05} animation="slideUp">
                            {skills
                              .filter((skill) => skill.category === "Management & Academic")
                              .map((skill, index) => (
                                <Badge
                                  key={index}
                                  className="px-3 py-1.5 text-xs bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 skill-badge"
                                >
                                  {skill.name}
                                </Badge>
                              ))}
                          </AnimateStagger>
                        </div>
                      </div>
                    </AnimateOnScroll>

                    {/* Digital & Personal Growth */}
                    <AnimateOnScroll animation="fadeIn" delay={0.7}>
                      <div>
                        <h4 className="text-sm font-medium text-secondary mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" /> Digital & Personal Growth
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <AnimateStagger delay={0.8} staggerDelay={0.05} animation="slideUp">
                            {skills
                              .filter((skill) => skill.category === "Digital & Personal Growth")
                              .map((skill, index) => (
                                <Badge
                                  key={index}
                                  className="px-3 py-1.5 text-xs bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 skill-badge"
                                >
                                  {skill.name}
                                </Badge>
                              ))}
                          </AnimateStagger>
                        </div>
                      </div>
                    </AnimateOnScroll>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 bg-background relative overflow-hidden">
        {/* Contour pattern background */}
        <div className="absolute inset-0 contour-pattern opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll animation="fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Trekking Portfolio</h2>
            <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
              Exploring the breathtaking landscapes of Nepal's mountains and trails
            </p>
            <p className="text-center text-primary mb-12 text-sm">Click on any card to read the full experience</p>
          </AnimateOnScroll>

          {/* Masonry Grid with varying heights */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimateStagger delay={0.2} staggerDelay={0.1} animation="slideUp">
              {treks.map((trek, index) => {
                // Varying heights for masonry effect
                const heights = [
                  "h-[400px]",
                  "h-[480px]",
                  "h-[420px]",
                  "h-[500px]",
                  "h-[440px]",
                  "h-[460px]",
                  "h-[430px]",
                ]
                const height = heights[index % heights.length]

                return (
                  <Card
                    key={index}
                    onClick={() => handleTrekClick(trek)}
                    className={`break-inside-avoid mb-6 border-none shadow-xl bg-card rounded-2xl overflow-hidden group relative ${height} cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/20`}
                  >
                    {/* Image with parallax effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={trek.image || "/placeholder.svg"}
                        alt={trek.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    </div>

                    {/* Hover border glow effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/50 rounded-2xl transition-all duration-500" />

                    {/* Location marker */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="h-5 w-5 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                      <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                        <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 mb-2 inline-flex items-center gap-1">
                          <Mountain className="h-3 w-3" />
                          {trek.elevation}
                        </Badge>
                        <h3 className="text-2xl font-bold text-foreground mb-2 drop-shadow-lg">{trek.name}</h3>
                      </div>

                      {/* Description - fades in on hover */}
                      <div className="transform transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                        <p className="text-primary text-sm font-medium mb-2">{trek.description}</p>
                        <p className="text-foreground/90 text-sm leading-relaxed line-clamp-3">{trek.experience}</p>
                        <p className="text-secondary text-xs mt-2 flex items-center gap-1">Click to read more...</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </AnimateStagger>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <AnimateOnScroll animation="slideDown">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">Get In Touch</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </AnimateOnScroll>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 w-full">
            {/* Contact Information Card */}
            <AnimateOnScroll animation="slideRight" delay={0.3} className="md:col-span-1 lg:col-span-2">
              <Card className="border-none shadow-lg overflow-hidden bg-card rounded-2xl">
                <div className="relative h-full min-h-[500px] overflow-hidden">
                  <Image
                    src="/images/design-mode/mardi_Himal1.jpg.jpeg"
                    alt="Mountain view"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent p-6 flex flex-col justify-end">
                    <AnimateOnScroll animation="slideUp" delay={0.4}>
                      <h3 className="text-2xl font-bold text-foreground mb-8">Contact Information</h3>
                    </AnimateOnScroll>

                    <div className="space-y-8">
                      <AnimateStagger delay={0.5} staggerDelay={0.15} animation="slideUp">
                        <div className="flex items-center gap-4 group">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm group-hover:bg-primary/40 transition-colors">
                            <Phone className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-muted-foreground text-lg">Phone</p>
                            <a
                              href="tel:+9779845952270"
                              className="text-foreground hover:text-primary transition-colors group-hover:underline text-lg"
                            >
                              +977 9845952270
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 backdrop-blur-sm group-hover:bg-secondary/40 transition-colors">
                            <Mail className="h-6 w-6 text-secondary" />
                          </div>
                          <div>
                            <p className="font-medium text-muted-foreground text-lg">Email</p>
                            <a
                              href="mailto:paudelg97@gmail.com"
                              className="text-foreground hover:text-secondary transition-colors group-hover:underline text-lg"
                            >
                              paudelg97@gmail.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm group-hover:bg-primary/40 transition-colors">
                            <MapPin className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-muted-foreground text-lg">Location</p>
                            <span className="text-foreground text-lg">Chitwan, Nepal</span>
                          </div>
                        </div>
                      </AnimateStagger>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>

            {/* Contact Form Card */}
            <AnimateOnScroll animation="slideLeft" delay={0.3} className="md:col-span-1 lg:col-span-3">
              <Card className="border-none shadow-xl bg-card rounded-2xl h-full">
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
                  <form action="/api/contact" method="POST" className="flex flex-col flex-1 space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          required
                          className="bg-background/50 border-secondary/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          className="bg-background/50 border-secondary/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary h-12"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-muted-foreground">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can I help you?"
                        required
                        className="bg-background/50 border-secondary/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary h-12"
                      />
                    </div>
                    <div className="space-y-2 flex-1 flex flex-col">
                      <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message here..."
                        required
                        className="flex-1 min-h-[150px] bg-background/50 border-secondary/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 btn-hover-lift h-12 text-lg font-semibold"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Om Prakash Paudel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
