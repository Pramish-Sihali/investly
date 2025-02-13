import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InvestmentInStartups = () => {
  const steps = [
    {
      id: 1,
      title: "Evaluating startups",
      description:
        "Every investor chooses whether to make an investment in their own way. Some investors scrutinize the quality of the team. If the plan is less convincing, a good team can always rewrite it. Other investors focus on the plan and the first product prototypes, since that is the core of the business. It is quite important that every investor realizes that early-stage startup investments are very risky.",
      image: "/start.png",
    },
    {
      id: 2,
      title: "Pledging funds",
      description: "Details about pledging funds...",
      image: "/start1.png",
    },
    {
      id: 3,
      title: "Successful round",
      description: "Details about successful rounds...",
      image: "/start2.png",
    },
    {
      id: 4,
      title: "Conversion",
      description: "Details about conversion...",
      image: "/startup.png",
    },
  ];

  return (
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="col-span-1">
          <div className="mb-4">
            <select
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue="English"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          <div className="flex gap-4 mb-8">
            <Button variant="outline" className="w-full">Convertible</Button>
            <Button variant="outline" className="w-full">Equity</Button>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900">Table of contents</h4>
            <ul className="mt-4 space-y-2">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 font-medium">{step.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Investment in startups</h1>
          <p className="text-gray-600 mb-8">
            Leapfunder makes investing in startups simple, giving Angel investors access to promising startups and a steady deal-flow. This lowers the barriers to making informed and uncomplicated investing decisions.
          </p>

          {steps.map((step) => (
            <Card key={step.id} className="mb-8">
              <CardContent className="flex flex-col md:flex-row items-start gap-4">
                <div className="w-full md:w-1/3">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h2 className="text-xl font-semibold text-primary mb-2">
                    STEP {step.id}
                  </h2>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
     
    
  );
};

export default InvestmentInStartups;
