'use client';

import { z } from 'zod';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
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


const loginMutationFn = async (data: { email: string; password: string }) => {
  const response = await axios.post('http://139.59.26.218/api/login/', data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export default function Login() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: 'Email is required',
    }),
    password: z.string().trim().min(1, {
      message: 'Password is required',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

const onSubmit = (values: z.infer<typeof formSchema>) => {
  mutate(values, {
    onSuccess: (response) => {
      if (!response?.is_active) {
        toast({
          title: 'Verify your email',
          description: 'Your account is inactive. Please check your email for verification.',
          variant: 'destructive',
        });
      }

      if (response?.access) {
        // Store tokens in localStorage
        localStorage.setItem('authToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);

        toast({
          title: 'Login Successful',
          description: 'Welcome back! You have successfully logged in.',
          variant: 'default',
        });

        router.replace('/');
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
};




  return (
    <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
      <div className="w-full h-full p-5 rounded-md">
        <div className="w-full flex justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
          />
        </div>

        <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center sm:text-left">
          Log in to Investly
        </h1>
        <p className="mb-8 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
          Don&apos;t have an account?{' '}
          <Link className="text-primary" href="/signup">
            Sign up
          </Link>
          .
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="subscribeto@channel.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4 flex w-full items-center justify-end">
              <Link
                className="text-sm dark:text-white"
                href={`/forgot-password?email=${form.getValues().email}`}
              >
                Forgot your password?
              </Link>
            </div>
            <Button
              className="w-full text-[15px] h-[40px] text-white dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white font-semibold"
              disabled={isPending}
              type="submit"
            >
              {isPending && <Loader className="animate-spin" />}
              Sign in
              <ArrowRight />
            </Button>

            <div className="mb-6 mt-6 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                data-orientation="horizontal"
                role="separator"
              />
            </div>
          </form>
        </Form>
        <p className="text-xs dark:text-slate- font-normal mt-7">
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