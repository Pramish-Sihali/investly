import { notFound } from "next/navigation"

const startups = [
  {
    name: "Buchung",
    slug: "buchung",
    country: "The Netherlands",
    description:
      "Buchung builds the e-commerce platform for tour and activity businesses. While online booking becomes more important, tour operators struggle with their digital presence.",
    logo: "",
    progress: 65,
    daysLeft: 23,
    tag: "Early Bird",
  },
  {
    name: "Leapfunder",
    slug: "leapfunder",
    country: "The Netherlands",
    description:
      "Leapfunder helps startups to raise equity online from a pool of informal investors. Leapfunder provides the infrastructure for online fundraising and investor management.",
    logo: "",
    progress: 45,
    daysLeft: 18,
    raised: "€250,000",
  },
  {
    name: "entr.amsterdam",
    slug: "entr-amsterdam",
    country: "The Netherlands",
    description:
      "Museum for cultural & educational shared VR experiences. In our first experience with the Amsterdam Museum, visitors travel back in time to experience the Dutch Golden Age.",
    logo: "",
    progress: 35,
    daysLeft: 15,
  },
  {
    name: "Barter",
    slug: "barter",
    country: "The Netherlands",
    description:
      "Barter is a scalable SaaS marketplace that helps businesses save time, money, and effort in managing their digital assets and creator relationships.",
    logo: "",
    progress: 28,
    daysLeft: 12,
  },
]

export default function StartupPage({ params }: { params: { slug: string } }) {
  const startup = startups.find((s) => s.slug === params.slug)

  if (!startup) {
    return notFound()
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{startup.name}</h1>
      <p className="text-gray-500">{startup.country}</p>
      <p className="mt-4">{startup.description}</p>
      
      <div className="mt-6">
        <p>Progress: {startup.progress}%</p>
        <p>Days Left: {startup.daysLeft}</p>
        {startup.tag && <p className="bg-green-200 px-2 py-1 rounded">{startup.tag}</p>}
      </div>
    </main>
  )
}