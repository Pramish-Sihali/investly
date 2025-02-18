import { Rocket, BarChart3, Briefcase } from 'lucide-react';
import HeadingSection from '@/components/common/heading-section';

export default function WhatWeOffer() {
  const features = [
    {
      icon: BarChart3,
      title: 'Everything in one place',
      description:
        'No time wasted handling legal paperwork, and plenty of deals available for you to choose.',
    },
    {
      icon: Rocket,
      title: 'Make a difference',
      description:
        'Build a relationship with your startups, and add value from your experience and network.',
    },
    {
      icon: Briefcase,
      title: 'Safe & Secure',
      description:
        "Full secure payment environment, refund if the startup doesn't complete sufficient fundraising.",
    },
  ];

  return (
    <section className="py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <HeadingSection
            title="What we have to offer"
            subtitle="Investly makes angel investing easy and convenient"
          />
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
