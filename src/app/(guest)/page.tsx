import Form from '@/app/(guest)/form/page';
import Hero from '@/components/hero/hero-view';
import WhatWeOffer from '@/components/layout/wwo';
import EventPage from '@/components/event/event-list';
import Partners from '@/components/partners/partners-view';
import TestimonialsApp from '@/components/testimonials/testimonials-view/testimonials';
import StartupDirectoryPage from '@/components/startupDir/components/Startup-Directory';

const Guest = () => (
  <div>
    <Hero />
    <Partners />
    <StartupDirectoryPage />
    <WhatWeOffer />
    <EventPage limit={2} />
    <Form />
    <TestimonialsApp />
  </div>
);

export default Guest;
