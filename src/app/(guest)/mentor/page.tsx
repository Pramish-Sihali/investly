'use client';

import Image from 'next/image';
import { gql } from '@apollo/client';
import { Mentor } from '@/types/mentor';
import client from '@/lib/apollo-client'; // Ensure this import is correct
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

export default function MentorPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const loadMentors = async () => {
      const fetchedMentors = await fetchMentors();
      setMentors(fetchedMentors);
    };

    loadMentors();
  }, []);

  return (
    <>
      {/* Existing mentor section */}
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {/* Header Section */}
          <div className="text-center sm:flex sm:items-end sm:space-x-16 sm:text-left">
            <h2 className="max-w-xs text-3xl font-bold text-gray-900 sm:text-4xl shrink-0">
              Connect with Expert Mentors
            </h2>
            <p className="max-w-xs mt-5 text-sm font-normal leading-6 text-gray-500 sm:mt-0">
              Get personalized guidance from industry leaders who have been where you want to go.
            </p>
          </div>

          {/* Filters Section */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['All', 'Sales', 'Marketing', 'Tech', 'French'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  className="rounded-full"
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mentors.map((mentor) => (
              <Dialog key={mentor.fullName}>
                <DialogTrigger asChild>
                  <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
                    {/* Image Section */}
                    <a className="flex shrink-0 aspect-w-4 aspect-h-3">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${mentor.organizationLogo}`}
                        alt={mentor.fullName}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                      />
                    </a>

                    {/* Content Section */}
                    <div className="flex-1 px-4 py-5 sm:p-6">
                      <p className="text-lg font-bold text-gray-900">{mentor.fullName}</p>
                      <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                        {mentor.role}
                      </p>
                    </div>

                    {/* Footer Section */}
                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">{mentor.role}</p>
                          <span className="text-sm font-medium text-gray-900">•</span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium text-gray-900">4.9</span>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm" className="p-0">
                          <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
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
                      />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{mentor.fullName}</h3>
                        <div className="flex gap-4">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {mentor.role}
                          </Badge>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <span className="text-sm font-medium">4.9</span>
                          </div>
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
    </>
  );
}
