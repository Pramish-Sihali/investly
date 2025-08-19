'use client';

import type React from 'react';

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import HeadingSection from '@/components/common/heading-section';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const investorFormSchema = z.object({
  full_name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  organization_name: z.string().min(2, {
    message: 'Organisation name must be at least 2 characters.',
  }),
  investment_interest_area: z.string().min(5, {
    message: 'Investment interest area must be at least 5 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  contact_number: z.string().min(5, {
    message: 'Contact number must be at least 5 characters.',
  }),
});

type InvestorFormValues = z.infer<typeof investorFormSchema>;

interface InvestorAPIPayload extends InvestorFormValues {
  organization_role: 'Investor';
  about_you: string;
}

const registerInvestorMutationFn = async (data: InvestorFormValues) => {
  try {
    const apiPayload: InvestorAPIPayload = {
      ...data,
      organization_role: 'Investor',
      about_you: data.investment_interest_area,
    };

    const response = await fetch('https://investly.baliyoventures.com/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to connect to the server. Please try again later.');
  }
};

export default function InvestorRegistrationForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<InvestorFormValues>({
    resolver: zodResolver(investorFormSchema),
    defaultValues: {
      full_name: '',
      organization_name: '',
      investment_interest_area: '',
      email: '',
      contact_number: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: registerInvestorMutationFn,
    onSuccess: () => {
      toast({
        title: 'Registration successful!',
        description: 'You have successfully registered as an investor.',
      });
      form.reset();
      toast({
        title: 'Check your email for activation instructions.',
        variant: 'default',
      });
      toast({
        title: 'Please activate your account via the email sent to you.',
        variant: 'default',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Registration failed. Please try again.',
        variant: 'destructive',
      });
    },
  });

  function onSubmit(values: InvestorFormValues) {
    setLoading(true);
    mutate(values, {
      onSettled: () => {
        setLoading(false);
      },
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <HeadingSection
              title="Investor Registration"
              subtitle="Please fill in the details below to register as an investor"
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Name of Investor</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organization_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Organization Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your organization name"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="contact_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Contact Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your contact number"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="investment_interest_area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Investment Interest Area
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="E.g., Technology, Healthcare, Fintech"
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  type="submit"
                  className="w-full max-w-xs h-12 text-base font-medium transition-all duration-200 hover:scale-105"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Register as Investor'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
