"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeadingSection from "@/components/common/heading-section";
import ResponsiveContainer from "@/components/common/responsive-container";
import { Dialog, DialogTitle, DialogHeader, DialogContent } from "@/components/ui/dialog";

interface Event {
  id: number;
  date: string;
  day: string;
  title: string;
  description: string;
  review?: string;
  buttons: { text: string; href: string }[];
}

const events: Event[] = [
  {
    id: 1,
    date: "17",
    day: "FEB",
    title: "Investor Readiness Session (Online Workshop for Startup Founders)",
    description:
      "Learn how not to talk to investors! Join our Investor Readiness Session, rated 4.6/5.",
    review:
      "The workshop is very clear and goal-oriented. The trainer knew exactly what we were struggling with and gave us great feedback and tips.",
    buttons: [
      { text: "Read more", href: "#" },
      { text: "Apply for event", href: "#" },
    ],
  },
  {
    id: 2,
    date: "17",
    day: "FEB",
    title: "Investor Readiness Session (Online Workshop for Startup Founders)",
    description:
      "Learn how not to talk to investors! Join our Investor Readiness Session, rated 4.6/5.",
    review:
      "The workshop is very clear and goal-oriented. The trainer knew exactly what we were struggling with and gave us great feedback and tips.",
    buttons: [
      { text: "Read more", href: "#" },
      { text: "Apply for event", href: "#" },
    ],
  },
  {
    id: 3,
    date: "17",
    day: "FEB",
    title: "Investor Readiness Session (Online Workshop for Startup Founders)",
    description:
      "Learn how not to talk to investors! Join our Investor Readiness Session, rated 4.6/5.",
    review:
      "The workshop is very clear and goal-oriented. The trainer knew exactly what we were struggling with and gave us great feedback and tips.",
    buttons: [
      { text: "Read more", href: "#" },
      { text: "Apply for event", href: "#" },
    ],
  },
  // Additional events here
];

const EventCard = ({ event }: { event: Event }) => {
  const [openApply, setOpenApply] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start gap-4 p-6 bg-white shadow rounded-lg mb-8">
        <div className="flex-shrink-0 text-center mb-4 sm:mb-0">
          <div className="bg-primary-500 text-white w-16 h-16 flex flex-col items-center justify-center rounded-md">
            <span className="text-2xl font-bold">{event.date}</span>
            <span className="text-sm uppercase">{event.day}</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-2">Monday, February {event.date}, 2025, 03:00 PM</p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
          <div className="flex flex-wrap gap-4">
            {event.buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => {
                  if (button.text === "Apply for event") setOpenApply(true);
                  if (button.text === "Read more") setOpenDetails(true);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  index === 0
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    : "bg-primary text-white hover:bg-primary"
                }`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Event Details Modal */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mb-4">{event.description}</p>
          {event.review && (
            <p className="text-sm italic text-gray-500 border-l-2 border-gray-300 pl-4 mb-4">
              Founder review: {event.review}
            </p>
          )}
          <Button onClick={() => setOpenDetails(false)} className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300">
            Close
          </Button>
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

const EventPage = () => (
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

export default EventPage;
