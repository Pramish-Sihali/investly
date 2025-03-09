'use client';

import { motion } from 'framer-motion';
import { fadeIn, slideIn } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import React, { useRef, useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Startup = () => {
  const steps = [
    {
      id: 1,
      title: 'Application & Screening',
      description: `Submit your business plan, pitch deck, and financial projections through our online portal. Our team will screen your application based on innovation, scalability, and market potential.`,
      image: '/startup1.png',
    },
    {
      id: 2,
      title: 'Initial Evaluation & Feedback',
      description: `If shortlisted, you’ll receive feedback and may be invited to participate in a preliminary evaluation session, helping you refine your pitch and strategy.`,
      image: '/startup2.png',
    },
    {
      id: 3,
      title: 'Pitching & Investor Interaction',
      description: `Present your startup at our exclusive pitch events, where you’ll have the opportunity to interact directly with angel investors. This stage is designed to foster meaningful dialogue and build investor confidence.`,
      image: '/startup.png',
    },
    {
      id: 4,
      title: 'Due Diligence & Investment Process',
      description: `Once interest is confirmed, your startup undergoes a thorough due diligence process. Our support team assists in preparing all necessary documentation and facilitating transparent negotiations.`,
      image: '/start.png',
    },
    {
      id: 5,
      title: 'Post-Investment Growth Support',
      description: `After securing investment, leverage our ongoing support services. From strategic mentoring and operational advice to networking opportunities, we help you scale your business for long-term success.`,
      image: '/start2.png',
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

  const getFirstParagraph = (description: string) => {
    const words = description.split(' ');
    return words.slice(0, 100).join(' ') + '...';
  };

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="#" className="text-base font-medium text-gray-900">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-gray-900 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-2 text-base font-medium text-gray-500">Startup Guide</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="max-w-xl mx-auto text-center mt-8">
          <motion.div variants={fadeIn}>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
              Raise Funding with BAIN
            </h1>
            <p className="text-lg text-gray-600">
              Using BAIN instruments, entrepreneurs can connect with investors, access tested legal
              documentation, and find guidance as they seek seed financing or later rounds of
              funding.
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 mt-12 lg:grid-cols-12 lg:gap-x-12 gap-y-8">
          {/* Sidebar */}
          <div className="lg:col-span-2 lg:self-start lg:sticky lg:top-6">
            <ul className="flex flex-col space-y-4">
              {steps.map((step) => (
                <motion.li
                  key={step.id}
                  whileHover={{ x: 4 }}
                  className={`cursor-pointer transition-all duration-200 p-3 rounded-lg ${
                    activeStep === step.id ? 'bg-primary text-white' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => scrollToStep(step.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{step.id}</span>
                    <span>{step.title}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
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
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-w-16 aspect-h-9 mb-6">
                      <img
                        src={step.image}
                        alt={`Step ${step.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white relative z-10">
                            {step.id}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-primary">Step {step.id}</h3>
                          <h2 className="text-2xl font-extrabold text-gray-900">{step.title}</h2>
                        </div>
                      </div>
                      <div className="prose max-w-none">
                        <p className="text-gray-600 leading-relaxed text-justify">
                          {expandedSteps[step.id]
                            ? step.description
                            : getFirstParagraph(step.description)}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleExpand(step.id)}
                        className="mt-6 flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity"
                      >
                        {expandedSteps[step.id] ? (
                          <>
                            Show Less
                            <ChevronDownIcon className="w-4 h-4 transform rotate-180" />
                          </>
                        ) : (
                          <>
                            Read More
                            <ChevronDownIcon className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Social Share Sidebar */}
          <div className="lg:col-span-2 lg:self-start lg:sticky lg:top-6">
            <ul className="flex lg:flex-col items-center space-y-4">
              <li>
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Startup;
