import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="/hero.jpg"
          alt="Office meeting background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
            {/* Left Column */}
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
                Europe&apos;s leading
                <br />
                Angel Platform
              </h1>
              <p className="text-lg sm:text-xl text-white/90">Straightforward angel investing in startups.</p>
              <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <Link href="/signup/?usertype=Investor">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                  Sign up as investor
                </Button></Link>
                <Link href="/signup/?usertype=Startup">
                <Button size="lg" variant="outline" className="text-white bg-white/10 border-white hover:bg-white/10 w-full sm:w-auto">
                  Sign up as startup
                </Button></Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex justify-center lg:justify-end">
              <Card className="p-6 w-full max-w-xs sm:max-w-sm bg-white/10 backdrop-blur border-white/20">
                <div className="text-center space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Interested in becoming an investor?</h3>
                  <p className="text-white/90">Book a free call with one of our experts</p>
                  <Button className="bg-primary hover:bg-primary/90 text-white w-full">Book a Call</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">170+</h3>
              <p className="text-white/70">Rounds funded</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">€30k-800k</h3>
              <p className="text-white/70">Avg. Round size</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">~25.7%</h3>
              <p className="text-white/70">Avg. Return p.a.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="text-gray-500 text-center sm:text-left">VC&apos;s in our network:</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8">
              <Image src="/image.png" alt="" width={150} height={80} className="w-[120px] sm:w-[200px] h-auto" />
              <Image src="/image.png" alt="" width={150} height={80} className="w-[120px] sm:w-[200px] h-auto" />
              <Image src="/image.png" alt="" width={150} height={80} className="w-[120px] sm:w-[200px] h-auto" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
