import HeadingSection from '@/components/common/heading-section';
import { Rocket, BarChart3, Briefcase, Shield, Zap, Sun, Users, Target, Clock } from 'lucide-react';

export default function WhatWeOffer() {
  const features = [
    {
      icon: Shield,
      title: 'Due Diligence Support',
      description:
        'Access comprehensive due diligence reports and expert analysis to make informed investment decisions with confidence.',
      bgColor: 'text-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Zap,
      title: 'Deal Flow Access',
      description:
        'Get early access to pre-vetted startup deals across various sectors, with detailed pitch decks and financial metrics.',
      bgColor: 'text-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      icon: Sun,
      title: 'Portfolio Management',
      description:
        'Track and manage your startup investments with real-time valuations, performance metrics, and exit opportunities.',
      bgColor: 'text-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: Users,
      title: 'Investor Syndication',
      description:
        'Join forces with experienced angel investors to participate in larger deals and share investment expertise.',
      bgColor: 'text-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Target,
      title: 'Investment Analytics',
      description:
        'Access detailed market insights, startup performance metrics, and industry trends to optimize your investment strategy.',
      bgColor: 'text-gray-100',
      iconColor: 'text-gray-600',
    },
    {
      icon: Clock,
      title: 'Deal Pipeline Updates',
      description:
        'Stay informed with regular updates on startup milestones, funding rounds, and potential exit opportunities.',
      bgColor: 'text-yellow-100',
      iconColor: 'text-yellow-500',
    },
  ];

  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <HeadingSection
            title="What we have to offer"
            subtitle="Investly makes angel investing easy and convenient"
          />
        </div>

        <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
          {features.map((feature, index) => (
            <div key={index}>
              <div className="relative flex items-center justify-center mx-auto">
                <svg
                  className={feature.bgColor}
                  width="72"
                  height="75"
                  viewBox="0 0 72 75"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
                </svg>
                <feature.icon className={`absolute w-9 h-9 ${feature.iconColor}`} />
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">{feature.title}</h3>
              <p className="mt-4 text-base text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
