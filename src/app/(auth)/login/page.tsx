'use client';

import { z } from 'zod';
import axios from 'axios';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader, ArrowRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const loginMutationFn = async (data: { email: string }) => {
  const response = await axios.post('https://investly.baliyoventures.com/api/login/', data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export default function Login() {
  const router = useRouter();

  // Memoize the mutation to prevent unnecessary re-renders
  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,

    mutationKey: ['login'],
  });

  // Memoize the form schema
  const formSchema = useMemo(
    () =>
      z.object({
        email: z.string().trim().email().min(1, {
          message: 'Email is required',
        }),
      }),
    []
  );

  // Memoize the onSubmit handler
  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      mutate(values, {
        onSuccess: (response) => {
          if (response?.access) {
            // Batch localStorage operationss
            const updates = {
              authToken: response.access,
              refreshToken: response.refresh,
              userData: JSON.stringify(response.user),
            };
            Object.entries(updates).forEach(([key, value]) => localStorage.setItem(key, value));

            toast({
              title: 'Login Successful',
              description: 'Welcome back! You have successfully logged in.',
              variant: 'default',
            });
            const roleRoutes: { [key: string]: string } = {
              Investor: '/investors',
              Startup: '/',
              Mentor: '/',
            };

            const redirectPath = roleRoutes[response.user.role] || '/';
            router.replace(redirectPath);
          } else {
            toast({
              title: 'Login failed',
              description: 'Invalid credentials or unexpected response',
              variant: 'destructive',
            });
          }
        },
        onError: (error) => {
          const message = (error as any).response?.data?.message || 'Something went wrong';
          toast({
            title: 'Error',
            description: message,
            variant: 'destructive',
          });
        },
      });
    },
    [mutate, router]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <main className="w-full min-h-screen flex items-center justify-center  py-10">
      <div className="w-full max-w-md mx-auto h-full p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="w-full flex justify-center mb-8">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>

        <h1 className="text-2xl text-center font-bold mb-6 dark:text-[#fcfdffef]">
          Log in to Investly
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-800"
                        placeholder="subscribeto@channel.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="flex w-full items-center justify-end">
                <Link
                  className="text-sm text-primary hover:underline dark:text-white"
                  href={`/forgot-password?email=${form.getValues().email}`}
                >
                  Forgot your password?
                </Link>
              </div> */}

              <Button
                className="w-full h-11 text-[15px] bg-primary hover:bg-primary/90 text-white dark:bg-gray-800 dark:hover:bg-gray-700 font-semibold"
                disabled={isPending}
                type="submit"
              >
                {isPending ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Log in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            <div className="my-6 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="h-px w-full bg-gray-200 dark:bg-gray-700"
                data-orientation="horizontal"
                role="separator"
              />
            </div>
          </form>
        </Form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          By signing in, you agree to our{' '}
          <a className="text-primary hover:underline" href="#">
            Terms of Service
          </a>{' '}
          and{' '}
          <a className="text-primary hover:underline" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
