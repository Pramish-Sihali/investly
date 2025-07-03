'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LineChart, GraduationCap, User } from 'lucide-react';

export default function WhyBain() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-base font-medium text-gray-500">
                <Link href="/" className="hover:text-primary">
                  BAIN
                </Link>{' '}
                › Why BAIN
              </p>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Why Choose <span className="text-primary">BAIN</span>?
            </motion.h1>

            {/* Hero Image */}
            <div className="mt-12 sm:mt-16 aspect-w-16 aspect-h-9 lg:aspect-h-6">
              <Image
                src="/blog1.png"
                alt="Investment Growth"
                width={1200}
                height={675}
                className="object-cover w-full h-full rounded-xl"
              />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 mt-12 sm:mt-16 lg:grid-cols-12 lg:gap-x-16 gap-y-8">
              {/* Left Column - Introduction */}
              <div className="lg:col-span-5">
                <p className="text-lg font-bold text-gray-900 lg:text-xl text-justify">
                  At Biratnagar Angel Investment Network (BAIN), we go beyond traditional angel
                  investing - we are building a movement to redefine early-stage investing in Nepal.
                  Here what makes BAIN stand out from the rest:
                </p>
              </div>

              {/* Right Column - Features */}
              <div className="lg:col-span-7 space-y-8">
                {/* Feature Cards */}
                {[
                  {
                    icon: <User className="w-8 h-8" />,
                    title: 'Not Just Investors - A Startup Growth Partner',
                    description:
                      'At Biratnagar Angel Investment Network (BAIN), we go beyond funding. We co-build startups, offering hands-on mentorship, strategic guidance, and long-term growth support. Unlike traditional investor networks that just write checks, we invest in potential and nurture it into success.',
                  },
                  {
                    icon: <LineChart className="w-8 h-8" />,
                    title: 'Beyond Capital - Smart Money, Smart Network',
                    description:
                      'We believe that money alone doesn grow startups-the right network does. BAIN connects founders with investors who bring not just funds, but also industry expertise, strategic partnerships, and market access.',
                  },
                  {
                    icon: <GraduationCap className="w-8 h-8" />,
                    title: 'Nepals First Regional Angel Network with a Localized Edge',
                    description:
                      'Unlike generic national or global networks, BAIN is rooted in Nepals; emerging startup landscape, with a special focus on Biratnagar and regional innovation hubs. We understand local market challenges, untapped opportunities, and regulatory nuances, making our support uniquely effective.',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 p-8 rounded-xl transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-primary">{feature.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                        <p className="mt-2 text-gray-600 text-justify">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Call to Action */}
                <div className="bg-primary/5 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold text-primary mb-4">Join BAIN Today</h3>
                  <p className="text-gray-600 mb-6">
                    Whether youre a founder looking for smart capital or an investor seeking
                    high-potential opportunities, BAIN is where innovation meets investment.
                  </p>
                  <Link
                    href="/signup"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
