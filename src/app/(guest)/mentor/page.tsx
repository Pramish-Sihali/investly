'use client';

import type { Mentor } from '@/types/mentor';

import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import HeadingSection from '@/components/common/heading-section';
import { Mail, Phone, Loader2, ExternalLink } from 'lucide-react';
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
        id
        organizationName
        organizationLogo
        organizationDescription
        fullName
        email
        websiteLink
        role
        contactNumber
        isActivated
      }
    }
  }
`;

const formatRole = (role: string): string =>
  role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

const openExternalLink = (url: string) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

const initiateEmail = (email: string, mentorName: string) => {
  const subject = encodeURIComponent(`Mentorship Request - ${mentorName}`);
  const body = encodeURIComponent(
    `Dear ${mentorName},\n\nI would like to schedule a mentorship session with you.\n\nBest regards,`
  );
  window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
};

const initiateCall = (phoneNumber: string) => {
  window.open(`tel:${phoneNumber}`, '_self');
};

const MentorCard = ({ mentor }: { mentor: Mentor }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col overflow-hidden transition-all duration-300 transform bg-white border cursor-pointer border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:-translate-y-1">
          <div className="relative flex shrink-0 aspect-w-4 aspect-h-3">
            <Image
              src={
                imageError
                  ? '/images/default-avatar.png'
                  : `${process.env.NEXT_PUBLIC_API_URL}${mentor.organizationLogo}`
              }
              alt={`${mentor.fullName} - ${mentor.organizationName}`}
              width={400}
              height={300}
              className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-105"
              priority={false}
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="flex-1 px-6 py-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{mentor.fullName}</h3>
            <p className="text-sm font-medium text-primary mb-2">{mentor.organizationName}</p>
            <p className="text-sm font-normal leading-relaxed text-gray-600 line-clamp-3">
              {mentor.organizationDescription ||
                `${formatRole(mentor.role)} at ${mentor.organizationName}`}
            </p>
          </div>

          <div className="px-6 py-5 mt-auto border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {formatRole(mentor.role)}
                </Badge>
              </div>

              <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                <ExternalLink className="w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-primary" />
                <span className="sr-only">View mentor details</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Connect with {mentor.fullName}</DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Take your next step towards success with personalized mentorship from{' '}
            {mentor.organizationName}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <div className="flex items-start gap-4">
            <Image
              src={
                imageError
                  ? '/images/default-avatar.png'
                  : `${process.env.NEXT_PUBLIC_API_URL}${mentor.organizationLogo}`
              }
              alt={`${mentor.fullName} - ${mentor.organizationName}`}
              width={100}
              height={100}
              className="rounded-full object-cover aspect-square ring-4 ring-primary/10 flex-shrink-0"
              priority={false}
              onError={handleImageError}
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">{mentor.fullName}</h3>
              <p className="text-lg text-primary font-medium mb-2">{mentor.organizationName}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {formatRole(mentor.role)}
                </Badge>
              </div>
              {mentor.organizationDescription && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {mentor.organizationDescription}
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{mentor.email}</span>
              </div>
              {mentor.contactNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{mentor.contactNumber}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={() => initiateEmail(mentor.email, mentor.fullName)}
            >
              <Mail className="w-4 h-4" />
              Schedule Meeting via Email
            </Button>

            {mentor.contactNumber && (
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2"
                onClick={() => initiateCall(mentor.contactNumber)}
              >
                <Phone className="w-4 h-4" />
                Call {mentor.contactNumber}
              </Button>
            )}

            {mentor.websiteLink && (
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2"
                onClick={() => openExternalLink(mentor.websiteLink)}
              >
                <ExternalLink className="w-4 h-4" />
                Visit Profile/Website
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-500 text-center pt-4 border-t">
            Click the buttons above to connect with {mentor.fullName} directly through your
            preferred method.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function MentorPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_MENTORS,
        fetchPolicy: 'no-cache',
      });

      const activeMentors = data.companies.results.filter((mentor: Mentor) => mentor.isActivated);
      setMentors(activeMentors);
    } catch (err) {
      console.error('Error fetching mentors:', err);
      setError('Failed to load mentors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <HeadingSection
            badge="Mentors"
            title="Connect with Expert Mentors"
            subtitle="Get personalized guidance from industry leaders who have been where you want to go."
          />
          <div className="flex items-center justify-center mt-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-gray-600">Loading mentors...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <HeadingSection
            badge="Mentors"
            title="Connect with Expert Mentors"
            subtitle="Get personalized guidance from industry leaders who have been where you want to go."
          />
          <div className="mt-16 text-center">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <Button onClick={fetchMentors} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (mentors.length === 0) {
    return (
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <HeadingSection
            badge="Mentors"
            title="Connect with Expert Mentors"
            subtitle="Get personalized guidance from industry leaders who have been where you want to go."
          />
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600">No active mentors available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <HeadingSection
          badge="Mentors"
          title="Connect with Expert Mentors"
          subtitle="Get personalized guidance from industry leaders who have been where you want to go."
        />

        <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </section>
  );
}