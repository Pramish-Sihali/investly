import type { TeamMember } from '@/types/company';

import React from 'react';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { Card, CardContent } from '@/components/ui/card';
import HeadingSection from '@/components/common/heading-section';
import ResponsiveContainer from '@/components/common/responsive-container';

const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          allTeamMembers {
            results {
              id
              name
              role
              email
              profilePicture
              profilePictureAltDescription
              description # Add this if available in your API
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
    return data.allTeamMembers.results;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
};

const OurTeam = async () => {
  const teamMembers: TeamMember[] = await fetchTeamMembers();

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <HeadingSection
          title="Our Team"
          subtitle="Meet the dedicated professionals behind Investly, working tirelessly to make angel investing accessible and rewarding."
        />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col sm:flex-row sm:items-center">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${member.profilePicture}`}
                alt={member.profilePictureAltDescription || member.name}
                className="object-cover w-48 rounded-2xl -rotate-2"
              />

              <div className="mt-8 sm:mt-0 sm:ml-10">
                <p className="text-4xl font-semibold tracking-tight text-gray-900">{member.name}</p>
                <p className="mt-3 text-xs font-semibold tracking-widest text-gray-900 uppercase">
                  {member.role}
                </p>
                {member.description && (
                  <p
                    className="mt-8 text-base font-normal text-gray-600 text-justify"
                    dangerouslySetInnerHTML={{ __html: member.description }}
                  />
                )}
                <div className="mt-8">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center text-sm font-semibold text-blue-600 transition-all duration-200 group hover:text-blue-800 hover:underline"
                    >
                      Contact via Email
                      <svg
                        className="w-5 h-5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
