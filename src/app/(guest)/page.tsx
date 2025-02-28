import Form from '@/app/(guest)/form/page';
import Hero from '@/components/hero/hero-view';
import WhatWeOffer from '@/components/layout/wwo';
import EventPage from '@/components/event/event-list';
import StartupDirectoryPage from '@/app/(guest)/startup-directory/page';
import TestimonialsApp from '@/components/testimonials/testimonials-view/testimonials';

const Guest = () => (
  <div>
    <Hero />
    <StartupDirectoryPage />
    <WhatWeOffer />
    <EventPage limit={2} />
    <Form />
    <TestimonialsApp />
  </div>
);

export default Guest;
