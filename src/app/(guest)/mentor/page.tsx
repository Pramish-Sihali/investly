import type { Mentor } from '@/types/mentor';

import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import HeadingSection from '@/components/common/heading-section';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

const GET_MENTORS = gql`
  query GetMentors {
    companies(organizationRole: MENTOR) {
      results {
        role
        fullName
        email
        contactNumber
        organizationLogo
      }
    }
  }
`;

async function fetchMentors() {
  try {
    const { data } = await client.query({
      query: GET_MENTORS,
      fetchPolicy: 'no-cache',
    });
    return data.companies.results;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return [];
  }
}

export default async function MentorPage() {
  const fetchedMentors: Mentor[] = await fetchMentors();

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <HeadingSection
          badge="Mentors"
          title="Connect with Expert Mentors"
          subtitle="Get personalized guidance from industry leaders who have been where you want to go."
        />

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fetchedMentors.map((mentor) => (
            <Dialog key={mentor.fullName}>
              <DialogTrigger asChild>
                <div className="flex flex-col overflow-hidden transition-all duration-300 transform bg-white border cursor-pointer border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:-translate-y-1">
                  {/* Image Section */}
                  <div className="relative flex shrink-0 aspect-w-4 aspect-h-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${mentor.organizationLogo}`}
                      alt={mentor.fullName}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-105"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 px-6 py-6">
                    <p className="text-xl font-bold text-gray-900">{mentor.fullName}</p>
                    <p className="mt-4 text-sm font-normal leading-relaxed text-gray-600 line-clamp-3">
                      {mentor.role}
                    </p>
                  </div>

                  {/* Footer Section */}
                  <div className="px-6 py-5 mt-auto border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {mentor.role}
                        </Badge>
                      </div>

                      <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                        <svg
                          className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <title>View mentor details</title>
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <line x1="17" y1="7" x2="7" y2="17" />
                          <polyline points="8 7 17 7 17 16" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              {/* Detailed Dialog */}
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    Book a Session with {mentor.fullName}
                  </DialogTitle>
                  <DialogDescription className="text-base text-gray-600">
                    Take your next step towards success with personalized mentorship.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${mentor.organizationLogo}`}
                      alt={mentor.fullName}
                      width={100}
                      height={100}
                      className="rounded-full object-cover aspect-square ring-4 ring-primary/10"
                      priority={false}
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{mentor.fullName}</h3>
                      <div className="flex gap-4">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {mentor.role}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button size="lg" className="w-full gap-2">
                      Schedule Meeting
                    </Button>
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      View LinkedIn Profile
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
