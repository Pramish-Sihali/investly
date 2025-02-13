import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar/guest-navbar';
import ContactView from '@/components/contact-us/view/contact-view';
import { Newsletter } from '@/components/layout/newsletter';
import QuestionButton from '@/components/layout/question';


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
