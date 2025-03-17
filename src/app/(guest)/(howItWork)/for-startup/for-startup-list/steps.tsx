'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import React, { useRef, useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';

const StartupPage = () => {
  const steps = [
    {
      id: 1,
      title: 'Submit Your Application',
      description: `Start your journey with BAIN by submitting your startup application. Our streamlined process helps us understand your business model, market opportunity, and growth potential.

The application process is designed to be comprehensive yet straightforward. You'll provide essential information about your startup, including your business model, target market, current stage, and funding needs. This helps us assess how we can best support your growth journey.

Our team reviews each application carefully, focusing on innovation potential, market opportunity, and team capabilities. We look for startups that demonstrate strong potential for growth and a clear path to market success.`,
      image: '/startup.png',
    },
    {
      id: 2,
      title: 'Due Diligence & Review',
      description: `Our expert team conducts thorough due diligence to evaluate your startup's potential and ensure alignment with our network's investment criteria.

The due diligence process is comprehensive but efficient. We examine everything from your business model and market opportunity to your team's capabilities and financial projections. This thorough review helps us understand your startup's strengths and areas for growth.

We also assess your startup's readiness for investment, looking at factors such as market validation, customer traction, and scalability potential. This evaluation helps us match you with the right investors and resources.`,
      image: '/startup1.png',
    },
    {
      id: 3,
      title: 'Network Access & Support',
      description: `Once approved, you gain access to our extensive network of angel investors, mentors, and industry experts who can help accelerate your growth.

BAIN provides more than just funding opportunities. You'll get access to our comprehensive support ecosystem, including mentorship from experienced entrepreneurs, industry experts, and successful investors. Our network can help you with everything from strategic planning to market expansion.

We also offer various resources and tools to help you scale your business, including pitch deck templates, financial modeling guides, and market research reports. Our goal is to provide you with everything you need to succeed.`,
      image: '/startup2.png',
    },
    {
      id: 4,
      title: 'Pitch & Fundraise',
      description: `Present your startup to our network of investors through our structured pitch events and one-on-one meetings.

Our pitch events are designed to showcase your startup in the best possible light. You'll have the opportunity to present your business model, growth strategy, and funding needs to a curated audience of interested investors. These events are interactive, allowing for meaningful discussions and immediate feedback.

Beyond formal pitches, we facilitate direct connections with investors who align with your vision. Our team helps prepare you for these meetings, ensuring you present your startup effectively and answer investor questions confidently.`,
      image: '/startup3.png',
    },
    {
      id: 5,
      title: 'Growth & Scale',
      description: `With funding secured, continue to leverage our network and resources to scale your business and achieve your growth objectives.

Post-investment, BAIN remains committed to your success. We provide ongoing support through regular check-ins, strategic guidance, and access to additional resources as your startup grows. Our network can help you with everything from hiring talent to expanding into new markets.

We also facilitate connections with potential partners, customers, and advisors who can help accelerate your growth. Our goal is to be a long-term partner in your startup's journey to success.`,
      image: '/startup4.png',
    },
  ];

  const [activeStep, setActiveStep] = useState(1);
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < stepRefs.current.length; i++) {
        const step = stepRefs.current[i];
        if (step) {
          const stepTop = step.offsetTop;
          const stepBottom = stepTop + step.offsetHeight;

          if (scrollPosition >= stepTop && scrollPosition < stepBottom) {
            setActiveStep(i + 1);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToStep = (stepId: number) => {
    const step = stepRefs.current[stepId - 1];
    if (step) {
      step.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleExpand = (stepId: number) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const getFirstParagraph = (description: string) => description.split('\n\n')[0];

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="flex items-center justify-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-base font-medium text-gray-900">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-base font-medium text-gray-500">
                Startup Guide
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header Section */}
        <div className="max-w-xl mx-auto text-center mt-8">
          <motion.div variants={fadeIn}>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
              How to Raise Funds for Your Startup
            </h1>
            <p className="text-lg text-gray-600">
              BAIN connects promising startups with angel investors, providing the resources and
              support you need to scale your business.
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 mt-12 lg:grid-cols-12 lg:gap-x-8 gap-y-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 lg:self-start lg:sticky lg:top-20">
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
                <ul className="flex flex-col space-y-2">
                  {steps.map((step) => (
                    <motion.li
                      key={step.id}
                      whileHover={{ x: 4 }}
                      className={`cursor-pointer transition-all duration-200 rounded-lg ${
                        activeStep === step.id
                          ? 'bg-primary text-white shadow-sm'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => scrollToStep(step.id)}
                    >
                      <div className="flex items-center gap-3 p-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            activeStep === step.id
                              ? 'bg-white/20 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <span className="font-bold">{step.id}</span>
                        </div>
                        <span className="text-sm font-medium">{step.title}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-16"
              >
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-0">
                    <div className="aspect-w-16 aspect-h-9 mb-6">
                      <img
                        src={step.image}
                        alt={`Step ${step.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                          <span className="font-bold">{step.id}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                      </div>
                      <div className="prose max-w-none">
                        <p className="text-gray-600">
                          {expandedSteps[step.id]
                            ? step.description
                            : getFirstParagraph(step.description)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleExpand(step.id)}
                        className="mt-4 text-primary font-semibold flex items-center gap-2 hover:text-primary/80 transition-colors"
                      >
                        {expandedSteps[step.id] ? 'Show Less' : 'Read More'}
                        <ChevronDownIcon
                          className={`w-4 h-4 transform transition-transform ${
                            expandedSteps[step.id] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Social Share Sidebar */}
          <div className="lg:col-span-3 lg:self-start lg:sticky lg:top-20">
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share</h3>
                <ul className="flex lg:flex-row items-center space-x-4">
                  <li>
                    <FacebookShareButton
                      title="Check out this amazing guide for startups on BAIN!"
                      url={typeof window !== 'undefined' ? window.location.href : ''}
                      className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
                    >
                      <FacebookIcon size={24} round />
                    </FacebookShareButton>
                  </li>
                  <li>
                    <TwitterShareButton
                      url={typeof window !== 'undefined' ? window.location.href : ''}
                      title="Check out this amazing guide for startups on BAIN!"
                      className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
                    >
                      <TwitterIcon size={24} round />
                    </TwitterShareButton>
                  </li>
                  <li>
                    <LinkedinShareButton
                      url={typeof window !== 'undefined' ? window.location.href : ''}
                      title="Check out this amazing guide for startups on BAIN!"
                      className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
                    >
                      <LinkedinIcon size={24} round />
                    </LinkedinShareButton>
                  </li>
                  <li>
                    <WhatsappShareButton
                      url={typeof window !== 'undefined' ? window.location.href : ''}
                      title="Check out this amazing guide for startups on BAIN!"
                      className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
                    >
                      <WhatsappIcon size={24} round />
                    </WhatsappShareButton>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupPage;
