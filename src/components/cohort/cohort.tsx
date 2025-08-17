import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import HeadingSection from '@/components/common/heading-section';

interface Company {
  id: string;
  companyName: string;
  companyEmail: string | null;
  companyAddress: string | null;
  companyPhone: string | null;
  companyLogo: string;
}

interface CohortData {
  results: Company[];
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

const fetchStartups = async (): Promise<CohortData> => {
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          cohorts(participatingStatus: STARTUP) {
            results {
              companyAddress
              companyEmail
              companyLogo
              companyName
              companyPhone
              id
            }
            totalCount
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
    return data.cohorts;
  } catch (error) {
    console.error('Error fetching startups:', error);
    return { results: [], totalCount: 0, pageInfo: { hasNextPage: false, hasPreviousPage: false } };
  }
};

const fetchInvestors = async (): Promise<CohortData> => {
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          cohorts(participatingStatus: INVESTOR) {
            results {
              companyAddress
              companyEmail
              companyLogo
              companyName
              companyPhone
              id
            }
            totalCount
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
    return data.cohorts;
  } catch (error) {
    console.error('Error fetching investors:', error);
    return { results: [], totalCount: 0, pageInfo: { hasNextPage: false, hasPreviousPage: false } };
  }
};

const CompanyCard: React.FC<{ company: Company; type: 'startup' | 'investor' }> = ({
  company,
  type,
}) => (
  <div key={company.id} className="group">
    <Link href={`/cohort/${type}/${company.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary/30 h-[420px] w-full flex flex-col">
        {/* Company Logo - Fixed height */}
        <div className="h-[180px] bg-gray-50 flex items-center justify-center p-6 flex-shrink-0">
          {company.companyLogo ? (
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${company.companyLogo}`}
                alt={company.companyName}
                width={160}
                height={120}
                className="object-contain max-w-full max-h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center rounded-md">
              <span className="text-3xl font-bold text-primary">
                {company.companyName.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Company Info - Flexible height with minimum */}
        <div className="p-6 flex-1 flex flex-col min-h-0">
          {/* Company Type Badge */}
          <span
            className={`inline-flex px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full mb-3 flex-shrink-0 self-start ${
              type === 'startup' ? 'text-green-700 bg-green-100' : 'text-blue-700 bg-blue-100'
            }`}
          >
            {type}
          </span>

          {/* Company Name - Fixed height with overflow handling */}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-3 flex-shrink-0 h-[3.5rem] leading-7 overflow-hidden">
            <span className="line-clamp-2">{company.companyName}</span>
          </h3>

          {/* Company Details - Flexible area */}
          <div className="space-y-2 text-sm text-gray-600 flex-1 overflow-hidden">
            {company.companyAddress && (
              <div className="flex items-start min-h-0">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="line-clamp-2 leading-5">{company.companyAddress}</span>
              </div>
            )}

            {company.companyEmail && (
              <div className="flex items-center min-h-0">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="truncate leading-5">{company.companyEmail}</span>
              </div>
            )}

            {company.companyPhone && (
              <div className="flex items-center min-h-0">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="leading-5">{company.companyPhone}</span>
              </div>
            )}
          </div>
        </div>

        {/* View Details Link - Fixed position at bottom */}
        <div className="px-6 pb-6 flex-shrink-0">
          <div className="text-primary font-medium text-sm group-hover:text-primary-dark flex items-center">
            View Details
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const Cohort = async () => {
  const [startups, investors] = await Promise.all([fetchStartups(), fetchInvestors()]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <HeadingSection title="Cohort" subtitle="Our Portfolio Companies" />

      <div className="mt-12 space-y-16">
        {/* Startups Section */}
        {startups.results.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Startups ({startups.totalCount})</h2>
              <div className="text-sm text-gray-500">
                {startups.results.length} of {startups.totalCount} companies
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {startups.results.map((company) => (
                <CompanyCard key={company.id} company={company} type="startup" />
              ))}
            </div>
          </section>
        )}

        {/* Investors Section */}
        {investors.results.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Investors ({investors.totalCount})
              </h2>
              <div className="text-sm text-gray-500">
                {investors.results.length} of {investors.totalCount} companies
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {investors.results.map((company) => (
                <CompanyCard key={company.id} company={company} type="investor" />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {startups.results.length === 0 && investors.results.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-500">
              There are currently no startups or investors in the cohort.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cohort;
