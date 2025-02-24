'use client';

import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, ArrowRight, MailCheckIcon } from 'lucide-react';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const registerMutationFn = async (data: any) => {
  try {
    const response = await fetch('https://investly.baliyoventures.com/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: data.name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
        role: data.role,
      }),
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

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const userType = searchParams?.get('usertype') ?? '';

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const formSchema = z
    .object({
      name: z.string().trim().min(1, { message: 'Name is required' }),
      email: z.string().trim().email().min(1, { message: 'Email is required' }),
      password: z.string().trim().min(1, { message: 'Password is required' }),
      confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
      role: z.string().min(1, { message: 'Role is required' }),
    })
    .refine((val) => val.password === val.confirmPassword, {
      message: 'Password does not match',
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: userType,
    },
  });

  useEffect(() => {
    form.setValue('role', userType);
  }, [userType, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center  py-10">
      <div className="w-full max-w-md mx-auto">
        {!isSubmitted ? (
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
            <div className="flex justify-center mb-8">
              <Image src="/logo.png" alt="logo" width={80} height={80} className="rounded-full" />
            </div>

            <h1 className="text-2xl font-bold mb-2 text-center dark:text-white">
              Create an Investly account
            </h1>
            <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link className="text-primary hover:underline" href="/login">
                Log in
              </Link>
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-200">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="dark:bg-gray-700 dark:text-white"
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
                      <FormLabel className="dark:text-gray-200">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          autoComplete="off"
                          {...field}
                          className="dark:bg-gray-700 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-200">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••••"
                          {...field}
                          className="dark:bg-gray-700 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-200">Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••••"
                          {...field}
                          className="dark:bg-gray-700 dark:text-white"
                        />
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
                      <FormLabel className="dark:text-gray-200">Role</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...field}
                          value={userType}
                          readOnly
                          className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white cursor-not-allowed"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
            <MailCheckIcon size="48" className="mx-auto mb-6 text-green-500" />
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Check your email</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We just sent a verification link to {form.getValues().email}.
            </p>
            <Link href="/login">
              <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold">
                Go to login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
