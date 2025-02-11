import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const StartupPage = () => {
  return (
    <div className="flex flex-col items-center py-12 px-4 sm:px-8 md:px-16">
      <div className="w-full max-w-7xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl text-gray-800">
            Investment in Startups
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Leapfunder makes investing in startups simple, giving Angel investors access to promising startups and a steady deal-flow. This lowers the barriers to making informed and uncomplicated investing decisions.
          </p>
        </header>

        {/* Language and Toggle Section */}
        <div className="flex flex-wrap items-center justify-between mb-12">
          {/* Language Selector */}
          <div className="flex items-center gap-4">
            <img src="/flags/uk-flag.png" alt="English" className="w-6 h-6 rounded-full" />
            <span className="text-gray-800 font-medium">English</span>
          </div>

          {/* Toggle Buttons */}
          <div className="flex items-center gap-4">
            <Button className="px-6 py-2 bg-orange-500 text-white rounded-lg">Convertible</Button>
            <Button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg">Equity</Button>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Table of Contents */}
          <aside className="md:col-span-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Table of contents</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full">1</span>
                <span className="text-gray-800">Evaluating startups</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-gray-300 text-gray-600 font-bold rounded-full">2</span>
                <span className="text-gray-600">Pledging funds</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-gray-300 text-gray-600 font-bold rounded-full">3</span>
                <span className="text-gray-600">Successful round</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-gray-300 text-gray-600 font-bold rounded-full">4</span>
                <span className="text-gray-600">Conversion</span>
              </li>
            </ul>
          </aside>

          {/* Step Details */}
          <main className="md:col-span-2">
            <Card className="mb-8">
              <CardContent>
                <h3 className="text-lg font-bold text-orange-500 mb-2">Step 1</h3>
                <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Evaluating Startups</h2>
                <p className="text-gray-600 leading-relaxed">
                  Every investor chooses whether to make an investment in their own way. Some investors scrutinize the quality of the team. If the plan is less convincing, a good team can always rewrite it. Other investors focus on the plan and the first product prototypes, since that is the core of the business. It is quite important that every investor realizes that early-stage startup investments are very risky. If the company is not successful in the end, it is much harder to get your money back than with other types of investments.
                </p>
              </CardContent>
            </Card>

            <img
              src="/images/startup-step1.png"
              alt="Evaluating Startups"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </main>
        </div>

        {/* Questions Button */}
        <div className="fixed bottom-8 right-8">
          <Button className="px-6 py-3 bg-orange-500 text-white rounded-full shadow-lg">
            Questions?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartupPage;
