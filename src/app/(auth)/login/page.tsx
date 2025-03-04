'use client';

import { z } from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/auth-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

export default function Login() {
  const { login, isLoading } = useAuth();
  const [isPending, setIsPending] = useState(false);

  // Memoize the form schema
  const formSchema = useMemo(
    () =>
      z.object({
        email: z.string().trim().email().min(1, {
          message: 'Email is required',
        }),
        password: z.string().min(1, {
          message: 'Password is required',
        }),
      }),
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    try {
      await login(values);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center py-10">
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
                        placeholder="your.email@example.com"
                        {...field}
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
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:bg-gray-800"
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full h-11 text-[15px] bg-primary hover:bg-primary/90 text-white dark:bg-gray-800 dark:hover:bg-gray-700 font-semibold"
                disabled={isPending || isLoading}
                type="submit"
              >
                {isPending || isLoading ? (
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
