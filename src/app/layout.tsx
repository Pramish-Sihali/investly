import './globals.css';

import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
import AuthChecker from '@/app/(auth)/authChecker';
import { Footer } from '@/components/layout/footer';
import QueryProvider from '@/context/query-provider';
import { Bricolage_Grotesque } from 'next/font/google';
import { Newsletter } from '@/components/layout/newsletter';
import ContactView from '@/components/contact-us/view/contact-view';

const bricolage_grotesque = Bricolage_Grotesque({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Investly',
  description: 'Investly',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-background ${bricolage_grotesque.className} antialiased`}>
        <QueryProvider>
          {children}
          <Toaster />
          <Newsletter />
          <ContactView />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
