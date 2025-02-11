import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const InvestorMatchingProgram: React.FC = () => {
  const programStages = [
    {
      title: 'Initial Assessment',
      description: 'Our team conducts a comprehensive evaluation of your startup\'s potential, market fit, and investment readiness.',
      icon: '/icons/assessment.svg'
    },
    {
      title: 'Investor Profiling',
      description: 'We create a detailed investor profile matching your startup\'s unique needs with the right investor network.',
      icon: '/icons/profiling.svg'
    },
    {
      title: 'Coaching & Preparation',
      description: 'Receive personalized coaching to refine your pitch, financial models, and investor presentation.',
      icon: '/icons/coaching.svg'
    },
    {
      title: 'Investor Introductions',
      description: 'Direct introductions to carefully selected investors who align with your startup\'s vision and growth potential.',
      icon: '/icons/introductions.svg'
    }
  ];

  const benefitsOfProgram = [
    {
      title: 'Targeted Matching',
      description: 'Precision-matched with investors who have expertise in your industry and investment thesis.',
      icon: '/icons/target.svg'
    },
    {
      title: 'Comprehensive Support',
      description: '30-90 days of dedicated support to prepare and position your startup for successful fundraising.',
      icon: '/icons/support.svg'
    },
    {
      title: 'Network Expansion',
      description: 'Access to an exclusive network of angel investors, venture capitalists, and strategic partners.',
      icon: '/icons/network.svg'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Investly Investor Matching Program</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Bridging innovative startups with the right investors through a comprehensive, personalized matching process.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Matching Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {programStages.map((stage, index) => (
            <div key={stage.title} className="text-center">
              <div className="flex justify-center mb-6">
                <Image 
                  src={stage.icon} 
                  alt={stage.title} 
                  width={80} 
                  height={80} 
                  className="mb-4"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{`${index + 1}. ${stage.title}`}</h3>
              <p className="text-gray-600">{stage.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Program Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefitsOfProgram.map((benefit) => (
              <div 
                key={benefit.title} 
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all text-center"
              >
                <div className="flex justify-center mb-6">
                  <Image 
                    src={benefit.icon} 
                    alt={benefit.title} 
                    width={64} 
                    height={64} 
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center mt-16">
        <h2 className="text-3xl font-semibold mb-6">Ready to Find Your Perfect Investors?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join our Investor Matching Program and take the first step towards securing the right funding for your startup.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/signup?type=startup" 
            className="bg-primary text-white px-8 py-4 rounded-full text-lg hover:bg-primary-dark transition-colors"
          >
            Apply Now
          </Link>
          <Link 
            href="/contact" 
            className="border-2 border-primary text-primary px-8 py-4 rounded-full text-lg hover:bg-primary-light transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section className="mt-16 bg-blue-50 p-12 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Commitment</h2>
          <p className="text-xl text-gray-700">
            We don't just match startups with investors. We provide a holistic support system that prepares your startup 
            for successful fundraising, helping you build compelling narratives and robust investment strategies.
          </p>
        </div>
      </section>
    </div>
  );
};

export default InvestorMatchingProgram;