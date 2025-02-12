import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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
          <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
            {/* Left Column */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Europe&apos;s leading
                <br />
                Angel Platform
              </h1>
              <p className="text-xl text-white/90">Straightforward angel investing in startups.</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Sign up as investor
                </Button>
                <Button size="lg" variant="outline" className="text-white bg-white/10 border-white hover:bg-white/10">
                  Sign up as startup
                </Button>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex justify-end">
              <Card className="p-6 w-full max-w-sm bg-white/10 backdrop-blur border-white/20">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-white">Interested in becoming an investor?</h3>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-white">170+</h3>
              <p className="text-white/70">Rounds funded</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-white">€30k-800k</h3>
              <p className="text-white/70">Avg. Round size</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-white">~25.7%</h3>
              <p className="text-white/70">Avg. Return p.a.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-8">
            <p className="text-gray-500">VC's in our network:</p>
            <div className="flex flex-wrap items-center gap-8">
              <Image src="/image.png" alt="" width={200} height={100} />
              <Image src="/image.png" alt="" width={200} height={100} />
              <Image src="/image.png" alt="" width={200} height={100} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

