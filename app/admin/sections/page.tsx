import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Layout, User, Award, Home } from "lucide-react"

export default function AdminSectionsPage() {
  const sections = [
    { id: "hero", name: "Hero Section", icon: Home, description: "Headline, subheadline, and profile image" },
    { id: "about", name: "About Section", icon: User, description: "Education, travel identity, and bio" },
    { id: "experience", name: "Experience", icon: Layout, description: "Leadership and professional roles" },
    { id: "achievements", name: "Achievements", icon: Award, description: "Major milestones and highlights" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Website Content</h1>
          <p className="text-muted-foreground mt-1">Manage the dynamic sections of your landing page.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.id} className="border-primary/10 bg-card/50 backdrop-blur-sm card-hover">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{section.name}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex justify-end pt-2">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                  Edit Section
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
