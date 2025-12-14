import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function Portfolio() {
  const treks = [
    {
      name: "Annapurna Base Camp",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ABC4.jpg-6Od2QDYDYJ9ovFU3R9jUeoNVtLmode.jpeg",
      description: "ABC at 4130 meters",
    },
    {
      name: "Annapurna North Basecamp",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Annapurna%20North%20Basecamp-gHJAHCyHuntE5VGPBvQDjewAo8qBNz.jpg",
      description: "Pristine PanchaKunda lake at Myagdi district with snow-capped Annapurna range views",
    },
    {
      name: "Mardi Himal",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mardi_Himal2.jpg-LvO5xFp5RZVK6Y0kucpWOoey7fKauN.jpeg",
      description: "Beautiful view of the Mardi Himal trek",
    },
    {
      name: "Gosaikunda",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gosainkunda.jpg-ED7MKAuL52ThN2LH51EaUFF7EmHuvC.jpeg",
      description: "Sacred lake at high altitude",
    },
    {
      name: "Poon Hill",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Poon_hill.jpg-WtJ0sjV1ES2jHTLHXJbr15lGsV2o18.jpeg",
      description: "Famous viewpoint trek",
    },
    {
      name: "Tilicho Lake",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tilicho.jpg-5FCaoDO9j8rAySfCJRuDaHpkL6xSMG.jpeg",
      description: "One of the highest lakes in the world",
    },
    {
      name: "Khumai",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Khumai_Danda.jpg-297m5pMhAvEG3MLkPsMTxFObuUGanN.jpeg",
      description: "Scenic trek with mountain views",
    },
  ]

  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-3xl font-bold">Trekking Portfolio</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {treks.map((trek, index) => (
          <Card key={index} className="overflow-hidden transition-transform hover:scale-105">
            <div className="relative h-64">
              <Image src={trek.image || "/placeholder.svg"} alt={trek.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{trek.name}</h3>
              <p className="text-sm text-muted-foreground">{trek.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
