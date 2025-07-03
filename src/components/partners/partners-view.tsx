'use client';

import Link from 'next/link';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from '@/components/ui/carousel';



interface Partner {
  id: string;
  name: string;
  logo: string;
  logoAltDescription: string;
  link: string;
}

const FETCH_PARTNERS = gql`
  query MyQuery {
    allOurPartners {
      id
      link
      logo
      logoAltDescription
      name
    }
  }
`;

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const { data } = await client.query({
          query: FETCH_PARTNERS,
          fetchPolicy: 'no-cache',
        });
        setPartners(data.allOurPartners || []);
      } catch (error) {
        console.error('Error fetching partners:', error);
        setError('Failed to load partners');
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white sm:py-20 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
            <p className="mt-4 text-gray-600">Loading partners...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white sm:py-20 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white sm:py-20 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-start grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Enhanced */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <div className="inline-flex items-center px-4 py-1 bg-blue-50 text-primary rounded-full text-sm font-medium mb-3">
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Our Network
            </div>
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl lg:leading-tight">
              Partner Companies We Work With
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              Join our platform to connect with leading companies and be part of the next big thing
              in the startup ecosystem.
            </p>

            <div className="mt-8">
              <Link
                href="/join-network"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg shadow-sm hover:bg-primary/90 transition-colors"
              >
                Join our network
                <svg
                  className="ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column - Carousel */}
          <div className="lg:col-span-8">
            {partners.length > 0 ? (
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {partners.map((partner) => (
                    <CarouselItem
                      key={partner.id}
                      className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="group relative aspect-square rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg">
                        <div className="flex h-full flex-col items-center justify-center">
                          {partner.link ? (
                            <Link
                              href={partner.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-full flex-col items-center justify-center"
                            >
                              <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}${partner.logo}`}
                                alt={partner.logoAltDescription || partner.name}
                                width={120}
                                height={32}
                                className="object-contain h-12 w-auto opacity-70 transition-opacity group-hover:opacity-100"
                              />
                              <span className="mt-4 text-sm font-medium text-gray-700 opacity-0 transition-opacity group-hover:opacity-100">
                                {partner.name}
                              </span>
                            </Link>
                          ) : (
                            <>
                              <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}${partner.logo}`}
                                alt={partner.logoAltDescription || partner.name}
                                width={120}
                                height={32}
                                className="object-contain h-12 w-auto opacity-70 transition-opacity group-hover:opacity-100"
                              />
                              <span className="mt-4 text-sm font-medium text-gray-700 opacity-0 transition-opacity group-hover:opacity-100">
                                {partner.name}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex -left-4" />
                <CarouselNext className="hidden lg:flex -right-4" />
              </Carousel>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No partners available at the moment.</p>
              </div>
            )}

            {/* Company Stats */}
            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{partners.length}+</div>
                <div className="mt-1 text-sm text-gray-600">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">5,000+</div>
                <div className="mt-1 text-sm text-gray-600">Funded Startups</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">600Cr+</div>
                <div className="mt-1 text-sm text-gray-600">Total Valuation</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">50+</div>
                <div className="mt-1 text-sm text-gray-600">Active Investors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;