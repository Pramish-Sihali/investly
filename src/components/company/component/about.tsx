import type { Metadata } from 'next';

import Image from 'next/image';
import HeadingSection from '@/components/common/heading-section';

export const metadata: Metadata = {
  title: 'About BAIN | Biratnagar Angel Investment Network',
  description:
    'Learn about BAINs commitment to fostering early-stage investments in Nepal and connecting startups with experienced investors.',
};

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero Section */}
      <HeadingSection
        title="About Us"
        subtitle="Biratnagar Angel Investment Network (BAIN) is a pioneering platform dedicated to fostering early-stage investments in Nepal."
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/about1.png"
            alt="BAIN Investment Platform"
            fill
            className="object-cover"
            quality={95}
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Connecting Startups & Investors</h2>
          <p className="text-muted-foreground text-justify">
            As the first structured angel investor network in Biratnagar, we connect high-potential
            startups with experienced investors who provide not just capital but also mentorship,
            strategic guidance, and industry expertise. Our goal is to strengthen Nepal’s startup
            ecosystem by bridging the gap between innovative entrepreneurs and visionary investors.
          </p>
        </div>
      </div>

      {/* Angel Investment Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <h2 className="text-3xl font-semibold">The Context of Angel Investment</h2>
          <p className="text-muted-foreground text-justify">
            Angel investment refers to early-stage funding provided by high-net-worth individuals or
            experienced entrepreneurs who believe in supporting promising startups. Angel investment
            plays a crucial role in fueling startup growth, especially in markets like Nepal, where
            access to traditional financing remains limited for early-stage businesses.
          </p>
          <p className="text-muted-foreground text-justify">
            Unlike banks, venture capital, or private equity firms, angel investors use their own
            funds to invest in promising startups, often in exchange for equity. They bring more
            than just money—they offer mentorship, networks, and business acumen to help startups
            scale.
          </p>
        </div>
        <div className="order-1 md:order-2 relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/about.png"
            alt="Angel Investment"
            fill
            className="object-cover"
            quality={95}
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-semibold">Join Us</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
          At BAIN, we believe in unlocking the potential of Nepal’s entrepreneurs by providing them
          with the right resources, guidance, and investment opportunities. Whether you are a
          startup seeking funding or an investor looking for high-growth opportunities, BAIN is the
          platform that connects ideas with capital and expertise.
        </p>
        <p className="mt-6 text-lg font-semibold">
          Join us in shaping the future of entrepreneurship in Nepal!
        </p>
      </div>
    </div>
  );
}
