'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EmailActivate = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    console.log('Current URL:', window.location.href); // Log the full URL

    // Extract the token from the URL path
    const pathSegments = window.location.pathname.split('/');
    const extractedToken = pathSegments[pathSegments.length - 1]; // Get the last segment of the path
    console.log('Token from URL path:', extractedToken); // Log token value

    if (extractedToken) {
      setToken(extractedToken);
    }
  }, []);

  const handleActivateClick = () => {
    if (token) {
      activateEmail(token);
    }
  };

  const activateEmail = async (token: string) => {
    try {
      const response: Response = await fetch('https://investly.baliyoventures.com/api/activate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Email activation failed');
      }

      router.push('/login');
    } catch (error) {
      console.error('Error activating email:', error);
      // Toast({
      //   title: 'Error',
      //   variant: 'destructive',
      // });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Please verify your email</h1>
        <p className="mb-6">Amazing deals, updates, interesting news right in your inbox</p>
        <p className="text-gray-600">Activating your email...</p>
        <button
          onClick={handleActivateClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Activate Email
        </button>
      </div>
    </main>
  );
};

export default EmailActivate;
