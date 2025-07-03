'use client';

import Link from 'next/link';
import Image from 'next/image';

const Hero = () => (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-blue-50 opacity-20 lg:block hidden" />
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="transition-all duration-1000 ease-out transform">
          <div className="flex min-h-[80vh] flex-col lg:flex-row lg:items-center lg:gap-12">
            {/* Hero Text Content - Enhanced with animations */}
            <div className="relative z-10 flex flex-col justify-center py-8 lg:w-[45%] lg:py-0">
              <h1 className="bg-gradient-to-r from-primary to-[#467FB2] bg-clip-text text-transparent text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl mb-3">
                Biratnagar Angel Investment Network.
              </h1>
              <p className="mt-2 text-xl text-gray-900 sm:text-2xl lg:text-2xl">
                Where Vision Meets Capital.
              </p>
              <p className="mt-4 text-gray-600 text-base max-w-md">
                Connecting innovative startups with strategic investors to fuel the next
                generation of groundbreaking companies.
              </p>

              {/* Call-to-action buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/for-investor">
                  <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    For Startups
                  </button>
                </Link>
                <Link href="/for-startup">
                  <button className="border border-primary text-primary hover:bg-primary/5 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                    For Investors
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile Image with Interactive Stats */}
            <div className="relative mt-8 mb-10 mx-auto w-full hidden max-w-sm lg:hidden">
              <div className="relative h-[300px] w-full rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/landing.png"
                  alt="Business Meeting"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Mobile Stat Cards - Interactive on hover/tap */}
              <div className="absolute left-4 right-4 bottom-6 flex justify-between">
                <div className="rounded-lg bg-white p-4 shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="text-2xl font-bold text-primary">5,000</div>
                  <div className="text-xs text-gray-800">funded startups</div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="text-2xl font-bold text-primary">600Cr</div>
                  <div className="text-xs text-gray-800">combined valuation</div>
                </div>
              </div>
            </div>

            {/* Desktop Image and Interactive Stats */}
            <div className="relative hidden lg:block lg:w-[50%]">
              <div className="relative h-[350px] w-full lg:h-[500px]">
                <Image
                  src="/landing.png"
                  alt="Business Meeting"
                  fill
                  className="rounded-2xl object-cover shadow-xl"
                  priority
                />

                {/* Animated stat cards with hover effects */}
                <div className="absolute left-[-100px] top-24 z-20 flex flex-col gap-8">
                  <div className="transform rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-primary">5,000</div>
                        <div className="mt-1 text-sm text-gray-600">funded startups</div>
                      </div>
                    </div>
                  </div>

                  <div className="transform rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-primary">600Cr</div>
                        <div className="mt-1 text-sm text-gray-600">combined valuation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute bottom-0 left-0 w-full h-16 bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
      />
    </section>
  );

export default Hero;