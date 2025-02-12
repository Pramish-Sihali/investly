import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BarChart3, Rocket, Briefcase } from "lucide-react"

const HowThePlatformWorks: React.FC = () => {
  const platformSteps = [
    {
      title: 'Create Your Account',
      description: 'Sign up easily using your email or LinkedIn. Join our community of forward-thinking investors.',
      icon: BarChart3
    },
    {
      title: 'Explore Investment Opportunities',
      description: 'Browse through carefully vetted startup investment opportunities across various sectors.',
      icon: Rocket
    },
    {
      title: 'Due Diligence',
      description: 'Access comprehensive startup profiles, financial documents, and investor insights.',
      icon: Briefcase
    },
    {
      title: 'Invest Securely',
      description: 'Make investments with confidence using our secure, transparent investment process.',
      icon: BarChart3
    }
  ];

  const communityEvents = [
    {
      title: 'Investor Readiness Sessions',
      description: 'Online workshops designed to help startup founders understand investor perspectives and refine their pitches.',
      link: '/events/investor-readiness'
    },
    {
      title: 'Round Table Sessions',
      description: 'Live online events connecting investors with promising startups, fostering direct communication and networking.',
      link: '/events/round-table'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6 text-primary">How Investly Works</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Democratizing startup investments by providing a transparent, user-friendly platform that connects passionate investors with innovative startups.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-12">Investment Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {platformSteps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="flex justify-center mb-6">
                {typeof step.icon === 'string' ? (
                  <Image 
                    src={step.icon} 
                    alt={step.title} 
                    width={80} 
                    height={80} 
                    className="mb-4"
                  />
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
          <div className="grid md:grid-cols-2 gap-8">
            {communityEvents.map((event) => (
              <div 
                key={event.title} 
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-semibold mb-4">{event.title}</h3>
                <p className="text-gray-600 mb-6">{event.description}</p>
                <Link 
                  href={event.link} 
                  className="inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center mt-16">
        <h2 className="text-3xl font-semibold mb-6">Ready to Start Investing?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of investors discovering and supporting the next generation of innovative startups.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/signup" 
            className="bg-primary text-white px-8 py-4 rounded-full text-lg hover:bg-primary-dark transition-colors"
          >
            Create Account
          </Link>
          <Link 
            href="/login" 
            className="border-2 border-primary text-primary px-8 py-4 rounded-full text-lg hover:bg-primary-light transition-colors"
          >
            Log In
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowThePlatformWorks;