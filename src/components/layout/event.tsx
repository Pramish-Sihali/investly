import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function EventsAndAcademy() {
  const events = [
    {
      date: "17",
      month: "FEB",
      title: "Investor Readiness Session (Online Workshop for Startup Founders)",
      time: "03:00 PM",
    },
    {
      date: "19",
      month: "FEB",
      title: "Round Table Session - One Hour Version (Online Event for Investors and Startups)",
      time: "03:00 PM",
    },
  ]

  return (
    <section className="bg-slate-900 min-h-screen">
      <div className="container mx-auto max-w-[1400px] px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
          {/* Left Section - Events */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-12">Leapfunder events</h2>

            <div className="space-y-4 mb-12">
              {events.map((event, index) => (
                <Card key={index} className="bg-white hover:bg-gray-50 transition-colors">
                  <CardContent className="flex items-start gap-6 p-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-[#FF6B35]">{event.date}</div>
                      <div className="text-sm text-gray-500">{event.month}</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-500">{event.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-8">
              <p className="text-gray-400 max-w-lg">
                No time spent networking with startups outside of your interests, and no time wasted handling the
                paperwork.
              </p>

              <div>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  View events
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section - Academy */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-12">Visit our Academy</h2>

            <div className="relative">
              <Card className="bg-white mb-12">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Startup Survival Guide</h3>
                  <p className="text-gray-600 mb-6">
                    Our Startup Survival Guide blog series helps you find investors & t...
                  </p>
                  <Button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white">Read 43 articles</Button>
                </CardContent>
              </Card>

              {/* Decorative cards */}
              <div className="absolute -right-4 top-4 w-full h-full">
                <div className="bg-gray-200 rounded-lg w-full h-full -z-10" />
              </div>
              <div className="absolute -right-8 top-8 w-full h-full">
                <div className="bg-gray-300 rounded-lg w-full h-full -z-20" />
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-gray-400 max-w-lg">
                Learn handling investment and funding and utilizing the platform of leapfunder to its full potential.
              </p>

              <div>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  Visit academy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

