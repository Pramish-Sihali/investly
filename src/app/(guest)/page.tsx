import FAQPage from '@/components/qna/qna';
import Hero from '@/components/hero/hero-view';
import WhatWeOffer from '@/components/layout/wwo';
import EventPage from '@/components/event/event-list';
import EventsAndAcademy from '@/components/layout/event';
import StartupDirectoryPage from '@/app/(guest)/startup-directory/page';
import TestimonialsApp from '@/components/testimonials/testimonials-view/testimonials';

const Guest = () => (
  <div>
    <Hero />
    <StartupDirectoryPage />
    <WhatWeOffer />
    <EventsAndAcademy />
    <EventPage limit={2} />
    <FAQPage />
    <TestimonialsApp />
  </div>
);

export default Guest;
