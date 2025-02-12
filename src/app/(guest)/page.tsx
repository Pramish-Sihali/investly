
import FAQPage from '@/components/qna/qna'; 
import TestimonialsApp from '@/components/testimonials/testimonials-view/testimonials';
import Hero from '@/components/hero/hero-view';
import InvestPage from '@/components/layout/invest-card'; 
import WhatWeOffer from '@/components/layout/wwo';
import EventsAndAcademy from '@/components/layout/event';
import QuestionButton from '@/components/layout/question';


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
