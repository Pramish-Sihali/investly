import './globals.css';

import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/layout/footer';
import QueryProvider from '@/context/query-provider';
import { AuthProvider } from '@/context/auth-provider';
import { Bricolage_Grotesque } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar/guest-navbar';

const bricolage_grotesque = Bricolage_Grotesque({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BAIN',
  description: 'BAIN',
  icons:{
    icon:"/mainlogo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-background ${bricolage_grotesque.className} antialiased`}>
        <AuthProvider>
          <QueryProvider>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
