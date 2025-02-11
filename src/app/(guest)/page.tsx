import { LineText } from '@/components/line-text';
import FAQPage from '@/components/qna/qna'; 
import TestimonialsApp from '@/components/testimonials/testimonials-view/testimonials';
import ContactView from '@/components/contact-us/view/contact-view';
import Hero from '@/components/hero/hero-view';

const Guest = () => (
  <div>
    <Hero />
    <FAQPage />
   <TestimonialsApp />
   <ContactView />
  </div>
);

export default Guest;
