import type { TeamMember } from '@/types/company';

import React from 'react';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import HeadingSection from '@/components/common/heading-section';

const fetchBoardMembers = async (): Promise<TeamMember[]> => {
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          allTeamMembers {
            results {
              id
              name
              role
              profilePicture
              profilePictureAltDescription
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
    return data.allTeamMembers.results;
  } catch (error) {
    console.error('Error fetching board members:', error);
    return [];
  }
};

const BoardOfDirectors = async () => {
  const boardMembers: TeamMember[] = await fetchBoardMembers();

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20 xl:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <HeadingSection
          title="Board of Directors"
          subtitle="Meet our distinguished board members who guide BAIN's strategic vision and governance."
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 text-center border border-gray-100"
            >
              <div className="mb-6">
                <div className="relative inline-block">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${member.profilePicture}`}
                    alt={member.profilePictureAltDescription || member.name}
                    className="w-32 h-36  rounded-full mx-auto shadow-md ring-4 ring-white ring-offset-2 ring-offset-gray-50 group-hover:shadow-lg transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/5 to-transparent" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfDirectors;
