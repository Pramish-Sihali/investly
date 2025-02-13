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
    const response = await fetch('http://139.59.26.218/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: data.name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
        role: data.role, // Send extracted role
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
  const userType = searchParams.get('usertype') || '';

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
      role: userType, // Set role from URL parameter
    },
  });

  // Update role when URL parameter changes
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
    <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
      {!isSubmitted ? (
        <div className="w-full p-5 rounded-md">
          <div className="w-full flex justify-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>

          <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center sm:text-left">
            Create a Investly account
          </h1>
          <p className="mb-6 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
            Already have an account?{' '}
            <Link className="text-primary underline" href="/">
              Log in.
            </Link>
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
                        <Input placeholder="subscribeto@channel.com" autoComplete="off" {...field} />
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

              {/* Role Field (Auto-filled and Disabled) */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">Role</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...field}
                          value={userType}
                          readOnly
                          className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        />
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
        </div>
      ) : (
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <MailCheckIcon size="48px" className="animate-bounce" />
          <h2 className="text-xl font-bold dark:text-[#fcfdffef]">Check your email</h2>
          <p className="text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            We just sent a verification link to {form.getValues().email}.
          </p>
          <Link href="/login">
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
