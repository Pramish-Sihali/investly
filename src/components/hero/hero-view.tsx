'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default value

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle company logo carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 8 : 4);
    };

    updateItemsPerPage(); // Set initial value
    window.addEventListener('resize', updateItemsPerPage); // Update on resize

    return () => {
      window.removeEventListener('resize', updateItemsPerPage); // Cleanup
    };
  }, []);

  // Switch to visible companies based on active index
  const getVisibleCompanies = () => {
    const start = activeIndex * itemsPerPage;
    return companies.slice(start, start + itemsPerPage);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
        <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-blue-50 opacity-20 lg:block hidden" />
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
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
                    <button className="border-2 border-primary text-primary hover:bg-primary/5 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1">
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

      {/* Enhanced Companies Section with Carousel */}
      <section className="py-16 bg-white sm:py-20 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-y-12 sm:gap-x-12">
            {/* Left Column - Enhanced */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="inline-block mb-3 px-4 py-1 bg-blue-50 text-primary rounded-full text-sm font-medium">
                Our Network
              </div>
              <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl lg:text-5xl lg:leading-tight">
                Partner
                <br className="hidden sm:inline" />
                Companies
                <br className="hidden sm:inline" />
                We Work With
              </h2>
              <p className="mt-5 text-base text-gray-600 mx-auto max-w-md lg:mx-0 lg:max-w-none">
                Join our platform to connect with leading companies and be part of the next big
                thing in the startup ecosystem.
              </p>

              {/* Added CTA */}
              <button className="mt-6 inline-flex items-center text-primary font-medium hover:text-blue-700 transition-colors">
                Join our network
                <svg
                  className="ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
            <div className="lg:col-span-3 xl:col-span-4 w-full">
              <div className="grid items-center grid-cols-2 mx-auto gap-8 sm:gap-x-12 sm:gap-y-16 lg:grid-cols-4">
                {getVisibleCompanies().map((company, index) => (
                  <div key={index} className="flex justify-center items-center group">
                    <div className="relative p-4 rounded-lg transition-all duration-300 hover:bg-gray-50 w-full h-full flex items-center justify-center group-hover:shadow-md">
                      <Image
                        src={`/${company.logo}`}
                        alt={company.name}
                        width={company.width}
                        height={32}
                        className="object-contain h-8 mx-auto opacity-70 transition-opacity group-hover:opacity-100"
                      />
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {company.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Navigation Dots */}
              <div className="flex items-center justify-center mt-10 space-x-3">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'bg-primary w-6' : 'bg-gray-300'
                    }`}
                    aria-label={`View page ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sample company data
const companies = [
  { name: 'Stripe', logo: 'logo.png', width: 100 },
  { name: 'Airbnb', logo: 'logo.png', width: 120 },
  { name: 'Instacart', logo: 'logo.png', width: 130 },
  { name: 'DoorDash', logo: 'logo.png', width: 140 },
  { name: 'Cruise', logo: 'logo.png', width: 110 },
  { name: 'Twitch', logo: 'logo.png', width: 100 },
  { name: 'Coinbase', logo: 'logo.png', width: 130 },
  { name: 'PagerDuty', logo: 'logo.png', width: 140 },
  { name: 'Asana', logo: 'logo.png', width: 120 },
  { name: 'Slack', logo: 'logo.png', width: 130 },
  { name: 'Dropbox', logo: 'logo.png', width: 120 },
  { name: 'Zoom', logo: 'logo.png', width: 100 },
];
