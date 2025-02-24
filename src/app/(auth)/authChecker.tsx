'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthCheckerProps {
  children: React.ReactNode;
}

export default function AuthChecker({ children }: AuthCheckerProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      const userDataStr = localStorage.getItem('userData');

      if (!authToken || !userDataStr) {
        router.replace('/login');
        return;
      }

      try {
        const userData = JSON.parse(userDataStr);
        const roleRoutes = {
          Investor: '/investors',
          Startup: '/startups',
          Mentor: '/mentors',
        };

        // Check if user is trying to access a route they shouldn't
        const userRole = userData.role as keyof typeof roleRoutes;
        const allowedPath = roleRoutes[userRole];

        if (pathname !== allowedPath && pathname !== '/login') {
          router.replace(allowedPath);
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        router.replace('/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  return <>{children}</>;
}
