'use client';

import { Card, CardContent } from '@/components/ui/card';
import React, { useRef, useState, useEffect } from 'react';
import HeadingSection from '@/components/common/heading-section';

const StartupPage = () => {
  const steps = [
    {
      id: 1,
      title: 'Evaluating Startups',
      description:
        'Every investor chooses whether to make an investment in their own way. Some investors scrutinize the quality of the team. If the plan is less convincing, a good team can always rewrite it. Other investors focus on the plan and the first product prototypes, since that is the core of the business. It is quite important that every investor realizes that early-stage startup investments are very risky. If the company is not successful in the end: it is much better if you still feel it was worth a try.\n\nEntrepreneurs are required to complete an Information Memorandum, clearly documenting their business plan as well as the terms of the investment round. This includes a specification of the Minimum Investment, First and Final Closing Dates for the investment round.\n\nIf the startup chooses to offer a Investly Note as an investment then the Interest rate, Discount, and Cap need to be laid down. If instead the startup offers a Investly Straight Equity investment then the pre-money valuation needs to be laid down. Startups usually choose to fund-raise with a convertible when they are unable to make an accurate assessment of the value of the shares. And that’s normally the case in the first few years of the life of the company. In the following explanation we will assume that the startup chooses to issue a convertible, and so it is offering Investly Notes.',
      image: '/start.png',
    },
    {
      id: 2,
      title: 'Pledging Funds',
      description:
        'When you choose to invest in a company via Investly, your investment is deposited in an independent bank account. This is to prevent the company from using the money before they have achieved their Minimum Investment. Only if the Minimum Investment has been achieved before the First Closing Date, will the money will be transferred to the account of the company. If the Minimum is not reached, the money will simply be refunded, with no cost to the investor.\n\nInvestments can start from €1.000, and on average investments fall between €5k-10k - though amounts have exceeded €200k.\n\nExample: An investor sees potential in a startup called MedicSoftware B.V. and invests €1,000 in Investly Notes. The investor receives a confirmation of payment. When the Minimum Investment is achieved the investment is finalized. The investor receives notice that the investment has been accepted and the cash amount is released to MedicSoftware.',
      image: '/start1.png',
    },
    {
      id: 3,
      title: 'Successful Round',
      description:
        'At the end of a successful round, any funds that haven’t been released yet are transferred to the entrepreneur who can now use the money for whatever they indicated in the Information Memorandum. Each time cash is released to the startup, the corresponding investors get a convertible in the form of the Investly Note.\n\nDuring the subsequent growth phase for the startup, the investors can contribute a lot by offering help and assistance. Look for valuable contacts in your network and try to bring in customers. An active group of investors can really make the difference.\n\nLater – at a time when the value of the shares can be estimated more precisely – the Investly Note will be converted to shares that are held by a Special Purpose Vehicle (SPV). You will get the shares at a Discount to reward you for getting in early. The Investly Note will also have increased in value with the pre-agreed Interest. In other words: you will get significantly more shares for your money than later investors.\n\nExample: A Investly investor that has invested €1,000 makes a habit of reading the monthly updates from the CEO. When he sees that the company is trying to expand into a country where he has contacts, he offers assistance in building the business there.',
      image: '/start2.png',
    },
    {
      id: 4,
      title: 'Conversion',
      description:
        'There comes a time when the Investly Notes will be converted into shares. This usually happens when a large investor decides to invest. The value of the shares will be determined by the price offered by the large investor. After conversion, investors are pooled through a Special Purpose Vehicle (SPV) and act as a single investor in the startup’s shareholders meeting.\n\nThe Conversion will happen as soon as:\n\nA large (€100,000) investor investor invests in fresh shares in the startup. (There is also a special Investly XL Note which converts with a > €500,000 investment: this is clear when you invest).\nThe startup is acquired by another company.\nWhen the Final Conversion Date arrives. At this date a conversion will be triggered automatically.\n\nAfter conversion you hold shares in the company via an SPV. By investing early you took a considerable risk. To compensate for this risk you receive both an Interest on the value of your Investly Note, and a Discount on the price of the shares. The share price is just taken from the investment round that triggers the conversion. If the convertible expires without an investment, because of the Final Conversion Date, then the startup will agree the correct market price of the shares with the investors, or else an external referee is asked to assess it. In each case the investor will benefit from the Interest and from a Discount. The Interest and the Discount are found in the Information Memorandum. What is not fixed is what % of the company you will eventually get, since when you invested the value of the company was still highly uncertain and so that simply couldn’t be fixed exactly.\n\nExample: An investor has invested €1,000. After one year this has risen by 10% interest to €1,100. There is a conversion because a new investor decides to invest €100,000 in new shares in MedicSoftware at a valuation of €33 per share. At conversion there is an additional 20% Discount on the shares for the Investly Note holders, so they only pay €26,40 per share. For this reason, the investor receives €1,100/ €26,40 = 42 shares, with a total value of €1,375. The shares will be held in an SPV together with the shares of the other Investly Note investors.\n\nApart from the Interest and the Discount there is usually also a Cap. The Cap is also agreed in advance and is stated clearly in the Information Memorandum. A Cap is a maximum share price that will be used for Conversion. Naturally, investors in a convertible often like to know roughly what share price they should expect during the conversion. Of course it is difficult to say this in advance. But the Cap is a kind of guarantee: the pre-money valuation used for conversion will never be higher than then Cap. So after applying the Discount you can check whether the price is still higher than the Cap. If it is still higher, then the investor will get the lower ‘Capped’ price instead. So it is a kind of price guarantee.\n\nAlthough the use of convertibles is relatively new in Europe, this way of investing is normal in the U.S. Online you will find plenty of good material explaining the convertible in general.',
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
          title="Investor to Invest in startups"
          subtitle="Investly makes investing in startups simple, giving Angel investors access to promising
            startups and a steady deal-flow. This lowers the barriers to making informed and
            uncomplicated investing decisions."
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

export default StartupPage