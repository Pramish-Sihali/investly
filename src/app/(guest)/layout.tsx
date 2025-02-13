import { Footer } from '@/components/layout/footer';
import QuestionButton from '@/components/layout/question';
import { Newsletter } from '@/components/layout/newsletter';
import { Navbar } from '@/components/layout/navbar/guest-navbar';
import ContactView from '@/components/contact-us/view/contact-view';


export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Newsletter/>
      <ContactView />
      <Footer />
      <QuestionButton />
    </div>
  );
}
