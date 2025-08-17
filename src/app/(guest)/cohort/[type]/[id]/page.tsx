import React from 'react';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { notFound } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface CohortMember {
  id: string;
  name: string;
  position: string;
  email: string | null;
  phoneNumber: string | null;
}

interface Cohort {
  id: string;
  companyName: string;
  companyLogo: string;
  companyDescription: string;
  cohortmemberSet: CohortMember[];
  companyAddress: string | null;
  companyEmail: string | null;
  companyPhone: string | null;
  participatingStatus: string;
}

interface CohortResponse {
  cohorts: {
    results: Cohort[];
  };
}

async function fetchCohortData(id: string, participatingStatus: string): Promise<CohortResponse> {
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          cohorts(participatingStatus: ${participatingStatus}, id: "${id}") {
            results {
              id
              companyName
              companyLogo
              companyDescription
              cohortmemberSet {
                email
                name
                position
                phoneNumber
                id
              }
              companyAddress
              companyEmail
              companyPhone
              participatingStatus
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
    return data;
  } catch (error) {
    console.error('Error fetching cohort data:', error);
    throw new Error('Failed to fetch cohort data');
  }
}

interface PageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

export default async function CohortDetailPage({ params }: PageProps) {
  const { type, id } = await params;

  const participatingStatus = type.toUpperCase();

  try {
    const data = await fetchCohortData(id, participatingStatus);
    const cohort = data.cohorts.results[0];

    // If no cohort found, show 404
    if (!cohort) {
      notFound();
    }

    return (
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/cohort">Cohorts</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{cohort.companyName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-start gap-6">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              {cohort.companyLogo ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${cohort.companyLogo}`}
                  alt={`${cohort.companyName} logo`}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-contain rounded-lg border"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center rounded-lg border">
                  <span className="text-3xl font-bold text-primary">
                    {cohort.companyName.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{cohort.companyName}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span
                  className={`px-3 py-1 rounded-full font-medium text-xs tracking-wider uppercase ${
                    cohort.participatingStatus === 'STARTUP'
                      ? 'text-green-700 bg-green-100'
                      : 'text-blue-700 bg-blue-100'
                  }`}
                >
                  {cohort.participatingStatus}
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                {cohort.companyEmail && (
                  <p className="flex items-center text-sm text-gray-600">
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
                    <a
                      href={`mailto:${cohort.companyEmail}`}
                      className="text-primary hover:underline"
                    >
                      {cohort.companyEmail}
                    </a>
                  </p>
                )}
                {cohort.companyPhone && (
                  <p className="flex items-center text-sm text-gray-600">
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
                    <a href={`tel:${cohort.companyPhone}`} className="text-primary hover:underline">
                      {cohort.companyPhone}
                    </a>
                  </p>
                )}
                {cohort.companyAddress && (
                  <p className="flex items-start text-sm text-gray-600">
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
                    <span className="line-clamp-3">{cohort.companyAddress}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Company Description */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Company</h2>
          <div
            className="text-gray-700 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: cohort.companyDescription }}
          />
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Members</h2>
          {cohort.cohortmemberSet.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cohort.cohortmemberSet.map((member) => (
                <div
                  key={member.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:border-primary/30"
                >
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3 text-sm">{member.position}</p>

                  <div className="space-y-2">
                    {member.email && (
                      <p className="flex items-center text-sm text-gray-600">
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
                        <a
                          href={`mailto:${member.email}`}
                          className="text-primary hover:underline truncate"
                        >
                          {member.email}
                        </a>
                      </p>
                    )}
                    {member.phoneNumber && (
                      <p className="flex items-center text-sm text-gray-600">
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
                        <a
                          href={`tel:${member.phoneNumber}`}
                          className="text-primary hover:underline"
                        >
                          {member.phoneNumber}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members</h3>
              <p className="text-gray-500">No team members have been added yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching cohort data:', error);
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Cohort</h1>
          <p className="text-gray-600">
            There was an error loading the cohort information. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
