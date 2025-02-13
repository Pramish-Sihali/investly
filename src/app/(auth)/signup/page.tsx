'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import Logo from '@/components/logo';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

interface SignUpProps {
  userType?: string;
}

const registerMutationFn = async (data: any) => {
  try {
    const response = await fetch('http://139.59.26.218/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: data.name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword, // Add confirm_password field
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

export default function SignUp({ }: SignUpProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const formSchema = z
    .object({
      name: z.string().trim().min(1, {
        message: 'Name is required',
      }),
      email: z.string().trim().email().min(1, {
        message: 'Email is required',
      }),
      password: z.string().trim().min(1, {
        message: 'Password is required',
      }),
      confirmPassword: z.string().min(1, {
        message: 'Confirm Password is required',
      }),
      role: z.string().min(1, {
        message: 'Role is required',
      }),
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
      role: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
      {!isSubmitted ? (
        <div className="w-full p-5 rounded-md">
          <Logo />

          <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center sm:text-left">
            Create a Squeezy account
          </h1>
          <p className="mb-6 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
            Already have an account?{' '}
            <Link className="text-primary underline" href="/">
              Sign in
            </Link>
            .
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Techwithemma" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="subscribeto@channel.com"
                          autoComplete="off"
                          {...field}
                        />
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

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">Role</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full p-2 border rounded-md">
                          <option value="">Select a role</option>
                          <option value="Investor">Investor</option>
                          <option value="Mentor">Mentor</option>
                          <option value="Startup">Startup</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full text-[15px] h-[40px] !bg-blue-500 text-white font-semibold"
                disabled={isPending}
                type="submit"
              >
                {isPending && <Loader className="animate-spin" />}
                Create account
                <ArrowRight />
              </Button>
            </form>
          </Form>
          <p className="text-xs font-normal mt-4">
            By signing up, you agree to our{' '}
            <a className="text-primary underline" href="#">
              Terms of Service
            </a>{' '}
            and{' '}
            <a className="text-primary underline" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <MailCheckIcon size="48px" className="animate-bounce" />
          </div>
          <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Check your email
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            We just sent a verification link to {form.getValues().email}.
          </p>
          <Link href="/">
            <Button className="h-[40px]">
              Go to login
              <ArrowRight />
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}