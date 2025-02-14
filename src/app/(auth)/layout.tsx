import React, { Suspense } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
