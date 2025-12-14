import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function Resume() {
  const education = [
    {
      year: "Present",
      degree: "Master in Business Administration (MBA)",
      school: "Boston International College",
      location: "Bharatpuur-10, Nepal",
    },
    {
      year: "2024",
      degree: "Bachelor in Business Administration (BBA)",
      school: "Saptagandaki Multiple Campus",
      location: "Bharatpur-10, Chitwan",
    },
    {
      year: "2019",
      degree: "Secondary Level (+2) in Management",
      school: "Eden Garden English Secondary School",
      location: "Bharatpur-10, Chitwan",
    },
    {
      year: "2016",
      degree: "SLC",
      school: "Madi Secondary School",
      location: "Madi-03, Chitwan",
    },
  ]

  return (
    <div className="container mx-auto py-12">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {education.map((edu, index) => (
                  <div key={index} className="relative flex items-center gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs">
                      {edu.year}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-muted-foreground">{edu.school}</p>
                      <p className="text-sm text-muted-foreground">{edu.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold">Marketing</h3>
                  <ul className="mt-2 list-disc pl-4 text-muted-foreground">
                    <li>Digital Marketing</li>
                    <li>Brand Management</li>
                    <li>Market Research</li>
                    <li>Social Media Marketing</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Technical</h3>
                  <ul className="mt-2 list-disc pl-4 text-muted-foreground">
                    <li>MS Office Suite</li>
                    <li>Data Analysis</li>
                    <li>Digital Tools</li>
                    <li>Project Management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="overflow-hidden">
            <Image
              src="/images/design-mode/Poon_hill.jpg.jpeg"
              alt="Trekking photo"
              width={400}
              height={600}
              className="w-full object-cover"
            />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trekking Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>Annapurna Base Camp (ABC)</li>
                <li>Mardi Himal</li>
                <li>Gosaikunda</li>
                <li>Poon Hill</li>
                <li>Tilicho Lake</li>
                <li>Khumai</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
