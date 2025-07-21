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
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  organization_name: z.string().min(2, {
    message: 'Organization name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  contact_number: z.string().min(5, {
    message: 'Contact number must be at least 5 characters.',
  }),
  role: z.enum(['Investor', 'Mentor', 'Startup', 'Founder', 'Employee'], {
    required_error: 'Please select a role.',
  }),
  about_you: z.string().optional(),
  website_link: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

const registerMutationFn = async (data: FormValues) => {
  try {
    const response = await fetch('https://investly.baliyoventures.com/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

export default function UserRegistrationForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      organization_name: '',
      email: '',
      contact_number: '',
      about_you: '',
      website_link: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: registerMutationFn,
    onSuccess: () => {
      toast({
        title: 'Form submitted successfully',
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
      toast({
        title: 'Registration successful!',
        description: 'You have successfully registered.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        variant: 'destructive',
      });
    },
  });

  function onSubmit(values: FormValues) {
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
              title="Startups Registration"
              subtitle="Please fill in the details below if you are a startup"
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
                        <FormLabel className="text-base font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="h-12" {...field} />
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
                          <Input placeholder="Company Inc." className="h-12" {...field} />
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
                            placeholder="john@example.com"
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
                    name="contact_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+9770000000000" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="about_you"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">About Your Business</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself or your organization"
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" className="h-12" {...field} />
                        </FormControl>
                        <FormDescription>Optional: Enter your website URL</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Founder">Founder</SelectItem>
                            <SelectItem value="Employee">Employee</SelectItem>
                          </SelectContent>
                        </Select>
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
                  {loading ? 'Submitting...' : 'Submit Form'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}