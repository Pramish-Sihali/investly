import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const teamMembers = [
  {
    name: "Jane Cooper",
    role: "CEO & Founder",
    description:
      "Jane has over 15 years of experience in fintech and is passionate about democratizing investment opportunities.",
    image:
      "",
  },
  {
    name: "Alex Johnson",
    role: "CTO",
    description: "Alex leads our tech team, ensuring our platform is secure, scalable, and user-friendly.",
    image:
      "",
  },
  {
    name: "Maria Rodriguez",
    role: "Head of Investor Relations",
    description:
      "Maria builds and maintains relationships with our investor community, facilitating successful connections.",
    image:
      "",
  },
  {
    name: "David Lee",
    role: "Lead Developer",
    description: "David is the backbone of our development team, constantly innovating and improving our platform.",
    image:
      "",
  },
  {
    name: "Sarah Thompson",
    role: "Marketing Director",
    description: "Sarah crafts our brand strategy and ensures our message reaches the right audience.",
    image:
      "",
  },
  {
    name: "Michael Brown",
    role: "Financial Advisor",
    description: "Michael brings his wealth of experience in finance to guide both our company and our users.",
    image:
      "",
  },
]

export default function OurTeam() {
  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated professionals behind Leapfunder, working tirelessly to make angel investing accessible
            and rewarding.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-[#FF6B35] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

