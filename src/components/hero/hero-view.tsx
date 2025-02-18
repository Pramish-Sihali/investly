import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[80vh] flex-col lg:flex-row lg:items-center lg:gap-12">
            {/* Left Column */}
            <div className="relative z-10 flex flex-col justify-center py-12 lg:w-[45%] lg:py-0">
              <h1 className="text-[2.75rem] font-bold leading-tight text-[#FF6B3D] sm:text-6xl lg:text-7xl">
                Investly
              </h1>
              <p className="mt-3 text-2xl text-gray-900 sm:text-3xl lg:text-[2rem]">
                Nepal leading Angel Platform
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 mt-5">
                <Link href="/signup/?usertype=Investor">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
                  >
                    Sign up as investor
                  </Button>
                </Link>
                <Link href="/signup/?usertype=Startup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-black bg-white/10 border-white hover:bg-white/10 w-full sm:w-auto border-gray "
                  >
                    Sign up as startup
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column with Image and Stats (Hidden on mobile) */}
            <div className="relative hidden lg:block lg:w-[55%]">
              <div className="relative h-[300px] w-full lg:h-[500px]">
                <Image
                  src="/landing.png"
                  alt="YC Presentation"
                  fill
                  className="rounded-2xl object-cover shadow-lg"
                  priority
                />
                {/* Stat Cards */}
                <div className="absolute left-0 top-24 z-20 flex flex-col gap-10 bg-gray">
                  <div className="absolute left-[-100px] z-20 flex flex-col gap-10">
                    <div className="transform rounded-2xl bg-white p-6 shadow-lg transition-transform hover:-translate-y-1">
                      <div className="text-4xl font-bold text-[#FF6B3D] sm:text-5xl">5,000</div>
                      <div className="mt-1 text-base text-gray-800 sm:text-lg">funded startups</div>
                    </div>
                    <div className="transform rounded-2xl bg-white p-6 shadow-lg transition-transform hover:-translate-y-1">
                      <div className="text-4xl font-bold text-[#FF6B3D] sm:text-5xl">600Cr</div>
                      <div className="mt-1 text-base text-gray-800 sm:text-md">
                        combined valuation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            Top YC companies
          </h2>
          <div className="mt-12 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center justify-center px-4 py-2">
                <div className="relative h-8 w-full">
                  <Image
                    src={`/${company.logo}`} // Updated to use actual images
                    alt={company.name}
                    width={company.width}
                    height={32}
                    className="object-contain opacity-70 transition-opacity hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const companies = [
  { name: 'Stripe', logo: 'logo.png', width: 100 },
  { name: 'Airbnb', logo: 'logo.png', width: 120 },
  { name: 'Instacart', logo: 'logo.png', width: 130 },
  { name: 'DoorDash', logo: 'logo.png', width: 140 },
  { name: 'Cruise', logo: 'logo.png', width: 110 },
  { name: 'Twitch', logo: 'logo.png', width: 100 },
  { name: 'Coinbase', logo: 'logo.png', width: 130 },
  { name: 'PagerDuty', logo: 'logo.png', width: 140 },
];
