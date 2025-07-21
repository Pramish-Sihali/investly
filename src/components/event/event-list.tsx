'use client';

import Link from 'next/link';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sanitizeHtmlContentSync } from '@/utils/htmlsanitize';
import HeadingSection from '@/components/common/heading-section';
import ResponsiveContainer from '@/components/common/responsive-container';
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog';

interface Event {
  id: string;
  title: string;
  eventDate: string;
  eventDetails: string;
  eventLocation: string;
}

const FETCH_EVENTS = gql`
  query MyQuery {
    allEvents {
      results {
        id
        title
        eventDate
        eventDetails
        eventLocation
      }
    }
  }
`;

const CREATE_EVENT_ATTENDEE = gql`
  mutation CreateEventAttendee($email: String!, $eventId: ID!) {
    createEventAttendee(email: $email, eventId: $eventId) {
      eventAttendee {
        email
        event {
          id
          title
        }
      }
    }
  }
`;

const EventCard = ({ event }: { event: Event }) => {
  const [openApply, setOpenApply] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSubmitApplication = async () => {
    if (!email || !email.includes('@')) {
      setSubmitMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { data } = await client.mutate({
        mutation: CREATE_EVENT_ATTENDEE,
        variables: {
          email: email,
          eventId: event.id,
        },
      });

      if (data?.createEventAttendee?.eventAttendee) {
        setSubmitMessage('Successfully applied for the event!');
        setTimeout(() => {
          setOpenApply(false);
          setEmail('');
          setSubmitMessage('');
        }, 2000);
      }
    } catch (error) {
      console.error('Error applying for event:', error);
      setSubmitMessage('Failed to apply for the event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterForEvent = async () => {
    if (!registerEmail || !registerEmail.includes('@')) {
      setRegisterMessage('Please enter a valid email address.');
      return;
    }

    setIsRegistering(true);
    setRegisterMessage('');

    try {
      const { data } = await client.mutate({
        mutation: CREATE_EVENT_ATTENDEE,
        variables: {
          email: registerEmail,
          eventId: event.id,
        },
      });

      if (data?.createEventAttendee?.eventAttendee) {
        setRegisterMessage('Successfully registered for the event!');
        setTimeout(() => {
          setOpenRegister(false);
          setRegisterEmail('');
          setRegisterMessage('');
        }, 2000);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      setRegisterMessage('Failed to register for the event. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCloseApplyDialog = () => {
    setOpenApply(false);
    setEmail('');
    setSubmitMessage('');
    setIsSubmitting(false);
  };

  const handleCloseRegisterDialog = () => {
    setOpenRegister(false);
    setRegisterEmail('');
    setRegisterMessage('');
    setIsRegistering(false);
  };

  // Sanitize the event details HTML using the synchronous version
  const sanitizedEventDetails = sanitizeHtmlContentSync(event.eventDetails);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-8 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-xl mb-6 border border-gray-100">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <p className="text-sm font-medium text-gray-500">{formatDate(event.eventDate)}</p>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{event.title}</h3>
          <p className="text-gray-600">{event.eventLocation}</p>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              onClick={() => setOpenDetails(true)}
              className="w-full sm:w-auto bg-gray-50 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
            >
              Read More
            </Button>
            <Button
              onClick={() => setOpenApply(true)}
              className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
            >
              Apply for Event
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent className="max-w-4xl max-h-[95vh] mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <DialogHeader className="border-b pb-4 px-6 pt-6 flex-shrink-0">
            <DialogTitle className="text-2xl font-bold text-gray-800">{event.title}</DialogTitle>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-sm font-medium text-gray-500">{formatDate(event.eventDate)}</p>
            </div>
            <p className="text-gray-600 mt-1">{event.eventLocation}</p>
          </DialogHeader>

          <div className="px-6 py-6 overflow-y-auto flex-grow">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Event Details</h3>
              <div
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizedEventDetails }}
                style={{
                  // Custom styles for better readability
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
              />
            </div>
          </div>

          <div className="border-t px-6 py-4 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0">
            <Button
              onClick={() => setOpenDetails(false)}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            <Button
              onClick={() => setOpenRegister(true)}
              className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90"
            >
              Register for Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register for Event Modal */}
      <Dialog open={openRegister} onOpenChange={handleCloseRegisterDialog}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Register for Event: {event.title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 px-6 pb-6">
            <div>
              <label
                htmlFor="registerEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <Input
                id="registerEmail"
                type="email"
                placeholder="Enter your email address"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
                className="w-full"
                disabled={isRegistering}
              />
            </div>

            {registerMessage && (
              <div
                className={`text-sm p-2 rounded ${
                  registerMessage.includes('Successfully')
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {registerMessage}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleCloseRegisterDialog}
                variant="outline"
                className="flex-1"
                disabled={isRegistering}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRegisterForEvent}
                className="flex-1 bg-primary text-white hover:bg-primary/90"
                disabled={isRegistering || !registerEmail}
              >
                {isRegistering ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Apply for Event Modal */}
      <Dialog open={openApply} onOpenChange={handleCloseApplyDialog}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Apply for Event: {event.title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 px-6 pb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                disabled={isSubmitting}
              />
            </div>

            {submitMessage && (
              <div
                className={`text-sm p-2 rounded ${
                  submitMessage.includes('Successfully')
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {submitMessage}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleCloseApplyDialog}
                variant="outline"
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitApplication}
                className="flex-1 bg-primary text-white hover:bg-primary/90"
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface EventPageProps {
  limit?: number;
}

const EventPage: React.FC<EventPageProps> = ({ limit }) => {
  const [showAll] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await client.query({ query: FETCH_EVENTS, fetchPolicy: 'no-cache' });
        setEvents(data.allEvents.results || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const displayedEvents = showAll ? events : events.slice(0, limit);

  return (
    <ResponsiveContainer variant="wide" paddingY="xl">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 mt-12">
        <HeadingSection
          title="Be part of the community by joining our events"
          subtitle="Our events are a regular opportunity for investors and startups to meet informally."
        />

        <div className="mt-16 space-y-6">
          {displayedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {!showAll && events.length > (limit || 0) && (
          <div className="text-center mt-4">
            <Link href="/events">
              <Button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 mt-12">
                View More
              </Button>
            </Link>
          </div>
        )}
      </div>
    </ResponsiveContainer>
  );
};

export default EventPage;
