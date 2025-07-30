'use client';

import UserRegistrationForm from '@/components/form/startup-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InvestorRegistrationForm from '@/components/form/investor-registration-form';

export default function Form() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Registration Portal</h1>
          <p className="text-lg text-gray-600">Choose your registration type below</p>
        </div>

        {/* Tabs Container */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="startup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="startup" className="text-lg py-3 ">
                Startup Registration
              </TabsTrigger>
              <TabsTrigger value="investor" className="text-lg py-3">
                Investor Registration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="startup">
              <UserRegistrationForm />
            </TabsContent>

            <TabsContent value="investor">
              <InvestorRegistrationForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
