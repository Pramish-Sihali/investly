'use client';

import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return redirect('/');
  }
  return (
    <Suspense>
      <div className="w-full h-auto">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-[450px] mx-auto h-auto ">{children}</div>
        </div>
      </div>
    </Suspense>
  );
}
