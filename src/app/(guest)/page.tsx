import React from 'react';
import Form from '@/app/(guest)/form/page';
import Hero from '@/components/hero/hero-view';
import WhatWeOffer from '@/components/layout/wwo';
import EventPage from '@/components/event/event-list';
import Partners from '@/components/partners/partners-view';
import { Newsletter } from '@/components/layout/newsletter';
import BookSpaceSection from '@/components/book-space/book-space';
import ContactView from '@/components/contact-us/view/contact-view';
import TestimonialsApp from '@/components/testimonials/testimonials-view/testimonials';

const Guest = () => (
  <div>
    <Hero />
    <Partners />
    <WhatWeOffer />
    <EventPage limit={2} />
    <Form />
    <BookSpaceSection />
    <TestimonialsApp />
    <Newsletter />
    <ContactView />
  </div>
);

export default Guest;
