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
    <ResponsiveContainer variant="wide" paddingY="xl">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <HeadingSection
          title="Our Team"
          subtitle="Meet the dedicated professionals behind Investly, working tirelessly to make angel investing accessible and rewarding."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="rounded-2xl shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${member.profilePicture}`} // Use the base URL from .env and concatenate with the image path
                  alt={member.profilePictureAltDescription || member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                {member.description && <p className="text-gray-600 text-justify" dangerouslySetInnerHTML={{ __html: member.description }} />}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default OurTeam;
