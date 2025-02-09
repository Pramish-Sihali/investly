import './globals.css';

import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
import QueryProvider from '@/context/query-provider';
import { Bricolage_Grotesque } from 'next/font/google';

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
        </QueryProvider>
      </body>
    </html>
  );
}
