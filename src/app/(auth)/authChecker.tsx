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
        // Prevent access to /investors/profile if not logged in
        if (pathname === '/investors/profile') {
          router.replace('/login'); // Redirect to login
          return;
        }
        router.replace('/login');
        return;
      }

      // Prevent access to /login and /signup if already logged in
      if (authToken && (pathname === '/login' || pathname === '/signup')) {
        router.replace('/'); // Redirect to home or another appropriate page
        return;
      }

      try {
        const userData = JSON.parse(userDataStr);
        const roleRoutes = {
          Investor: '/investors',
          Startup: '/',
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
