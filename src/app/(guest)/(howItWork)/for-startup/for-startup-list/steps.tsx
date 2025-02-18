'use client';

import { Card, CardContent } from '@/components/ui/card';
import React, { useRef, useState, useEffect } from 'react';
import HeadingSection from '@/components/common/heading-section';

const Startup = () => {
  const steps = [
    {
      id: 1,
      title: 'Information Memorandum',
      description:
        'To attract investments through Leapfunder, you need a well-structured plan in the form of an Information Memorandum (IM). This document serves as the foundation of your investment round, outlining your business plan, anticipated risks, and detailed financial terms. Additionally, before launching your Leapfunder campaign, you must establish a legal entity in your jurisdiction, such as a B.V., U.G., AB, or IVS. Once your campaign begins, you can start securing investments, often using a convertible note known as the Leapfunder Note, which offers key features that attract potential investors. Leapfunder also provides guidance in drafting the Information Memorandum and structuring the campaign effectively.The Information Memorandum is a crucial document that provides investors with an honest and detailed representation of your business and investment opportunity. It should include a description of your product or service, the market landscape, and the competition. Additionally, it must outline your achievements so far, introduce your team, present a strong financial plan, and highlight potential risks. To ensure transparency and investor confidence, the IM should also include clear project timelines for both short-term and long-term objectives. Any major deviations from the stated plans would require investor approval through a voting process, reinforcing the importance of a well-defined strategy.Beyond the plan itself, you must determine the Minimum Investment required for the round to be considered successful. This amount should be sufficient to achieve a key milestone, preventing the need for additional funding without demonstrable progress. The First Closing Date marks the deadline by which you must secure at least the Minimum Investment; if not met, the round will not proceed. If successful, you can continue attracting additional investments beyond this date. Finally, the round concludes on the Final Closing Date, marking the official end of the investment subscription period, if required.',
      image: '/start.png',
    },
    {
      id: 2,
      title: 'Begin Raising Funds',
      description:
        'Once your Leapfunder campaign is live, you can start attracting investors from both your personal network and Leapfunders investor community. A dedicated payment gateway will be set up for your campaign, providing a secure online environment where potential investors can review your data room. This includes investors who have previously used Leapfunder as well as those from your own network. When convinced of your business proposition, investors can make direct investments remotely within minutes, except for investors from the U.S. due to legal restrictions.To ensure a successful investment round, you must secure at least the Minimum Investment before the First Closing Date. Once this milestone is reached, the investment is considered successful, and all collected funds are stored in an independent bank account. You can then request access to your funds, with the legal processing and transfer typically completed within a week. If the Minimum Investment is not achieved before the First Closing Date, the investment round is deemed unsuccessful, and the collected funds must be returned to investors.In the early stages, initial investors are usually those within your personal network who are familiar with you and your business. As the campaign progresses, external investors with less direct knowledge of you or your industry may become interested. Throughout this process, Leapfunder provides essential legal documents, the software for handling investments through your website, and access to the independent bank account required for managing funds, ensuring a smooth and transparent investment process.',
      image: '/start1.png',
    },
    {
      id: 3,
      title: 'Successful Round',
      description:
        'If your investment round is successful, your company can proceed with its planned objectives using the secured funds. The investment can be allocated as specified in the Information Memorandum, whether that involves developing a prototype, executing a go-to-market strategy, or other key initiatives. In return, investors receive a Leapfunder Note equivalent to their investment amount, signifying their stake in your venture. For example, if MedicSoftware B.V. raises €50,000 through Leapfunder Notes, they can now develop their prototype and move forward with their business plan.Once your financing round is complete, it’s essential to keep investors informed about your company’s progress. Providing monthly updates helps maintain investor confidence and engagement. Investors who are excited about your business can also contribute beyond funding by leveraging their networks to create additional opportunities for growth. A strong investor base can significantly enhance your startup’s chances of success through strategic connections and industry insights.Investors receive a Convertible Note, which eventually converts into SPV Shares. This conversion process is a key advantage, as it postpones the need to determine the exact valuation of the company’s shares—a challenge often faced by early-stage startups. With the Leapfunder Note, there is no obligation to repay the investment in cash; instead, it always converts into equity at a later stage, ensuring long-term alignment between the company and its investors.',
      image: '/start2.png',
    },
    {
      id: 4,
      title: 'Conversion',
      description:
        'At some point, Convertible Notes will be repaid with shares through a process called Conversion, which typically occurs when a large investor invests in your company, triggering the determination of share price. The value of shares is set by the large investor’s price, and Convertible Note holders receive shares at a discounted price, along with the interest earned on the note. Conversion happens when a large investor (≥ €100,000) invests, the company is acquired, or the Final Conversion Date arrives, triggering an automatic conversion. For example, if MedicSoftware B.V. receives a €100,000 investment at a pre-money valuation of €330,000 for 10,000 shares, and the Leapfunder Note has grown with 10% interest to €55,000, the investors get a 20% discount on the share price, allowing them to purchase shares at €26.40 each. This process rewards early investors for the risks they took, as they get shares at a discount while benefiting from the interest accrued. Additionally, the company can negotiate share prices with investors, or if the final conversion date triggers the process, an independent expert may be called to determine the price. A Cap (maximum share price) is often agreed upon to give investors a rough estimate of the conversion price, ensuring it never exceeds the pre-set limit. Upon conversion, new shares are issued and held by a Special Purpose Vehicle (SPV), which represents the Leapfunder investors in shareholder meetings. The SPV can vote on behalf of the investors, and if desired, one investor can serve as the spokesperson.',
      image: '/startup.png',
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
    <div className="flex flex-col items-center py-12 px-4 sm:px-8 md:px-16">
      <div className="w-full max-w-7xl">
        <HeadingSection
          title="Raise Funding with Investly "
          subtitle="Using Investly's instruments, entrepreneurs can connect with investors, access tested legal documentation, and find guidance as they seek seed financing or later rounds of funding."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <aside className="md:col-span-1 mb-8 md:mb-0 sticky top-8 self-start hidden lg:block ">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Table of contents</h2>
            <ul className="space-y-4">
              {steps.map((step) => (
                <li
                  key={step.id}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => scrollToStep(step.id)}
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center ${
                      activeStep === step.id ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                    } font-bold rounded-full`}
                  >
                    {step.id}
                  </span>
                  <span className={`${activeStep === step.id ? 'text-gray-800' : 'text-gray-600'}`}>
                    {step.title}
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <main className="md:col-span-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="mb-12"
              >
                <Card>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <img src={step.image} alt={`Step ${step.id}`} className="w-16 h-16" />
                      <div>
                        <h3 className="text-lg font-bold text-primary mb-2">Step {step.id}</h3>
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-4">{step.title}</h2>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mt-4 text-justify">
                      {expandedSteps[step.id] ? step.description : getFirstParagraph(step.description)}
                    </p>
                    {!expandedSteps[step.id] && (
                      <button
                        onClick={() => toggleExpand(step.id)}
                        className="text-primary font-semibold mt-2 hover:underline"
                      >
                        Read More
                      </button>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Startup