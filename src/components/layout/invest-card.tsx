import { Button } from "@/components/ui/button"
import { StartupCard } from "@/components/starup-card"

const startups = [
  {
    name: "Buchung",
    country: "The Netherlands",
    description:
      "Buchung builds the e-commerce platform for tour and activity businesses. While online booking becomes more important, tour operators struggle with their digital presence.",
    logo: "/startup1.png",
    images: [
      
    ],
    progress: 65,
    daysLeft: 23,
    tag: "Early Bird",
  },
  {
    name: "Leapfunder",
    country: "The Netherlands",
    description:
      "Leapfunder helps startups to raise equity online from a pool of informal investors. Leapfunder provides the infrastructure for online fundraising and investor management.",
    logo: "/startup.png",
    progress: 45,
    daysLeft: 18,
    raised: "€250,000",
  },
  {
    name: "entr.amsterdam",
    country: "The Netherlands",
    description:
      "Museum for cultural & educational shared VR experiences. In our first experience with the Amsterdam Museum, visitors travel back in time to experience the Dutch Golden Age.",
    logo: "/startup2.png",
    images: [
      
    ],
    progress: 35,
    daysLeft: 15,
  },
  {
    name: "Barter",
    country: "The Netherlands",
    description:
      "Barter is a scalable SaaS marketplace that helps businesses save time, money, and effort in managing their digital assets and creator relationships.",
    logo: "/image.png",
    images: [
      
    ],
    progress: 28,
    daysLeft: 12,
  },
]

export default function InvestPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <h1 className="text-center text-4xl font-bold tracking-tight">Invest in startups</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {startups.map((startup, index) => (
            <StartupCard key={index} {...startup} />
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
            View all open rounds
          </Button>
        </div>
      </div>
    </main>
  )
}

