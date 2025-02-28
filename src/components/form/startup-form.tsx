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
  role: z.enum(['Investor', 'Mentor', 'Startup'], {
    required_error: 'Please select a role.',
  }),
  about_you: z.string().optional(),
  website_link: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .or(z.literal('')),
  document: z.instanceof(File).optional(),
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
  const [file, setFile] = useState<File | null>(null);
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
      setFile(null);
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
        variant: 'destructive',
      });
    },
  });

  function onSubmit(values: FormValues) {
    setLoading(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && key !== 'document') {
        formData.append(key, value);
      }
    });

    if (file) {
      formData.append('document', file);
    }

    mutate(values, {
      onSettled: () => {
        setLoading(false);
      },
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      form.setValue('document', e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-3/4 mx-auto md:mx-10 mt-10 justify-center">
        <CardContent>
          <div className="flex flex-col items-center justify-center mt-10">
            <HeadingSection
              title="Startups Registration"
              subtitle="Please fill in the details below if you are a startup"
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Inc." {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
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
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Startup">Startup</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="about_you"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About You</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself or your organization"
                            className="min-h-[120px]"
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
                        <FormLabel>Website Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormDescription>Optional: Enter your website URL</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Document</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={handleFileChange} className="cursor-pointer" />
                    </FormControl>
                    <FormDescription>Optional: Upload a document (PDF, DOC, etc.)</FormDescription>
                  </FormItem>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button type="submit" className="w-full max-w-xs" disabled={loading}>
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
