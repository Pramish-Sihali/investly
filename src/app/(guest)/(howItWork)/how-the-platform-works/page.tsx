import React from 'react';
import Image from 'next/image';
import { Rocket, BarChart3, Briefcase } from 'lucide-react';
import HeadingSection from '@/components/common/heading-section';

const HowThePlatformWorks: React.FC = () => {
  const platformSteps = [
    {
      title: 'Create Your Account',
      description:
        'Sign up easily using your email or LinkedIn. Join our community of forward-thinking investors.',
      icon: BarChart3,
    },
    {
      title: 'Explore Investment Opportunities',
      description:
        'Browse through carefully vetted startup investment opportunities across various sectors.',
      icon: Rocket,
    },
    {
      title: 'Due Diligence',
      description:
        'Access comprehensive startup profiles, financial documents, and investor insights.',
      icon: Briefcase,
    },
    {
      title: 'Invest Securely',
      description:
        'Make investments with confidence using our secure, transparent investment process.',
      icon: BarChart3,
    },
  ];

  const communityEvents = [
    {
      title: 'Investor Readiness Sessions',
      description:
        'Online workshops designed to help startup founders understand investor perspectives and refine their pitches.',
    },
    {
      title: 'Round Table Sessions',
      description:
        'Live online events connecting investors with promising startups, fostering direct communication and networking.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <HeadingSection
          title="How the platform work"
          subtitle="Democratizing startup investments by providing a transparent, user-friendly platform that connects passionate investors with innovative startups."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {platformSteps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="flex justify-center mb-6">
                {typeof step.icon === 'string' ? (
                  <Image src={step.icon} alt={step.title} width={80} height={80} className="mb-4" />
                ) : (
                  <step.icon className="mb-4" width={80} height={80} />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-4">{`${index + 1}. ${step.title}`}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Community Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {communityEvents.map((event) => (
              <div
                key={event.title}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-semibold mb-4">{event.title}</h3>
                <p className="text-gray-600 mb-6">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowThePlatformWorks;
