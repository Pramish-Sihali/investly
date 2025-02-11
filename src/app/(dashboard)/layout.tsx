import { AuthProvider } from '@/context/auth-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import Header from './_components/Header';
import Asidebar from './_components/Asidebar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Asidebar />
        <SidebarInset>
          <main className="w-full">
            <Header />
            
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
