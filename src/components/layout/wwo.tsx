import HeadingSection from '@/components/common/heading-section';
import { Shield, Zap, BarChart3, FileText, Users, Lightbulb, TrendingUp } from 'lucide-react';

export default function WhatWeOffer() {
  const features = [
    {
      icon: Shield,
      title: 'Due Diligence Support',
      description:
        'Our expert team conducts thorough due diligence, analyzing business models, financials, market trends, and legal frameworks to ensure informed investment decisions.',
      bgColor: 'text-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Zap,
      title: 'Deal Flow Access',
      description:
        'As a BAIN investor, you get exclusive access to high-quality, vetted startups. We source promising ventures through our expansive network, ensuring investors see only the best opportunities.',
      bgColor: 'text-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Management',
      description:
        'Post-investment, we help investors track startup performance, provide strategic guidance, and optimize exit strategies—ensuring their capital is effectively utilized for maximum returns.',
      bgColor: 'text-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: FileText,
      title: 'Investment Structuring & Legal Support',
      description:
        'We assist investors and startups in structuring deals, drafting investment agreements, and navigating compliance requirements, ensuring smooth transactions and risk mitigation.',
      bgColor: 'text-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Users,
      title: 'Pitching & Networking Events',
      description:
        'BAIN organizes pitch events, investor roundtables, and mentorship sessions, providing startups with the platform to showcase their ideas while offering investors a structured experience.',
      bgColor: 'text-gray-100',
      iconColor: 'text-gray-600',
    },
    {
      icon: Lightbulb,
      title: 'Post-Investment Support & Mentorship',
      description:
        'Beyond funding, we ensure startups receive the right mentorship, business development support, and market linkages to scale successfully. Investors can also participate in advisory roles.',
      bgColor: 'text-yellow-100',
      iconColor: 'text-yellow-500',
    },
    {
      icon: TrendingUp,
      title: 'Exit Planning & Follow-up Funding',
      description:
        'We help investors and startups strategize profitable exits—whether through acquisitions, follow-on funding, or secondary sales. Our services also assist startups in securing future rounds.',
      bgColor: 'text-pink-100',
      iconColor: 'text-pink-600',
    },
  ];

  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24 text-center">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <HeadingSection
            title="What We Have to Offer"
            subtitle="At Biratnagar Angel Investment Network (BAIN), we go beyond just connecting startups with investors—we provide a structured, de-risked, and value-driven investment experience."
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
