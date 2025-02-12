"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StartupCard } from "@/components/starup-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const startups = [
  {
    name: "Buchung",
    country: "The Netherlands",
    description:
      "Buchung builds the e-commerce platform for tour and activity businesses. While online booking becomes more important, tour operators struggle with their digital presence.",
    logo: "/startup1.png",
    progress: 65,
    daysLeft: 23,
    tag: "Early Bird",
    featured: true,
  },
  {
    name: "Leapfunder",
    country: "The Netherlands",
    description:
      "Leapfunder helps startups to raise equity online from a pool of informal investors. Leapfunder provides the infrastructure for online fundraising and investor management.",
    logo: "/startup2.png",
    progress: 45,
    daysLeft: 18,
    raised: "€250,000",
    featured: true,
  },
  {
    name: "entr.amsterdam",
    country: "The Netherlands",
    description:
      "Museum for cultural & educational shared VR experiences. In our first experience with the Amsterdam Museum, visitors travel back in time to experience the Dutch Golden Age.",
    logo: "/startup3.png",
    progress: 35,
    daysLeft: 15,
    featured: false,
  },
  {
    name: "Barter",
    country: "The Netherlands",
    description:
      "Barter is a scalable SaaS marketplace that helps businesses save time, money, and effort in managing their digital assets and creator relationships.",
    logo: "/startup4.png",
    progress: 28,
    daysLeft: 12,
    featured: false,
  },
  {
    name: "Growthly",
    country: "Germany",
    description: "An AI-powered marketing automation platform for small businesses.",
    logo: "/startup.png",
    progress: 50,
    daysLeft: 20,
    featured: true,
  },
  {
    name: "Fundly",
    country: "USA",
    description: "A crowdfunding platform that connects investors with early-stage startups.",
    logo: "/startup6.png",
    progress: 40,
    daysLeft: 14,
    featured: false,
  },
]

export default function InvestPage() {
  const [selectedStartup, setSelectedStartup] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (startup: any) => {
    setSelectedStartup(startup)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedStartup(null)
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <h1 className="text-center text-4xl font-bold tracking-tight">Startups Directory</h1>

        {/* Featured Startups */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {startups.filter((s) => s.featured).map((startup, index) => (
            <div key={index} onClick={() => openModal(startup)} className="cursor-pointer">
              <StartupCard {...startup} />
            </div>
          ))}
        </div>

        {/* Non-Featured Startups in Table */}
        <h2 className="text-2xl font-semibold">Other Startups</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Days Left</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {startups.filter((s) => !s.featured).map((startup, index) => (
              <TableRow key={index} onClick={() => openModal(startup)} className="cursor-pointer hover:bg-gray-100">
                <TableCell>{startup.name}</TableCell>
                <TableCell>{startup.country}</TableCell>
                <TableCell>{startup.progress}%</TableCell>
                <TableCell>{startup.daysLeft} days</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center pt-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-b px-8">
            View all open rounds
          </Button>
        </div>
      </div>

      {/* Modal for Registration */}
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-md bg-white p-6 rounded-lg shadow-lg backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Register to Invest</DialogTitle>
          </DialogHeader>

          {/* Email & Password Registration */}
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="Enter your password" />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Register</Button>
          </div>

          <Separator className="my-4" />

          {/* Social Login */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full">
              Sign in with GitHub
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}