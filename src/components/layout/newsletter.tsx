'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import React, { useState } from 'react';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Validate email with Zod
    const result = emailSchema.safeParse({ email });

    if (!result.success) {
      toast.error(result.error.errors[0]?.message || 'Invalid email address.');
      return;
    }

    setLoading(true); // Set loading to true while submitting
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/newsletter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to subscribe. Please try again.');
      }

      toast('Subscribed Successfully!', {
        description: 'You have subscribed to our newsletter.',
      });
      setEmail(''); // Clear the email field on success
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      toast.error('An error occurred.', {
        description: errorMessage,
      });
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="container w-[90%] border border-collapse mx-auto rounded-xl overflow-hidden bg-gradient-to-r from-primary/10 to-primary/30 my-10">
      <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-12 gap-8">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 space-y-6 md:text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary">
            Subscribe to our Newsletter
          </h2>
          <p className=" text-lg leading-relaxed text-black">
            Sign up now to receive offers and information about us and never miss an update from
            Investly!
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex items-center justify-center lg:justify-start max-w-md"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-l-lg px-6 py-4 w-full focus:ring-0 text-gray-700 text-lg border border-primary"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-[#FF7F50] text-white px-6 py-4 font-semibold text-xl rounded-r-lg hover:bg-[#FF6B3D] transition-colors"
              disabled={loading}
            >
              {loading ? '...' : '→'}
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/pana.svg"
            alt="Newsletter Illustration"
            className="w-full hidden lg:block max-w-xs lg:max-w-sm h-[350px]"
          />
        </div>
      </div>
    </div>
  );
}
