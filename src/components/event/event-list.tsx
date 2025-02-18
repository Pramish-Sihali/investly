'use client';

import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

const EventCard = ({ event }: { event: Event }) => {
  const [openApply, setOpenApply] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start gap-4 p-6 bg-white shadow rounded-lg mb-8">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-2">{event.eventDate}</p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
          <div className="flex gap-4">
            <Button onClick={() => setOpenDetails(true)} className="bg-gray-100 text-gray-800 hover:bg-gray-200">
              Read More
            </Button>
            <Button onClick={() => setOpenApply(true)} className="bg-primary text-white hover:bg-primary">
              Apply for Event
            </Button>
          </div>
        </div>
      </div>

      
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
      <DialogContent className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="mt-6 text-gray-700 space-y-6">

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Event Details</h3>
            <p className="text-gray-600 whitespace-pre-line">{event.eventDetails}</p>
          </div>
\
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <Button onClick={() => setOpenDetails(false)} variant="outline" className="w-full sm:w-auto">
            Close
          </Button>
          <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary-dark">Register for Event</Button>
        </div>
      </DialogContent>
    </Dialog>


      {/* Apply for Event Modal */}
      <Dialog open={openApply} onOpenChange={setOpenApply}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for Event</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input type="email" placeholder="Email" required />
            <Input type="password" placeholder="Password" required />
            <Button onClick={() => setOpenApply(false)} className="w-full bg-primary text-white hover:bg-primary">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const EventPage = () => {
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

  return (
    <ResponsiveContainer variant="wide" paddingY="xl">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
        <HeadingSection
          title="Be part of the community by joining our events"
          subtitle="Our events are a regular opportunity for investors and startups to meet informally."
        />

        <div className="mt-12">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default EventPage;
