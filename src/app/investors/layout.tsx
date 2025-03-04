'use client';

import { redirect } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';

export default function InvestorProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return redirect('/login'); // Redirect to login page if not authenticated
  }

  return <div>{children}</div>;
}
