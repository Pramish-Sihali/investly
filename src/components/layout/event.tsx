import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function EventsAndAcademy() {
  const events = [
    {
      date: '17',
      month: 'FEB',
      title: 'Investor Readiness Session (Online Workshop for Startup Founders)',
      time: '03:00 PM',
    },
    {
      date: '19',
      month: 'FEB',
      title: 'Round Table Session - One Hour Version (Online Event for Investors and Startups)',
      time: '03:00 PM',
    },
  ];

  return (
    <section className="bg-gray-900 min-h-screen py-16">
      <div className="container mx-auto max-w-[1400px] px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-24">
          {/* Left Section - Events */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-12">Investly events</h2>

            <div className="space-y-4 mb-12">
              {events.map((event, index) => (
                <Card key={index} className="bg-white hover:bg-gray-50 transition-colors">
                  <CardContent className="flex flex-col sm:flex-row items-start gap-6 p-6">
                    <div className="text-center sm:text-left">
                      <div className="text-xl font-bold text-[#FF6B35]">{event.date}</div>
                      <div className="text-sm text-gray-500">{event.month}</div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-500">{event.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-8">
              <p className="text-gray-400 max-w-lg">
                No time spent networking with startups outside of your interests, and no time wasted
                handling the paperwork.
              </p>

              <div>
                <Link href="/events">
                  <Button
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white/10"
                  >
                    View events
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section - Academy */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-12">Visit our Academy</h2>

            <div className="relative mb-12">
              <Card className="bg-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Startup Survival Guide</h3>
                  <p className="text-gray-600 mb-6">
                    Our Startup Survival Guide blog series helps you find investors & t...
                  </p>
                  <Link href="/academy">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Read 43 articles
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Decorative cards */}
            </div>

            <div className="space-y-8">
              <p className="text-gray-400 max-w-lg">
                Learn handling investment and funding and utilizing the platform of Investly to its
                full potential.
              </p>

              <div>
                <Link href="/academy">
                  <Button
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Visit academy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
