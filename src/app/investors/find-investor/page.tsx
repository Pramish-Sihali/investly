'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin } from 'lucide-react';
import { investors } from '@/@constants/investor';
import HeadingSection from '@/components/common/heading-section';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog';

const InvestorsPage = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<any | null>(null);

  return (
    <div className="max-w-6xl mx-auto py-10">
      <HeadingSection
        title="💰 Meet Our Investors"
        subtitle="We are proud to announce our newest investors. Join us in celebrating their contributions to BAIN'S growth and success."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {investors.map((investor) => (
          <Card key={investor.id} className="p-5 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Image
                src={investor.image}
                alt={investor.name}
                width={70}
                height={70}
                className="rounded-full border object-cover aspect-square"
              />
              <div>
                <CardTitle className="text-lg font-semibold">{investor.name}</CardTitle>
                <p className="text-sm text-gray-500">{investor.category}</p>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700">{investor.shortDescription}</p>

              {expandedId === investor.id && (
                <p className="text-gray-600 mt-2">{investor.fullDescription}</p>
              )}

              <div className="mt-4">
                <p className="text-sm text-gray-500">📍 {investor.location}</p>
                <p className="text-sm text-gray-500">
                  💵 Investment Range: {investor.investmentRange}
                </p>
              </div>

              <div className="flex gap-4 mt-3">
                <a href={investor.socialLinks.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="h-5 w-5 text-blue-600 hover:text-blue-800 transition-colors" />
                </a>
                <a href={investor.socialLinks.twitter} target="_blank" rel="noreferrer">
                  <Twitter className="h-5 w-5 text-blue-400 hover:text-blue-600 transition-colors" />
                </a>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setExpandedId(expandedId === investor.id ? null : investor.id)}
                >
                  {expandedId === investor.id ? 'Show Less' : 'Read More'}
                </Button>

                <Button onClick={() => setSelectedInvestor(investor)}>Apply for Investment</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Apply for Investment Modal */}
      {selectedInvestor && (
        <Dialog open={!!selectedInvestor} onOpenChange={() => setSelectedInvestor(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply to {selectedInvestor.name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="Your Name" className="p-2 border rounded-md" />
              <input type="email" placeholder="Your Email" className="p-2 border rounded-md" />
              <input type="text" placeholder="Startup Name" className="p-2 border rounded-md" />
              <input
                type="number"
                placeholder="Requested Investment Amount"
                className="p-2 border rounded-md"
              />
              <textarea placeholder="Your Pitch" className="p-2 border rounded-md h-24" />
              <Button className="w-full" onClick={() => setSelectedInvestor(null)}>
                Submit Application
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InvestorsPage;
