
import FAQPage from '@/components/qna/qna'; 
import Hero from '@/components/hero/hero-view';
import WhatWeOffer from '@/components/layout/wwo';
import InvestPage from '@/components/layout/invest-card'; 
import EventsAndAcademy from '@/components/layout/event';
import TestimonialsApp from '@/components/testimonials/testimonials-view/testimonials';


const Guest = () => (
  <div>
    <Hero />
    <InvestPage />  
    <WhatWeOffer />
    <EventsAndAcademy />
    <FAQPage />
    <TestimonialsApp />
  </div>
);

export default Guest;
